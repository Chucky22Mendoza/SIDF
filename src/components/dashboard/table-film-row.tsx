import Link from "next/link";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import { ILoanFilms } from "@/domain/Dashboard";

type Props = {
  film: ILoanFilms;
};

function TableFilmRow({ film }: Props) {
  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {film.title}
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {film.total}
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <Button className="text-blue-600 hover:text-blue-900">
          <Link href={`/admin/viewer/${film.id}`}>Ver detalles</Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default TableFilmRow;
