import styles from './steps.module.scss';

type Props = {
  isActive?: boolean;
};

function Dot({ isActive }: Props) {
  return (
    <div className={`${styles.dot} ${isActive ? styles.active : ''}`} />
  );
}

export default Dot;
