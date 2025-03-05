'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Props = {
  hasNavigation?: boolean;
};

export function Header({ hasNavigation = true }: Props) {
  const [hash, setHash] = useState('');

  useEffect(() => {
    // Verificar si estamos en el cliente
    if (typeof window !== 'undefined') {
      setHash(window.location.hash); // Obtiene el hash actual
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
    <header className="flex flex-1 justify-between items-center bg-white bg-opacity-60 w-screen fixed py-2 px-4 z-10">
      <nav className="flex flex-1 justify-between items-center gap-4">
        <a href={hasNavigation ? '#home' : '/'} className="flex gap-4 items-center">
          <Image src="/images/logo.png" height={45} width={90} alt="Logo" />
          <h1 className="text-2xl font-bold text-red-950">SIDF</h1>
        </a>
        <div className="flex flex-1 items-center justify-end">
          {
            hasNavigation && (
              <ul className="flex flex-1 items-center gap-5 justify-end">
                <li><a className={`transition-all ${hash === '#inicio' || !hash ? 'text-red-900' : 'text-black'}`} href="#inicio">Inicio</a></li>
                <li><a className={`transition-all ${hash === '#filmoteca' ? 'text-red-900' : 'text-black'}`} href="#filmoteca">Filmoteca</a></li>
                <li><a className={`transition-all ${hash === '#materiales' ? 'text-red-900' : 'text-black'}`} href="#materiales">Materiales</a></li>
                <li><a className={`transition-all ${hash === '#contacto' ? 'text-red-900' : 'text-black'}`} href="#contacto">Contacto</a></li>
              </ul>
            )
          }
        </div>
      </nav>
    </header>
  );
}
