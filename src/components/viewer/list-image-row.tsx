import { IFilmView } from "@/domain/Filme";
import { Button } from "../ui/button";
import Link from "next/link";
import { TableCell, TableRow } from "../ui/table";

type Props = {
  film: IFilmView;
};

function ListImageRow({ film }: Props) {
  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="px-6 py-4">
        <div className="flex items-center">
          <img
            src={film.images[0]}
            alt={film.title}
            className="h-10 w-16 object-cover rounded"
            loading="lazy"
          />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{film.title}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {film.year}
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {film.directors}
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {film.filmLibrary}
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          film.available
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {film.available ? 'Disponible' : 'No disponible'}
        </span>
      </TableCell>
      <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <Button className="text-blue-600 hover:text-blue-900">
          <Link href={`/admin/viewer/${film.id}`}>Ver detalles</Link>
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default ListImageRow;
