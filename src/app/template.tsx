'use client';

import { PropsWithChildren, useEffect } from 'react'
import { toast, Toaster } from 'sonner';

function template({ children }: PropsWithChildren<{}>) {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast.warning('Debido a las políticas de uso y reproducción se ha bloqueado el uso de esta función');
      console.log('Debido a las políticas de uso y reproducción se ha bloqueado el uso de esta función');
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <>
      <Toaster position="bottom-right" expand richColors />
      {children}
    </>
  )

}

export default template