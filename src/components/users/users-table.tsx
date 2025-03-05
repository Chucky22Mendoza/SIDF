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
import { Select } from "../ui/select";

type Props = {
  users: IUser[];
};

function UsersTable({ users }: Props) {
  const { get, performDelete, performPost, performPut } = useUsers();
  const isModalOpen = useUserModalStore((state) => state.isOpen);
  const setIsModalOpen = useUserModalStore((state) => state.setIsOpen);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [listItem, setListItem] = useState<UserUpdateType>({
    id: '',
    fullname: '',
    nickname: '',
    email: '',
    password: '',
    fk_id_rol: '',
  });

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
            setListItem({
              ...item,
              fk_id_rol: item.rol.id,
              password: '',
            });
            setIsDeleteModalOpen(true);
          }}
        />
      </Suspense>
    ))
  ), [users]);

  const onConfirmForm = async () => {
    const { success, message }: ResponseWrapper<string | void> = listItem.id
      ? await performPut(listItem as UserUpdateType)
      : await performPost(listItem as UserCreateType);

    if (success) {
      toast.success(message);
      await get();
      // setListItem({ id: '', name: '' });
      setIsModalOpen(false);
      return;
    }

    toast.error(message);
  };

  const onCancelForm = () => {
    // setListItem({ id: '', name: '' });
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const onConfirmDelete = async () => {
    const { success, message } = await performDelete(listItem.id);
    if (success) {
      await get();
      setIsDeleteModalOpen(false);
      // setListItem({ id: '', name: '' });
      toast.success(message);
      return;
    }

    toast.error(message);
  };

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
              <Select
                className="w-full"
                value={listItem?.fk_id_rol}
                onChange={(e) => setListItem({ ...listItem, fk_id_rol: e.target.value })}
              >
                {roles.map((role) => (<option value={role.id} key={role.id}>{role.name}</option>))}
              </Select>
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

export default UsersTable;
