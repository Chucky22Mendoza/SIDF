import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './navbar.module.css';

type Props = {
  href: string;
  label: string;
};

function Row({ label, href }: Props) {
  const pathname = usePathname();

  return (
    <Link href={href} className={pathname === href ? styles.active : ''}>
      <p>{label}</p>
    </Link>
  );
}

export default Row;
