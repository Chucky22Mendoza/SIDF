import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useFilms } from "@/hooks/useFilms";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useFilmsListStore } from "@/store/FilmsListStore";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";
import EmptyTable from "../ui/EmptyTable";
import FilmRow from "./film-row";
import { useDeleteModalStore } from "@/store/DeleteModalStore";
import { toast } from "sonner";
import debounce from "lodash.debounce";

export function FilmList() {
  const { get, performDelete, performSearch } = useFilms();
  const films = useFilmsListStore((state) => state.list);
  const setOpen = useDeleteModalStore((state) => state.setOpen);
  const onConfirmCallback = useDeleteModalStore((state) => state.onConfirmCallback);
  const onCancelCallback = useDeleteModalStore((state) => state.onCancelCallback);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    get();
  }, []);

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
    films.map((item) => (
      <Suspense key={item.id}>
        <FilmRow
          film={item}
          onDelete={() => {
            setOpen(true);
            onConfirmCallback(() => onConfirmDelete(item.id));
            onCancelCallback(() => setOpen(false));
          }}
        />
      </Suspense>
    ))
  ), [films]);

  return (
    <Card className="w-full">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar registros..."
              className="pl-9"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Director</TableHead>
                <TableHead>Año</TableHead>
                <TableHead>Género</TableHead>
                <TableHead>Copias</TableHead>
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            {films.length > 0 && <TableBody>{listRender}</TableBody>}
          </Table>
          {films.length === 0 && <EmptyTable />}
        </div>
      </div>
    </Card>
  );
}