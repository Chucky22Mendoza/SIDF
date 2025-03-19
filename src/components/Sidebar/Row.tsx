import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './sidebar.module.css';

type Props = {
  row: {
    title: string,
    icon: React.ReactNode,
    href?: string,
    onClick?: () => void,
  };
  isCollapsed?: boolean;
};

function Row({ row, isCollapsed }: Props) {
  const pathname = usePathname();
  const classActive = useMemo(() =>
    pathname === row.href || pathname.includes(row.href ?? 'null') ? styles.active : ''
  , [pathname, row.href]);
  const ref = React.useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    if (isCollapsed) {
      setTimeout(() => {
        if (!ref.current) return;
        (ref.current as HTMLDivElement).style.flexDirection = "column";
      }, 200);
      return;
    }
    (ref.current as HTMLDivElement).style.flexDirection = "row";
  }, [isCollapsed])

  if (row.href) {
    return (
      <Link
        ref={ref}
        href={row.href ?? ''}
        className={`${styles['view-option']} ${classActive}`}
      >
        {row.icon}
        <p>{row.title}</p>
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      onClick={row.onClick}
      className={`${styles['view-option']} ${classActive}`}
    >
      {row.icon}
      <p>{row.title}</p>
    </button>
  );
}

export default Row;
