import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, MessageCircle, PhoneCall, Search } from "lucide-react";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";
import EmptyTable from "../ui/EmptyTable";
import HistoryRow from "./history-row";
import { useLoansListStore } from "@/store/LoansListStore";
import { useLoans } from "@/hooks/useLoans";
import debounce from "lodash.debounce";
import CenterModal from "../ui/CenterModal";
import { Button } from "../ui/button";
import Link from "next/link";
import { FormField } from "../shared/form-field";
import ReactSelect, { Option } from "../ui/react-select";
import { IFilterHistory, LoanHistoryType } from "@/domain/Loans";
import { format, isAfter, isSameDay, subMonths } from "date-fns";
import { toast } from "sonner";
import { es } from 'date-fns/locale/es';

export function HistoryList() {
  const { performHistory } = useLoans();
  const loans = useLoansListStore((state) => state.history);
  const [filters, setFilters] = useState<IFilterHistory>({
    filter: 'createdAt',
    endDate: format(new Date(), 'yyyy-MM-dd'),
    startDate: format(subMonths(new Date(), 3), 'yyyy-MM-dd'),
    query: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<LoanHistoryType | null>(null);

  const handleFilters = async (queries: IFilterHistory) => {
    if (queries.endDate && queries.startDate) {
      if (isAfter(queries.endDate, queries.startDate) || isSameDay(queries.endDate, queries.startDate)) {
        await performHistory(queries);
        return;
      }
      toast.error('Fecha inicio no puede ser mayor a fecha fin');
    }
  };

  const debounceHandlerSearch = useCallback(debounce(handleFilters, 300), []);

  useEffect(() => {
    debounceHandlerSearch(filters);
  }, [filters, debounceHandlerSearch]);

  const listRender = useMemo(() => (
    loans.map((item) => (
      <Suspense key={item.id}>
        <HistoryRow
          loan={item}
          onViewInfo={() => {
            setIsModalOpen(true);
            setData(item);
          }}
        />
      </Suspense>
    ))
  ), [loans]);

  const filtersOptions = [
    { label: 'Fecha préstamo', value: 'createdAt' },
    { label: 'Fecha devolución', value: 'deletedAt' },
  ];

  return (
    <Card className="w-full">
      <div className="p-4 space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row flex-1 gap-1">
            <FormField
              label="Filtro"
              input={
                <ReactSelect
                  className="flex-1"
                  placeholder="Selecciona el filtro"
                  value={filtersOptions.find((item) => item.value === filters.filter)}
                  options={filtersOptions}
                  onChange={(data) => setFilters({
                    ...filters,
                    filter: (data as Option).value as typeof filters.filter,
                  })}
                />
              }
            />
            <FormField
              label="Inicio"
              className="flex-1"
              input={
                <Input
                  type="date"
                  placeholder="Fecha Inicio"
                  max={filters.endDate}
                  value={filters.startDate}
                  onChange={(e) => setFilters({
                    ...filters,
                    startDate: e.target.value,
                  })}
                />
              }
            />
            <FormField
              label="Fin"
              className="flex-1"
              input={
                <Input
                  type="date"
                  placeholder="Fecha Fin"
                  value={filters.endDate}
                  max={format(new Date(), 'yyyy-MM-dd')}
                  onChange={(e) => setFilters({
                    ...filters,
                    endDate: e.target.value,
                  })}
                />
              }
            />
          </div>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar registros..."
              className="pl-9"
              value={filters.query}
              onChange={(e) => setFilters({
                ...filters,
                query: e.target.value,
              })}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Filme</TableHead>
                <TableHead>Fecha Préstamo</TableHead>
                <TableHead>Fecha Devolución</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            {loans.length > 0 && <TableBody>{listRender}</TableBody>}
          </Table>
          {loans.length === 0 && <EmptyTable />}
        </div>
      </div>

      <CenterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hasClickBlurClose
        style={{
          maxWidth: '400px',
          maxHeight: 'none',
          height: 'auto',
        }}
        hasConfirmButtons={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="space-y-2 flex self-stretch flex-col">
          <h1 className="text-2xl text-center">Información de Préstamo</h1>
          <span>{`Nombre: ${data?.name}`}</span>
          <span>{`Filme: ${data?.filme}`}</span>
          <span className="capitalize">{`Fecha préstamo: ${format(data?.loanDate ?? new Date(), 'MMMM dd, yyyy', { locale: es })}`}</span>
          {data?.returnDate && <span className="capitalize">{`Fecha devolucion: ${format(data.returnDate, 'MMMM dd, yyyy', { locale: es })}`}</span>}
          <span>{`CURP: ${data?.curp}`}</span>
          <span className={data?.returnDate ? 'text-green-600' : 'text-red-600'}>{`Estado: ${data?.status}`}</span>

          <div className="flex self-stretch justify-center gap-2 pt-4">
            <Button variant="ghost" size="icon">
              <Link href={`https://wa.me/52${data?.phone}`} target="_blank">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Link href={`mailto:${data?.email}`} className="flex self-stretch  items-center justify-center">
                <Mail className="h-8 w-8 text-red-500" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Link href={`tel:${data?.phone}`}>
                <PhoneCall className="h-8 w-8 text-blue-900" />
              </Link>
            </Button>
          </div>
        </div>
      </CenterModal>
    </Card>
  );
}
