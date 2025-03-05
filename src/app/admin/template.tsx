'use client';

import { PropsWithChildren } from 'react'
import { Toaster } from 'sonner';

function template({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Toaster position="bottom-right" expand richColors />
      {children}
    </>
  )

}

export default template