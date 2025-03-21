import { ILoanFilms } from '@/domain/Dashboard';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../ui/table';
import { useMemo } from 'react';
import TableFilmRow from './table-film-row';

type Props = {
  films?: ILoanFilms[];
};

function TableFilms({ films = [] }: Props) {
  const listRender = useMemo(() => (
    films.map((film) => <TableFilmRow key={film.id} film={film} />)
  ), [films]);

  return (
    <Table className="min-w-full divide-y divide-gray-200">
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Película
          </TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Préstamos
          </TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Acciones
          </TableHead>
        </TableRow>
      </TableHeader>
      {films.length > 0 && <TableBody>{listRender}</TableBody>}
    </Table>
  );
}

export default TableFilms;
