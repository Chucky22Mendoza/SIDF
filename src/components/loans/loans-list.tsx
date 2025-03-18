import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";
import EmptyTable from "../ui/EmptyTable";
import LoanRow from "./loans-row";
import { useLoansListStore } from "@/store/LoansListStore";
import { useLoans } from "@/hooks/useLoans";
import { useDeleteModalStore } from "@/store/DeleteModalStore";
import { toast } from "sonner";
import debounce from "lodash.debounce";
import { Button } from "../ui/button";
import CenterModal from "../ui/CenterModal";
import { FormField } from "../shared/form-field";
import { useSearchParams } from "next/navigation";
import { LoanDataType } from "@/domain/Loans";
import { useFilms } from "@/hooks/useFilms";
import { useFilmsListStore } from "@/store/FilmsListStore";
import ReactSelect, { Option, ReactSelectOptions } from "../ui/react-select";
import { ResponseWrapper } from "@/domain/Response";

export function LoansList() {
  const {
    get,
    performDelete,
    performSearch,
    performPut,
    performPost,
  } = useLoans();
  const { get: getFilms } = useFilms();
  const films = useFilmsListStore((state) => state.list);
  const searchParams = useSearchParams();
  const query = searchParams.get('film');

  const loans = useLoansListStore((state) => state.list);
  const setOpen = useDeleteModalStore((state) => state.setOpen);
  const onConfirmCallback = useDeleteModalStore((state) => state.onConfirmCallback);
  const onCancelCallback = useDeleteModalStore((state) => state.onCancelCallback);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanId, setLoanId] = useState('');
  const [data, setData] = useState<LoanDataType>({
    name: '',
    curp: '',
    email: '',
    fk_id_filme: query ?? '',
    phone: '',
  });

  useEffect(() => {
    get();
    getFilms();
    if (query) setIsModalOpen(true);
  }, []);

  const filmsOptions = useMemo<ReactSelectOptions>(() => (
    films.map(({ title, id }) => ({
      label: title,
      value: id,
    }))
  ), [films]);

  const onConfirmDelete = async (id: string) => {
    const { success, message } = await performDelete(id);
    if (success) {
      await get();
      setOpen(false);
      toast.success(message);
      return;
    }

    toast.error(message);
  };

  const handleSearch = async (searchText: string) => {
    if (searchText === '') {
      await get();
      return;
    }
    await performSearch(searchText);
  };

  const debounceHandlerSearch = useCallback(debounce(handleSearch, 300), []);

  useEffect(() => {
    debounceHandlerSearch(searchText);
  }, [searchText, debounceHandlerSearch]);

  const listRender = useMemo(() => (
    loans.map((item) => (
      <Suspense key={item.id}>
        <LoanRow
          loan={item}
          onDelete={() => {
            setOpen(true);
            onConfirmCallback(() => onConfirmDelete(item.id));
            onCancelCallback(() => setOpen(false));
          }}
          onEdit={() => {
            setIsModalOpen(true);
            setLoanId(item.id);
            setData({
              curp: item.curp,
              email: item.email,
              name: item.name,
              phone: item.phone,
              fk_id_filme: item.fk_id_filme,
            });
          }}
        />
      </Suspense>
    ))
  ), [loans]);

  const onCancelForm = () => {
    setIsModalOpen(false);
  };

  const onConfirmForm = async () => {
    const { success, message }: ResponseWrapper<string | void> = loanId
      ? await performPut(loanId, data)
      : await performPost(data);

    if (success) {
      setLoanId('');
      setData({
        name: '',
        curp: '',
        email: '',
        fk_id_filme: query ?? '',
        phone: '',
      });
      toast.success(message);
      await get();
      setIsModalOpen(false);
      return;
    }

    toast.error(message);
  };

  return (
    <Card className="w-full">
      <div className="p-4 space-y-4">
        <div className="flex justify-between gap-2">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar registros..."
              className="pl-9"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-white py-2 px-3 hover:bg-primary-600">
            <Plus className="mr-2 h-4 w-4" />
            Registrar Préstamo
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Filme</TableHead>
                <TableHead>CURP</TableHead>
                <TableHead>Fecha</TableHead>
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
        onClose={onCancelForm}
        hasClickBlurClose
        style={{
          maxWidth: '400px',
          maxHeight: 'none',
          height: 'auto',
        }}
        allowConfirm
        confirmButtonText="Guardar"
        cancelButtonText="Cancelar"
        onCancel={onCancelForm}
        onConfirm={onConfirmForm}
      >
        <form className="space-y-4 flex self-stretch flex-col">
          <FormField
            label="Nombre"
            className="w-full"
            input={
              <Input
                className="w-full"
                placeholder="Nombre"
                type="text"
                value={data.name}
                onChange={(e) => setData({
                  ...data,
                  name: e.target.value,
                })}
              />
            }
          />
          <FormField
            label="Filme"
            className="w-full"
            input={
              <ReactSelect
                options={filmsOptions}
                isDisabled={loanId !== ''}
                placeholder="Selecciona el filme"
                value={filmsOptions?.find((item) => item.value === data.fk_id_filme)}
                onChange={(item) => setData({
                  ...data,
                  fk_id_filme: (item as Option).value,
                })}
              />
            }
          />
          <FormField
            label="Correo electrónico"
            className="w-full"
            input={
              <Input
                className="w-full"
                type="email"
                placeholder="example@example.com"
                value={data.email}
                onChange={(e) => setData({
                  ...data,
                  email: e.target.value,
                })}
              />
            }
          />
          <FormField
            label="Teléfono"
            className="w-full"
            input={
              <Input
                className="w-full"
                type="tel"
                minLength={10}
                maxLength={10}
                placeholder="5544332211"
                value={data.phone}
                onChange={(e) => setData({
                  ...data,
                  phone: e.target.value,
                })}
              />
            }
          />
          <FormField
            label="CURP"
            className="w-full"
            input={
              <Input
                className="w-full"
                type="text"
                placeholder="CURP"
                maxLength={18}
                minLength={17}
                value={data.curp}
                onChange={(e) => setData({
                  ...data,
                  curp: e.target.value,
                })}
              />
            }
          />
        </form>
      </CenterModal>
    </Card>
  );
}
