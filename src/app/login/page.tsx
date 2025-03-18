'use client';

import { LoginForm } from "@/components/auth/login-form";
import PreventBackNavigation from "@/components/auth/PreventBackNavigation";

export default function Home() {
  return (
    <>
      <PreventBackNavigation />
      <main className="min-h-screen flex items-center justify-center bg-neutral-50">
        <LoginForm />
      </main>
    </>
  );
}