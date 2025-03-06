"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormField } from "@/components/shared/form-field";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { useLoginForm } from "@/hooks/useLoginForm";
import { setAuthToken } from "@/lib/fetchWithAuth";
import { useRoleUserLoggedStore } from "@/store/RoleUserLoggedStore";
import { toast } from "sonner";
import { roles } from "@/domain/Role";

export function LoginForm() {
  const router = useRouter();
  const {
    nickname,
    password,
    handleNicknameChange,
    handlePasswordChange,
    handleSubmit,
  } = useLoginForm();
  const setRole = useRoleUserLoggedStore((state) => state.setRole);
  const setUser = useRoleUserLoggedStore((state) => state.setUser);

  const onClickAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, message, data } = await handleSubmit(e);

    if (success) {
      setAuthToken(data?.token);
      setRole(data?.role ?? null);
      setUser(data?.user ?? null);
      toast.success(message);
      if (data?.role === roles[0].id) {
        router.push('/admin/dashboard');
        return;
      }
      router.push('/admin/records');
    }

    toast.error(message);
  };

  return (
    <Card className="w-[400px] shadow-lg">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Image className="h-8 w-10" src="/images/logo.png" height={45} width={90} alt="Logo" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SIDF</h1>
          <p className="text-sm text-gray-500">
            Sistema Integral Digital de la Filmoteca
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onClickAuth}>
          <FormField
            label="Usuario"
            input={
              <Input
                type="text"
                placeholder="Ingresa tu usuario"
                value={nickname}
                onChange={handleNicknameChange}
              />
            }
          />
          <FormField
            label="Contraseña"
            input={
              <Input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={handlePasswordChange}
              />
            }
          />
          <Button className="w-full bg-primary hover:bg-primary/90 py-3 text-white" type="submit">
            Iniciar Sesión
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}