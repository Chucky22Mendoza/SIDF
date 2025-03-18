import Link from "next/link";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { Eye, Pencil, Trash } from "lucide-react";
import { IFilmRow } from "@/domain/Filme";

type Props = {
  film: IFilmRow;
  onDelete?: () => void;
};

function FilmRow({ film, onDelete }: Props) {
  return (
    <TableRow>
      <TableCell>{film.title}</TableCell>
      <TableCell>{film.director}</TableCell>
      <TableCell>{film.year}</TableCell>
      <TableCell>{film.gender}</TableCell>
      <TableCell>{film.copies}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/viewer/${film.id}`}>
              <Eye className="h-4 w-4 text-green-600" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/admin/records/${film.id}`}>
              <Pencil className="h-4 w-4 text-orange-700" />
            </Link>
          </Button>
          <Button onClick={onDelete} variant="ghost" size="icon">
            <Trash className="h-4 w-4 text-red-700" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default FilmRow;
