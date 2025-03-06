"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DescriptionTab } from "./tabs/description-tab";
import { CharacteristicsTab } from "./tabs/characteristics-tab";
import { AccessibilityTab } from "./tabs/accessibility-tab";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function FilmForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
    router.push("/dashboard/registros");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Nuevo Registro</CardTitle>
          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="description">Descripción</TabsTrigger>
              <TabsTrigger value="characteristics">Características</TabsTrigger>
              <TabsTrigger value="accessibility">Accesibilidad</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              {/* <GeneralTab /> */}
            </TabsContent>
            <TabsContent value="description">
              <DescriptionTab />
            </TabsContent>
            <TabsContent value="characteristics">
              <CharacteristicsTab />
            </TabsContent>
            <TabsContent value="accessibility">
              <AccessibilityTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </form>
  );
}