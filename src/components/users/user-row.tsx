import { TableCell, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Pencil, Trash } from 'lucide-react';
import { IUser } from '@/domain/Users';
import { useRoleUserLoggedStore } from '@/store/RoleUserLoggedStore';

type Props = {
  user: IUser;
  onEdit: () => void;
  onDelete: () => void;
};

function UserRow({ user, onEdit, onDelete }: Props) {
  const userId = useRoleUserLoggedStore((state) => state.user?.id);
  const isUserLogged = user.id === userId;

  return (
    <TableRow>
      <TableCell>{user.fullname}</TableCell>
      <TableCell>{user.nickname}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.rol.name}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button onClick={onEdit} variant="ghost" size="icon">
            <Pencil className="h-4 w-4 text-orange-700" />
          </Button>
          {
            !isUserLogged && (
              <Button onClick={onDelete} variant="ghost" size="icon">
                <Trash className="h-4 w-4 text-red-700" />
              </Button>
            )
          }
        </div>
      </TableCell>
    </TableRow>
  )
}

export default UserRow