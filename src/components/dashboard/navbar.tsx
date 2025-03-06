'use client';

import { LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { useLoginForm } from '@/hooks/useLoginForm';
import { setAuthToken } from '@/lib/fetchWithAuth';
import { useRouter } from 'next/navigation';
import { useRoleUserLoggedStore } from '@/store/RoleUserLoggedStore';

export function Navbar() {
  const { handleLogOut } = useLoginForm();
  const setRole = useRoleUserLoggedStore((state) => state.setRole);
  const setUser = useRoleUserLoggedStore((state) => state.setUser);
  const router = useRouter();

  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-2">
          <Image src="/images/logo.png" height={48} width={48} alt="Logo" />
          <span className="text-xl font-bold">SIDF</span>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Configuración</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await handleLogOut();
                  setAuthToken(undefined);
                  setRole(null);
                  setUser(null);
                  router.push('/login');
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}