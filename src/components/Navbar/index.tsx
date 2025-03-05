'use client';

import Header from './Header';
import styles from './navbar.module.css';

type Props = {
  title: string;
  description: string;
  buttonText?: string;
  hrefButton?: string;
};

function Navbar({
  title,
  description,
  buttonText,
  hrefButton
}: Props) {
  return (
    <div className={styles['section-group-header']}>
      <Header
        title={title}
        description={description}
        buttonText={buttonText}
        hrefButton={hrefButton}
      />
    </div>
  );
}

export default Navbar;
