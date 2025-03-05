import styles from './DecadesContainer.module.css';

type Props = {
  path: string;
  decade: number;
  onClick: () => void;
};

export function Card({ path, decade, onClick }: Props) {
  return (
    <button onClick={onClick} className={styles.card}>
      <img src={path} alt={`Decada de ${decade}`} loading="lazy" />
    </button>
  );
}
