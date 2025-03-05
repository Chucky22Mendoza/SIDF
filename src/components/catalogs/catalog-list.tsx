'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CatalogTable } from "./catalog-table";
import { useCatalogs } from "@/hooks/useCatalogs";
import { catalogs, CatalogsType } from "@/domain/Catalogs";
import { useEffect, useState } from "react";
import { useCatalogsListStore } from "@/store/CatalogsListStore";

export default function CatalogList() {
  const [catalog, setCatalog] = useState<CatalogsType>(catalogs[0].id);
  const list = useCatalogsListStore((state) => state.list);
  const { get } = useCatalogs();

  useEffect(() => {
    get(catalog);
  }, [catalog]);

  return (
    <Card className="flex-1">
      <CardContent className="p-6">
        <Tabs defaultValue={catalogs[0].id} className="w-full">
          <TabsList className="w-full flex-wrap h-auto">
            {catalogs.map((item) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                onClick={() => {
                  setCatalog(item.id);
                }}>
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {catalogs.map((item) => (
            <TabsContent key={item.id} value={item.id}>
              <CatalogTable title={item.name} list={list} catalog={catalog} />
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}