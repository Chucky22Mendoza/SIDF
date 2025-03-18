import styles from './steps.module.scss';

type Props = {
  isActive?: boolean;
};

function Line({ isActive }: Props) {
  return (
    <div className={`${styles.line} ${isActive ? styles.active : ''}`} />
  );
}

export default Line;