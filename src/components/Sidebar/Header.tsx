'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './sidebar.module.css';
import { ArrowLeft } from 'lucide-react';

type Props = {
  onClick: (value: boolean) => void;
};

function Header({ onClick }: Props) {
  const [isCollapsed, setCollapsed] = useState(false);

  return (
    <div className={styles['sidebar-first']}>
      <div>
        {
          isCollapsed
            ? <Image className={styles['logo-yimi']} src="/images/logo.png" alt="Logo" width={56} height={24} />
            : <Image className={styles['logo-yimi']} src="/images/logo.png" alt="Logo" width={66} height={28} />
        }
        <button
          type="button"
          onClick={() => {
            setCollapsed(!isCollapsed);
            onClick(!isCollapsed);
          }}
          className={styles['drawer-button']}
          style={{
            cursor: 'pointer',
          }}
        >
          <ArrowLeft
            style={{
              transform: isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default Header;
