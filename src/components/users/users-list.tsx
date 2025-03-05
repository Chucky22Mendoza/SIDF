'use client';

import { Plus, Search } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { useUsersListStore } from '@/store/UsersListStore';
import UsersTable from './users-table';
import { useUsers } from '@/hooks/useUsers';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { Button } from '../ui/button';
import { useUserModalStore } from '@/store/UserModalStore';

function UsersList() {
  const [searchText, setSearchText] = useState('');
  const setIsModalOpen = useUserModalStore((state) => state.setIsOpen);
  const users = useUsersListStore((state) => state.users);
  const { get, performSearch } = useUsers();

  const handleSearch = async (searchText: string) => {
    if (searchText === '') {
      await get();
      return;
    }
    await performSearch(searchText);
  };

  const debounceHandlerSearch = useCallback(debounce(handleSearch, 300), []);

  useEffect(() => {
    debounceHandlerSearch(searchText);
  }, [searchText, debounceHandlerSearch]);

  useEffect(() => { get(); }, []);

  return (
    <Card className="w-full flex-1">
      <div className="p-4 space-y-4">
        <div className="flex justify-between gap-2">
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              className="pl-8"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-white py-2 px-3 hover:bg-primary-600">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Usuario
          </Button>
        </div>
        <UsersTable users={users} />
      </div>
    </Card>
  );
}

export default UsersList;
