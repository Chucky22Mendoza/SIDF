import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  bg: 'tomato' | 'muted';
  className?: string;
  hash?: string;
};

function SectionContainer({ children, bg, className, hash }: Props) {
  return (
    <section
      id={hash}
      style={{
        backgroundColor: bg === 'tomato' ? 'tomato' : '#E7E6E1',
      }}
      className={cn(
        'flex min-h-screen h-full w-full max-w-full scroll-smooth',
        className,
      )}
    >
      {children}
    </section>
  );
}

export default SectionContainer;
