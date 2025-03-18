'use client';

import Header from './Header';
import styles from './sidebar.module.css';
import { BarChart, File, Film, FolderOpen, History, Image, Users } from 'lucide-react';
import Row from './Row';
import { useState } from 'react';
import Footer from './Footer';
import { useRoleUserLoggedStore } from '@/store/RoleUserLoggedStore';
import { roles } from '@/domain/Role';

const menuItems = [
  {
    title: "Reportes",
    icon: <BarChart />,
    href: "/admin/dashboard",
    isAdmin: true,
  },
  {
    title: "Registros",
    icon: <Film />,
    href: "/admin/records",
    isAdmin: false,
  },
  {
    title: "Imágenes",
    icon: <Image />,
    href: "/admin/viewer",
    isAdmin: false,
  },
  {
    title: "Préstamos",
    icon: <File />,
    href: "/admin/loans",
    isAdmin: false,
  },
  {
    title: "Historial",
    icon: <History />,
    href: "/admin/history",
    isAdmin: true,
  },
  {
    title: "Catálogos",
    icon: <FolderOpen />,
    href: "/admin/catalogs",
    isAdmin: false,
  },
  {
    title: "Usuarios",
    icon: <Users />,
    href: "/admin/users",
    isAdmin: true,
  },
];

function Sidebar() {
  const [isCollapsed, setCollapsed] = useState(false);
  const roleId = useRoleUserLoggedStore((state) => state.roleId);

  return (
    <div className={`${styles.sidebar} ${isCollapsed === true ? styles.collapsed : ''}`}>
      <Header onClick={setCollapsed} />
      <div className={styles['sidebar-options']}>
        {
          roleId != roles[0].id && (
            menuItems.filter((item) => !item.isAdmin).map((item) => (
              <Row
                key={`${item.title}`}
                row={item}
                isCollapsed={isCollapsed}
              />
            ))
          )
        }
        {
          roleId === roles[0].id && (
            menuItems.map((item) => (
              <Row
                key={`${item.title}`}
                row={item}
                isCollapsed={isCollapsed}
              />
            ))
          )
        }
      </div>
      <Footer isCollapsed={isCollapsed} />
    </div>
  );
}

export default Sidebar;
