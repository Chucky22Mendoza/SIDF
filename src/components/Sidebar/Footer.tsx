'use client';

import { fetchWithAuth, setAuthToken } from '@/lib/fetchWithAuth';
import styles from './sidebar.module.css';
import Row from './Row';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRoleUserLoggedStore } from '@/store/RoleUserLoggedStore';

type Props = {
  isCollapsed: boolean;
};

function Footer({ isCollapsed }: Props) {
  const router = useRouter();
  const setRole = useRoleUserLoggedStore((state) => state.setRole);
  const setUserId = useRoleUserLoggedStore((state) => state.setUserId);
  return (
    <div className={styles['sidebar-user']}>
      <Row
        row={{
          icon: <LogOut/>,
          title: 'Cerrar sesión',
          onClick: async () => {
            setAuthToken(undefined);
            setUserId(null);
            setRole(null);
            await fetchWithAuth('/api/auth/log-out');
            router.push('/login');
          }
        }}
        isCollapsed={isCollapsed}
      />
    </div>
  );
}

export default Footer;
