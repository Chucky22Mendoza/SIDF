'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import styles from './header.module.scss';

type Props = {
  hasNavigation?: boolean;
};

export function Header({ hasNavigation = true }: Props) {
  const [hash, setHash] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHash(window.location.hash);
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);


  return (
    <header className={styles.header}>
      <nav>
        <a href={hasNavigation ? '#home' : '/'}>
          <Image src="/images/logo.png" height={45} width={90} alt="Logo" />
          <h1 className="text-2xl font-bold text-red-950">SIDF</h1>
        </a>
        <div>
          <ul className="flex flex-1 items-center gap-5 justify-end md:hidden">
            {hasNavigation && <li><a className={`transition-all ${hash === '#inicio' || !hash ? 'text-red-900' : 'text-black'} hover:text-red-900`} href="#inicio">Inicio</a></li>}
            {hasNavigation && <li><a className={`transition-all ${hash === '#filmoteca' ? 'text-red-900' : 'text-black'} hover:text-red-900`} href="#filmoteca">Filmoteca</a></li>}
            {hasNavigation && <li><a className={`transition-all ${hash === '#materiales' ? 'text-red-900' : 'text-black'} hover:text-red-900`} href="#materiales">Materiales</a></li>}
            {hasNavigation && <li><a className={`transition-all ${hash === '#contacto' ? 'text-red-900' : 'text-black'} hover:text-red-900`} href="#contacto">Contacto</a></li>}
            <li>
              <Link className={`flex gap-1 transition-all ${hash === '#contacto' ? 'text-red-900' : 'text-black'}`} href="/search">
                <Search className="hover:text-red-900" />
              </Link>
            </li>
          </ul>
          <button className="flex gap-2 relative lg:hidden">
            <Menu className="text-red-900" />
            <ul className="hidden absolute right-0 top-full bg-white shadow-md rounded-lg py-4 px-6 flex-col items-start gap-3">
              {hasNavigation && <li><a className={`transition-all ${hash === '#inicio' || !hash ? 'text-red-900' : 'text-black'} hover:text-red-900`} href="#inicio">Inicio</a></li>}
              {hasNavigation && <li><a className={`transition-all ${hash === '#filmoteca' ? 'text-red-900' : 'text-black'} hover:text-red-900`} href="#filmoteca">Filmoteca</a></li>}
              {hasNavigation && <li><a className={`transition-all ${hash === '#materiales' ? 'text-red-900' : 'text-black'} hover:text-red-900`} href="#materiales">Materiales</a></li>}
              {hasNavigation && <li><a className={`transition-all ${hash === '#contacto' ? 'text-red-900' : 'text-black'} hover:text-red-900`} href="#contacto">Contacto</a></li>}
              <li>
                <Link className={`flex gap-1 transition-all ${hash === '#contacto' ? 'text-red-900' : 'text-black'} hover:text-red-900`} href="/search">
                  Buscar <Search className="hover:text-red-900" />
                </Link>
              </li>
            </ul>
          </button>
        </div>
      </nav>
    </header>
  );
}
