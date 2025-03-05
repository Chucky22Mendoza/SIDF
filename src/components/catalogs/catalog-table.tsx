'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CatalogsType, ICatalogData } from "@/domain/Catalogs";
import { Plus, Search } from "lucide-react";
import EmptyTable from "../ui/EmptyTable";
import { useCatalogs } from "@/hooks/useCatalogs";
import CenterModal from "../ui/CenterModal";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { FormField } from "../shared/form-field";
import dynamic from "next/dynamic";
import { ResponseWrapper } from "@/domain/Response";
import { toast } from "sonner";
import debounce from 'lodash.debounce';

const ItemList = dynamic(() => import('./item-list'));

interface CatalogTableProps {
  title: string;
  list: ICatalogData[];
  catalog: CatalogsType;
}

export function CatalogTable({ title, list, catalog }: CatalogTableProps) {
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [listItem, setListItem] = useState<ICatalogData>({
    id: '',
    name: '',
  });
  const {
    get,
    performSearch,
    performPost,
    performPut,
    performDelete,
  } = useCatalogs();

  const listRender = useMemo(() => (
    list.map((item) => (
      <Suspense key={item.id}>
        <ItemList
          name={item.name}
          onEdit={() => {
            setListItem(item);
            setIsModalOpen(true);
          }}
          onDelete={() => {
            setListItem(item);
            setIsDeleteModalOpen(true);
          }}
        />
      </Suspense>
    ))
  ), [list]);

  const onConfirmForm = async () => {
    const { success, message }: ResponseWrapper<string | void> = listItem.id
      ? await performPut(catalog, listItem)
      : await performPost(catalog, listItem.name);

    if (success) {
      toast.success(message);
      await get(catalog);
      setListItem({ id: '', name: '' });
      setIsModalOpen(false);
      return;
    }

    toast.error(message);
  };

  const onCancelForm = () => {
    setListItem({ id: '', name: '' });
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const onConfirmDelete = async () => {
    const { success, message } = await performDelete(catalog, listItem.id);
    if (success) {
      await get(catalog);
      setIsDeleteModalOpen(false);
      setListItem({ id: '', name: '' });
      toast.success(message);
      return;
    }

    toast.error(message);
  };

  const handleSearch = async (catalog: CatalogsType, searchText: string) => {
    if (searchText === '') {
      await get(catalog);
      return;
    }
    await performSearch(catalog, searchText);
  };

  const debounceHandlerSearch = useCallback(debounce(handleSearch, 300), []);

  useEffect(() => {
    debounceHandlerSearch(catalog, searchText);
  }, [catalog, searchText, debounceHandlerSearch]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-2">
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            className="pl-8"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-white py-2 px-3 hover:bg-primary-600">
          <Plus className="mr-2 h-4 w-4" />
          Agregar {title}
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          {list.length > 0 && <TableBody>{listRender}</TableBody>}
        </Table>
        {list.length === 0 && <EmptyTable />}
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
        <form className="space-y-4 flex self-stretch">
          <FormField
            label={title}
            className="w-full"
            input={
              <Input
                className="w-full"
                type="text"
                placeholder={`Nombre de ${title}`}
                value={listItem?.name}
                onChange={(e) => setListItem({ ...listItem, name: e.target.value })}
              />
            }
          />
        </form>
      </CenterModal>

      <CenterModal
        isOpen={isDeleteModalOpen}
        allowConfirm
        confirmButtonText="Sí, Eliminar"
        cancelButtonText="Cancelar"
        hasClickBlurClose
        title="¿Seguro que deseas eliminar este elemento?"
        subtitle="Al eliminar este elemento, no podrás recuperarlo."
        onCancel={onCancelForm}
        onConfirm={onConfirmDelete}
        onClose={onCancelForm}
      />
    </div>
  );
}