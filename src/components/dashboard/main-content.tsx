import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilmForm } from "@/components/films/film-form";
import { FilmList } from "@/components/films/film-list";

export function MainContent() {
  return (
    <main className="flex-1 p-6">
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Lista de Registros</TabsTrigger>
          <TabsTrigger value="new">Nuevo Registro</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <FilmList />
        </TabsContent>
        <TabsContent value="new">
          <FilmForm />
        </TabsContent>
      </Tabs>
    </main>
  );
}