import Image from "next/image";
import styles from './FloatSearch.module.css';

type Props = {
  onClick: () => void;
};

export function FloatSearch({ onClick }: Props) {
  return (
    <button className={styles['btn-search']} title="Décadas del cine de oro" onClick={onClick}>
      <Image src="/images/lupa.png" width={190} height={180} alt="Décadas del cine de oro" />
    </button>
  );
}
