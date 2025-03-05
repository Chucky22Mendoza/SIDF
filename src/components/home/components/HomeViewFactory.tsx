'use client';

import SectionContainer from '@/components/ui/SectionContainer';
import { Header } from './Header';
import styles from './index.module.css';
import { Footer } from './Footer';
import { Welcome } from './sections/Welcome';
import Filmoteca from './sections/Filmoteca';
import { Stills } from './sections/Stills';
import { Fotomontaje } from './sections/Fotomontaje';
import { Cartel } from './sections/Cartel';
import { Contact } from './sections/Contact';
import { FloatSearch } from './FloatSearch';
import { DecadesContainer } from './DecadesContainer';
import { DecadesImages } from '../domain/data';
import { useState } from 'react';

function HomeViewFactory() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <main className="flex flex-1 flex-col scroll-smooth">
      <Header />
      <section className={`${styles['bg-img']} min-h-screen`} id="home" />
      <SectionContainer bg="tomato" className="p-10 justify-center items-center" hash="inicio">
        <Welcome />
      </SectionContainer>
      <SectionContainer bg="muted" hash="filmoteca" className="p-10 flex-col overflow-visible">
        <Filmoteca />
      </SectionContainer>
      <SectionContainer bg="tomato" className="p-10 flex-col gap-5 items-center" hash="materiales">
        <Stills />
      </SectionContainer>
      <SectionContainer bg="muted" className="p-10 flex-col gap-5 items-center">
        <Fotomontaje />
      </SectionContainer>
      <SectionContainer bg="tomato" className="p-10 flex-col gap-5 items-center">
        <Cartel />
      </SectionContainer>
      <SectionContainer bg="muted" className="p-10 flex-col gap-5 items-center" hash="contacto">
        <Contact />
      </SectionContainer>
      <Footer />
      <FloatSearch onClick={() => setIsOpen(true)} />
      <DecadesContainer
        isOpen={isOpen}
        images={DecadesImages}
        onClose={() => setIsOpen(false)}
      />
    </main>
  );
}

export default HomeViewFactory;
