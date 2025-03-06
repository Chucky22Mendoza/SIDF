'use client';

import { setAuthToken } from '@/lib/fetchWithAuth';
import styles from './sidebar.module.css';
import Row from './Row';
import { LogOut, Smile } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRoleUserLoggedStore } from '@/store/RoleUserLoggedStore';
import { useLoginForm } from '@/hooks/useLoginForm';
import { roles } from '@/domain/Role';

type Props = {
  isCollapsed: boolean;
};

function Footer({ isCollapsed }: Props) {
  const router = useRouter();
  const setRole = useRoleUserLoggedStore((state) => state.setRole);
  const user = useRoleUserLoggedStore((state) => state.user);
  const roleId = useRoleUserLoggedStore((state) => state.roleId);
  const setUser = useRoleUserLoggedStore((state) => state.setUser);
  const { handleLogOut } = useLoginForm();

  return (
    <div className={styles['sidebar-user']}>
      <Row
        row={{
          icon: <Smile />,
          title: user?.nickname ?? roles.find(role => role.id === roleId)?.name ?? 'Anonymous',
        }}
      />
      <Row
        row={{
          icon: <LogOut />,
          title: 'Cerrar sesión',
          onClick: async () => {
            await handleLogOut();
            setAuthToken(undefined);
            setRole(null);
            setUser(null);
            router.push('/login');
          }
        }}
        isCollapsed={isCollapsed}
      />
    </div>
  );
}

export default Footer;
