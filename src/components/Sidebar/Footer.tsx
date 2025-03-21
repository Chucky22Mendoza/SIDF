'use client';

import { setAuthToken } from '@/lib/fetchWithAuth';
import styles from './sidebar.module.css';
import Row from './Row';
import { LogOut, UserCircle, Award, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRoleUserLoggedStore } from '@/store/RoleUserLoggedStore';
import { useLoginForm } from '@/hooks/useLoginForm';
import { useMemo, useState } from 'react';
import CenterModal from '../ui/CenterModal';
import { toast } from 'sonner';

type Props = {
  isCollapsed: boolean;
};

function Footer({ isCollapsed }: Props) {
  const router = useRouter();
  const [isShowInfo, setShowInfo] = useState(false);
  const [isLogOutOpen, setIsLogOutOpen] = useState(false);
  const setRole = useRoleUserLoggedStore((state) => state.setRole);
  const user = useRoleUserLoggedStore((state) => state.user);
  const setUser = useRoleUserLoggedStore((state) => state.setUser);
  const { handleLogOut } = useLoginForm();
  const slug = useMemo<string>(() => {
    if (!user) return '';

    if (!user.fullname.includes(' ')) {
      if (user.fullname.length > 1) {
        return `${user.fullname.charAt(0)}${user.fullname.charAt(1)}`.toUpperCase();
      }
      return user.fullname.charAt(0).toUpperCase();
    }
    const splitFullname = user.fullname.split(' ');
    if (splitFullname.length > 1) {
      return `${splitFullname[0].charAt(0)}${splitFullname[1].charAt(0)}`.toUpperCase();
    }
    return `${splitFullname[0].charAt(0)}${splitFullname[0].charAt(1)}`.toUpperCase();
  }, [user?.fullname]);

  const onClickLogOut = async () => {
    toast.loading('Cerrando sesión...');
    await handleLogOut();
    setAuthToken(undefined);
    setRole(null);
    setUser(null);
    toast.dismiss();
    router.push('/login');
  };

  return (
    <>
      <div className={styles['sidebar-user']}>
        <Row
          row={{
            icon: (
              <div
                className="bg-red-800 rounded-full p-1 relative"
                onClick={() => setShowInfo(!isShowInfo)}
              >
                <span className="text-white text-center text-lg">{slug}</span>
                <div className={`${isShowInfo ? 'flex' : 'hidden'} flex-col absolute bottom-[100%] left-0 bg-white rounded-xl px-3 py-1 z-10 shadow-lg shadow-red-500 gap-1 animate-in`}>
                  <span className="flex items-center gap-2 text-left"><UserCircle className="text-red-600 h-6 w-6" />{user?.fullname}</span>
                  <span className="flex items-center gap-2 text-left"><Award className="text-red-600 h-6 w-6" />{user?.nickname}</span>
                  <span className="flex items-center gap-2 text-left"><Mail className="text-red-600 h-6 w-6" />{user?.email}</span>
                </div>
              </div>
            ),
            title: 'Mis datos',
            onClick: () => setShowInfo(!isShowInfo),
          }}
          isCollapsed={isCollapsed}
        />
        <Row
          row={{
            icon: <LogOut />,
            title: 'Cerrar sesión',
            onClick: () => setIsLogOutOpen(true),
          }}
          isCollapsed={isCollapsed}
        />
      </div>
      <CenterModal
        isOpen={isLogOutOpen}
        title="¿Estás seguro de cerrar sesión?"
        subtitle="Si cierras sesión, tendrás que iniciar sesión de nuevo para acceder a tu cuenta."
        onClose={() => setIsLogOutOpen(false)}
        onConfirm={onClickLogOut}
        confirmButtonText="Sí, Cerrar sesión"
        cancelButtonText="Volver"
        allowConfirm
        hasClickBlurClose
        onCancel={() => setIsLogOutOpen(false)}
      />
    </>
  );
}

export default Footer;
