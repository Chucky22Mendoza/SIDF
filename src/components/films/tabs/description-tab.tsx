import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import ReactSelect, { Option, ReactSelectOptions } from "@/components/ui/react-select";
import { ICatalogData } from "@/domain/Catalogs";
import { useCatalogs } from "@/hooks/useCatalogs";
import { useFilmeStore } from "@/store/FilmeStore";
import { useEffect, useMemo, useState } from "react";

export function DescriptionTab() {
  const { get } = useCatalogs();
  const [directors, setDirectors] = useState<ICatalogData[]>([]);
  const [productions, setProductions] = useState<ICatalogData[]>([]);
  const [stars, setStars] = useState<ICatalogData[]>([]);
  const [genders, setGenders] = useState<ICatalogData[]>([]);
  const [countries, setCountries] = useState<ICatalogData[]>([]);
  const description = useFilmeStore((state) => state.description);
  const setDescription = useFilmeStore((state) => state.setDescription);

  const getData = () => {
    get('director').then(setDirectors);
    get('produccion').then(setProductions)
    get('estelar').then(setStars);
    get('genero').then(setGenders);
    get('pais').then(setCountries);
  };

  useEffect(() => {
    getData();
  }, []);

  const directorsOptions = useMemo<ReactSelectOptions>(() => (directors.map((item) => ({
    label: item.name,
    value: item.id,
  }))), [directors]);

  const productionsOptions = useMemo<ReactSelectOptions>(() => (productions.map((item) => ({
    label: item.name,
    value: item.id,
  }))), [productions]);

  const starsOptions = useMemo<ReactSelectOptions>(() => (stars.map((item) => ({
    label: item.name,
    value: item.id,
  }))), [stars]);

  const gendersOptions = useMemo<ReactSelectOptions>(() => (genders.map((item) => ({
    label: item.name,
    value: item.id,
  }))), [genders]);

  const countriesOptions = useMemo<ReactSelectOptions>(() => (countries.map((item) => ({
    label: item.name,
    value: item.id,
  }))), [countries]);

  return (
    <div className="space-y-6 flex flex-1 self-stretch flex-col">
      <div className="flex gap-3 self-stretch justify-between">
        <FormField
          label="Año de estreno*"
          className="flex flex-1 flex-col"
          input={
            <Input
              type="number"
              min={1920}
              max={new Date().getFullYear()}
              value={description.yearRelease}
              onChange={(e) => setDescription({
                ...description,
                yearRelease: Number(e.target.value),
              })}
            />
          }
        />

        <FormField
          label="Director*"
          className="flex flex-1 flex-col"
          input={
            <ReactSelect
              options={directorsOptions}
              isMulti
              placeholder="Seleccionar Director o Directores"
              value={directorsOptions.filter((item) => description.directors.includes(item.value))}
              onChange={(data) => setDescription({
                ...description,
                directors: (data as ReactSelectOptions).map((item) => item.value),
              })}
            />
          }
        />

        <FormField
          label="Producción*"
          className="flex flex-1 flex-col"
          input={
            <ReactSelect
              options={productionsOptions}
              isMulti
              placeholder="Seleccionar Producción o Producciones"
              value={productionsOptions.filter((item) => description.productions.includes(item.value))}
              onChange={(data) => setDescription({
                ...description,
                productions: (data as ReactSelectOptions).map((item) => item.value),
              })}
            />
          }
        />
      </div>

      <div className="flex gap-3 self-stretch justify-between">
        <FormField
          label="Estelares*"
          className="flex flex-1 flex-col"
          input={
            <ReactSelect
              options={starsOptions}
              isMulti
              placeholder="Seleccionar Estelar o Estelares"
              value={starsOptions.filter((item) => description.stars.includes(item.value))}
              onChange={(data) => setDescription({
                ...description,
                stars: (data as ReactSelectOptions).map((item) => item.value),
              })}
            />
          }
        />

        <FormField
          label="Género*"
          className="flex flex-1 flex-col"
          input={
            <ReactSelect
              options={gendersOptions}
              isMulti
              placeholder="Seleccionar Género o Géneros"
              value={gendersOptions.filter((item) => description.genders.includes(item.value))}
              onChange={(data) => setDescription({
                ...description,
                genders: (data as ReactSelectOptions).map((item) => item.value),
              })}
            />
          }
        />

        <FormField
          label="País*"
          className="flex flex-1 flex-col"
          input={
            <ReactSelect
              options={countriesOptions}
              placeholder="Selecciona el País"
              value={countriesOptions?.find((item) => item.value === description.fkIdPais)}
              onChange={(data) => setDescription({
                ...description,
                fkIdPais: (data as Option).value,
              })}
            />
          }
        />
      </div>
    </div>
  );
}