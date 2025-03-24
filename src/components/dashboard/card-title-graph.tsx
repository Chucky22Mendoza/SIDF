import React, { PropsWithChildren } from 'react';
import styles from './dashboard.module.scss';

type Props = PropsWithChildren<{
  title: string;
  style?: React.CSSProperties;
}>;

function CardTitleGraph({ title, children, style }: Props) {
  return (
    <div className={styles.graph} style={style}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default CardTitleGraph;