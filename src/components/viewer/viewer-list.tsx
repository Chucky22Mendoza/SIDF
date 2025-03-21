import { LayoutGrid, ListIcon, Search } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import GridImages from './grid-images';
import ListImages from './list-images';
import { useFilms } from '@/hooks/useFilms';
import { useFilmsListStore } from '@/store/FilmsListStore';
import debounce from 'lodash.debounce';

function ViewerList() {
  const { getViewer, performViewerSearch } = useFilms();
  const [isGridView, setIsGridView] = useState(true);
  const [searchText, setSearchText] = useState('');
  const films = useFilmsListStore((state) => state.viewer);

  const handleSearch = async (searchText: string) => {
    if (searchText === '') {
      await getViewer();
      return;
    }
    await performViewerSearch(searchText);
  };

  const debounceHandlerSearch = useCallback(debounce(handleSearch, 300), []);

  useEffect(() => {
    debounceHandlerSearch(searchText);
  }, [searchText, debounceHandlerSearch]);

  useEffect(() => {
    getViewer();
  }, []);

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between gap-2">
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título, director o año..."
                className="pl-8"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded-lg ${isGridView ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                <LayoutGrid className="h-5 w-5 text-gray-700" />
              </Button>
              <Button
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded-lg ${!isGridView ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              >
                <ListIcon className="h-5 w-5 text-gray-700" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {
            isGridView
              ? <GridImages films={films} />
              : <ListImages films={films} />
          }
        </CardContent>
      </Card>
    </>
  )
}

export default ViewerList;
