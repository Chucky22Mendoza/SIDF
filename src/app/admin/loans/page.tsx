'use client';

import { LoansList } from "@/components/loans/loans-list";
import { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <LoansList />
    </Suspense>
  );
}

export default page;
