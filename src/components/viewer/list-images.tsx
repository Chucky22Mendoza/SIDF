import { IFilmView } from "@/domain/Filme";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../ui/table";
import ListImageRow from "./list-image-row";
import { useMemo } from "react";

type Props = {
  films: IFilmView[];
};

function ListImages({ films }: Props) {
  const listRender = useMemo(() => (
    films.map((film) => <ListImageRow key={film.id} film={film} />)
  ), [films]);

  return (
    <div className="bg-white rounded-lg shadow">
      <Table className="min-w-full divide-y divide-gray-200">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Película
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Año
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Director
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Filmoteca
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </TableHead>
            <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        {films.length > 0 && <TableBody>{listRender}</TableBody>}
      </Table>
    </div>
  );
}

export default ListImages;
