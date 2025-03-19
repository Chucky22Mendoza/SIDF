import styles from './CardStat.module.scss';

type Props = {
  label: string;
  icon: React.ReactElement;
  total: number;
};

function CardStat({ label, icon, total }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        {icon}
      </div>
      <div className={styles.info}>
        <h1>{total}</h1>
        <span title={label}>{label}</span>
      </div>
    </div>
  );
}

export default CardStat;
