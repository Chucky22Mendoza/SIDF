import { IUser, UserCreateType, UserUpdateType } from "@/domain/Users";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";
import UserRow from "./user-row";
import EmptyTable from "../ui/EmptyTable";
import { Suspense, useMemo, useState } from "react";
import { toast } from "sonner";
import { ResponseWrapper } from "@/domain/Response";
import { useUsers } from "@/hooks/useUsers";
import CenterModal from "../ui/CenterModal";
import { FormField } from "../shared/form-field";
import { Input } from "../ui/input";
import { useUserModalStore } from "@/store/UserModalStore";
import { roles } from "@/domain/Role";
import { useDeleteModalStore } from "@/store/DeleteModalStore";
import ReactSelect, { Option, ReactSelectOptions } from "../ui/react-select";

type Props = {
  users: IUser[];
};

function UsersTable({ users }: Props) {
  const { get, performDelete, performPost, performPut } = useUsers();
  const isModalOpen = useUserModalStore((state) => state.isOpen);
  const setIsModalOpen = useUserModalStore((state) => state.setIsOpen);
  const setOpen = useDeleteModalStore((state) => state.setOpen);
  const onConfirmCallback = useDeleteModalStore((state) => state.onConfirmCallback);
  const onCancelCallback = useDeleteModalStore((state) => state.onCancelCallback);
  const [listItem, setListItem] = useState<UserUpdateType>({
    id: '',
    fullname: '',
    nickname: '',
    email: '',
    password: '',
    fk_id_rol: '',
  });

  const onConfirmForm = async () => {
    if (
      !listItem.password ||
      !listItem.email ||
      !listItem.fk_id_rol ||
      !listItem.fullname ||
      !listItem.nickname
    ) {
      toast.error('Todos los campos con * son obligatorios');
      return;
    }
    if (listItem.fullname.length < 4) {
      toast.error('El nombre debe de ser mayor de 3 caracteres');
      return;
    }
    if (listItem.password.length < 8) {
      toast.error('La contraseña debe de ser mayor a 7 caracteres');
      return;
    }
    if (listItem.nickname.length < 8) {
      toast.error('El usuario debe de ser mayor a 7 caracteres');
      return;
    }

    const { success, message }: ResponseWrapper<string | void> = listItem.id
      ? await performPut(listItem as UserUpdateType)
      : await performPost(listItem as UserCreateType);

    if (success) {
      toast.success(message);
      await get();
      setIsModalOpen(false);
      return;
    }

    toast.error(message);
  };

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

  const listRender = useMemo(() => (
    users.map((item) => (
      <Suspense key={item.id}>
        <UserRow
          user={item}
          onEdit={() => {
            setListItem({
              ...item,
              fk_id_rol: item.rol.id,
              password: '',
            });
            setIsModalOpen(true);
          }}
          onDelete={() => {
            setOpen(true);
            onCancelCallback(() => setOpen(false));
            onConfirmCallback(() => onConfirmDelete(item.id));
          }}
        />
      </Suspense>
    ))
  ), [users]);

  const roleOptions = useMemo<ReactSelectOptions>(() => (
    roles.map((role) => ({ value: role.id, label: role.name }))
  ), [roles]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>rol</TableHead>
            <TableHead className="w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        {users.length > 0 && (<TableBody>{listRender}</TableBody>)}
      </Table>
      {users.length === 0 && (<EmptyTable />)}

      <CenterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        hasClickBlurClose
        style={{
          maxWidth: '400px',
          maxHeight: 'none',
          height: 'auto',
        }}
        allowConfirm
        confirmButtonText="Guardar"
        cancelButtonText="Cancelar"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={onConfirmForm}
      >
        <form className="flex self-stretch flex-col gap-1">
          <FormField
            label="Nombre"
            className="w-full"
            input={
              <Input
                className="w-full"
                type="text"
                placeholder="Nombre"
                value={listItem?.fullname}
                onChange={(e) => setListItem({ ...listItem, fullname: e.target.value })}
              />
            }
          />
          <FormField
            label="Nombre de usuario"
            className="w-full"
            input={
              <Input
                className="w-full"
                type="text"
                placeholder="Nombre de usuario"
                value={listItem?.nickname}
                onChange={(e) => setListItem({ ...listItem, nickname: e.target.value })}
              />
            }
          />
          <FormField
            label="Email"
            className="w-full"
            input={
              <Input
                className="w-full"
                type="email"
                placeholder="example555@example.com"
                value={listItem?.email}
                onChange={(e) => setListItem({ ...listItem, email: e.target.value })}
              />
            }
          />
          <FormField
            label="Contraseña"
            className="w-full"
            input={
              <Input
                className="w-full"
                type="password"
                placeholder="********"
                value={listItem?.password}
                onChange={(e) => setListItem({ ...listItem, password: e.target.value })}
              />
            }
          />
          <FormField
            label="Rol"
            className="w-full"
            input={
              <ReactSelect
                className="w-full"
                placeholder="Selecciona un rol"
                options={roleOptions}
                value={roleOptions.find((role) => role.value === listItem.fk_id_rol)}
                onChange={(item) => setListItem({ ...listItem, fk_id_rol: (item as Option).value })}
              />
            }
          />
        </form>
      </CenterModal>
    </div>
  );
}

export default UsersTable;
