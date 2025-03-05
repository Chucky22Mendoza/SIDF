import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralTab } from "./tabs/general-tab";
import { DescriptionTab } from "./tabs/description-tab";
import { CharacteristicsTab } from "./tabs/characteristics-tab";
import { AccessibilityTab } from "./tabs/accessibility-tab";

export function FilmForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nuevo Registro</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="characteristics">Características</TabsTrigger>
            <TabsTrigger value="accessibility">Accesibilidad</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <GeneralTab />
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
  );
}