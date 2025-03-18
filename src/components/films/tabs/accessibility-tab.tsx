import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FormField } from "@/components/shared/form-field";
import ReactSelect, { Option, ReactSelectOptions } from "@/components/ui/react-select";
import { useCatalogs } from "@/hooks/useCatalogs";
import { useEffect, useMemo, useState } from "react";
import { ICatalogData } from "@/domain/Catalogs";
import { useFilmeStore } from "@/store/FilmeStore";

export function AccessibilityTab() {
  const { get } = useCatalogs();
  const [cataloguers, setCataloguers] = useState<ICatalogData[]>([]);
  const [capturists, setCapturists] = useState<ICatalogData[]>([]);
  const [archives, setArchives] = useState<ICatalogData[]>([]);
  const accesibility = useFilmeStore((state) => state.accesibility);
  const setAccesibility = useFilmeStore((state) => state.setAccesibility);

  const getData = () => {
    get('catalogador').then(setCataloguers);
    get('capturista').then(setCapturists);
    get('archivo').then(setArchives);
  };

  useEffect(() => {
    getData();
  }, []);

  const cataloguersOptions = useMemo<ReactSelectOptions>(() => (cataloguers.map((item) => ({
    label: item.name,
    value: item.id,
  }))), [cataloguers]);

  const capturistsOptions = useMemo<ReactSelectOptions>(() => (capturists.map((item) => ({
    label: item.name,
    value: item.id,
  }))), [capturists]);

  const archivesOptions = useMemo<ReactSelectOptions>(() => (archives.map((item) => ({
    label: item.name,
    value: item.id,
  }))), [archives]);

  return (
    <div className="space-y-6 flex flex-1 self-stretch flex-col">
      <div className="flex gap-3 self-stretch justify-between">
        <FormField
          label="Permite consulta"
          className="flex flex-1 flex-col"
          input={
            <div className="flex items-center space-x-2">
              <Switch
                id="allowConsult"
                checked={accesibility.consulta}
                onCheckedChange={(checked) => setAccesibility({
                  ...accesibility,
                  consulta: checked,
                })}
              />
              <Label htmlFor="allowConsult">{accesibility.consulta ? 'Sí' : 'No'}</Label>
            </div>
          }
        />

        <FormField
          label="Permite reproducción"
          className="flex flex-1 flex-col"
          input={
            <div className="flex items-center space-x-2">
              <Switch
                id="allowReproduction"
                checked={accesibility.reproduccion}
                onCheckedChange={(checked) => setAccesibility({
                  ...accesibility,
                  reproduccion: checked,
                })}
              />
              <Label htmlFor="allowReproduction">{accesibility.reproduccion ? 'Sí' : 'No'}</Label>
            </div>
          }
        />

        <FormField
          label="Reproducción digital"
          className="flex flex-1 flex-col"
          input={
            <div className="flex items-center space-x-2">
              <Switch
                id="digitalReproduction"
                checked={accesibility.reproduccionDigital}
                onCheckedChange={(checked) => setAccesibility({
                  ...accesibility,
                  reproduccionDigital: checked,
                })}
              />
              <Label htmlFor="digitalReproduction">{accesibility.reproduccionDigital ? 'Sí' : 'No'}</Label>
            </div>
          }
        />
      </div>

      <div className="flex gap-3 self-stretch justify-between">
        <FormField
          label="Observaciones"
          className="w-full"
          input={
            <Textarea
              id="observations"
              placeholder="Escriba las observaciones generales"
              className="min-h-[100px]"
              value={accesibility?.observaciones ?? ''}
              onChange={(e) => setAccesibility({
                ...accesibility,
                observaciones: e.target.value
              })}
            />
          }
        />
      </div>
      <div className="flex gap-3 self-stretch justify-between">
        <FormField
          label="Catalogador*"
          className="flex flex-1 flex-col"
          input={
            <ReactSelect
              options={cataloguersOptions}
              placeholder="Seleccionar Catalogador"
              value={cataloguersOptions?.find((item) => item.value === accesibility.fkIdCatalogador)}
              onChange={(data) => setAccesibility({
                ...accesibility,
                fkIdCatalogador: (data as Option).value,
              })}
            />
          }
        />

        <FormField
          label="Capturista*"
          className="flex flex-1 flex-col"
          input={
            <ReactSelect
              options={capturistsOptions}
              placeholder="Seleccionar Capturista"
              value={capturistsOptions?.find((item) => item.value === accesibility.fkIdCapturista)}
              onChange={(data) => setAccesibility({
                ...accesibility,
                fkIdCapturista: (data as Option).value,
              })}
            />
          }
        />
      </div>
      <div className="flex gap-3 self-stretch justify-between">
        <FormField
          label="Archivo*"
          className="flex flex-1 flex-col"
          input={
            <ReactSelect
              options={archivesOptions}
              placeholder="Seleccionar Archivo"
              value={archivesOptions?.find((item) => item.value === accesibility.fkIdArchivo)}
              onChange={(data) => setAccesibility({
                ...accesibility,
                fkIdArchivo: (data as Option).value,
              })}
            />
          }
        />

        <FormField
          label="Año de catalogación*"
          className="flex flex-1 flex-col"
          input={
            <Input
              type="number"
              min={2000}
              max={new Date().getFullYear()}
              value={accesibility.yearCataloging}
              onChange={(e) => setAccesibility({
                ...accesibility,
                yearCataloging: Number(e.target.value),
              })}
            />
          }
        />
      </div>
    </div>
  );
}