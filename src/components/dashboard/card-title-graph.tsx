import { PropsWithChildren } from 'react';
import styles from './dashboard.module.scss';

type Props = PropsWithChildren<{
  title: string;
}>;

function CardTitleGraph({ title, children }: Props) {
  return (
    <div className={styles.graph}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default CardTitleGraph;