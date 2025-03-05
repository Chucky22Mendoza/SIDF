import { TableCell, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Pencil, Trash } from 'lucide-react';

type Props = {
  name: string;
  onEdit: () => void;
  onDelete: () => void;
};

function ItemList({ name, onEdit, onDelete }: Props) {
  return (
    <TableRow>
        <TableCell>{name}</TableCell>
        <TableCell>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onEdit}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
  );
}

export default ItemList;
