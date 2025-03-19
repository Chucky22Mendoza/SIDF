import { ImageUpload } from "@/components/shared/image-upload";
import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { useCatalogs } from "@/hooks/useCatalogs";
import { ICatalogData } from "@/domain/Catalogs";
import { useEffect, useMemo, useState } from "react";
import ReactSelect, { Option, ReactSelectOptions } from "@/components/ui/react-select";
import { useFilmeStore } from "@/store/FilmeStore";

export function GeneralTab() {
  const { get } = useCatalogs();
  const [typologies, setTypologies] = useState<ICatalogData[]>([]);
  const [fondos, setFondos] = useState<ICatalogData[]>([]);
  const [collections, setCollections] = useState<ICatalogData[]>([]);
  const [boxes, setBoxes] = useState<ICatalogData[]>([]);
  const [racks, setRacks] = useState<ICatalogData[]>([]);
  const general = useFilmeStore((state) => state.general);
  const setGeneral = useFilmeStore((state) => state.setGeneral);

  const getData = () => {
    get('tipologia').then(setTypologies);
    get('fondo').then(setFondos)
    get('coleccion').then(setCollections);
    get('caja').then(setBoxes);
    get('estante').then(setRacks);
  };

  useEffect(() => {
    getData();
  }, []);

  const typologiesOptions = useMemo<ReactSelectOptions>(() => typologies.map((item) => ({
    label: item.name,
    value: item.id,
  })), [typologies]);

  const fondosOptions = useMemo<ReactSelectOptions>(() => fondos.map((item) => ({
    label: item.name,
    value: item.id,
  })), [fondos]);

  const collectionsOptions = useMemo<ReactSelectOptions>(() => collections.map((item) => ({
    label: item.name,
    value: item.id,
  })), [collections]);

  const boxesOptions = useMemo<ReactSelectOptions>(() => boxes.map((item) => ({
    label: item.name,
    value: item.id,
  })), [boxes]);

  const racksOptions = useMemo<ReactSelectOptions>(() => racks.map((item) => ({
    label: item.name,
    value: item.id,
  })), [racks]);

  return (
    <div className="space-y-6 flex flex-1 self-stretch flex-col">
      <div className="flex gap-3 self-stretch justify-between">
        <FormField
          label="Título*"
          className="flex flex-col flex-1"
          input={
            <Input
              id="title"
              placeholder="Título del filme"
              className="flex flex-1"
              value={general.titulo}
              onChange={(e) => setGeneral({
                ...general,
                titulo: e.target.value,
              })}
            />
          }
        />

        <FormField
          label="Artículo"
          className="flex flex-col flex-1"
          input={
            <Input
              id="article"
              placeholder="el, la, los, las, un, una, unos, unas"
              className="flex flex-1"
              value={general.articulo ?? ''}
              onChange={(e) => setGeneral({
                ...general,
                articulo: e.target.value,
              })}
            />
          }
        />
      </div>

      <div className="flex gap-3 self-stretch justify-between">
        <FormField
          label="Tipología*"
          className="flex flex-1 flex-col"
          input={
            <ReactSelect
              options={typologiesOptions}
              placeholder="Seleccionar Tipología"
              value={typologiesOptions?.find((item) => item.value === general.fkIdTipologia)}
              onChange={(data) => setGeneral({
                ...general,
                fkIdTipologia: (data as Option).value,
              })}
            />
          }
        />

        <FormField
          label="Fondo*"
          className="flex flex-1 flex-col"
          input={
            <ReactSelect
              options={fondosOptions}
              placeholder="Seleccionar Fondo"
              value={fondosOptions?.find((item) => item.value === general.fkIdFondo)}
              onChange={(data) => setGeneral({
                ...general,
                fkIdFondo: (data as Option).value,
              })}
            />
          }
        />

        <FormField
          label="Colección*"
          className="flex flex-1 flex-col"
          input={
            <ReactSelect
              options={collectionsOptions}
              placeholder="Seleccionar Colección"
              value={collectionsOptions?.find((item) => item.value === general.fkIdColeccion)}
              onChange={(data) => setGeneral({
                ...general,
                fkIdColeccion: (data as Option).value,
              })}
            />
          }
        />
      </div>

      <div className="flex gap-3 self-stretch justify-between">
        <FormField
          label="Caja*"
          className="flex flex-1 flex-col"
          input={
            <ReactSelect
              options={boxesOptions}
              placeholder="Seleccionar Caja"
              value={boxesOptions?.find((item) => item.value === general.fkIdCaja)}
              onChange={(data) => setGeneral({
                ...general,
                fkIdCaja: (data as Option).value,
              })}
            />
          }
        />

        <FormField
          label="Estante*"
          className="flex flex-1 flex-col"
          input={
            <ReactSelect
              options={racksOptions}
              placeholder="Seleccionar Estante"
              value={racksOptions?.find((item) => item.value === general.fkIdEstante)}
              onChange={(data) => setGeneral({
                ...general,
                fkIdEstante: (data as Option).value,
              })}
            />
          }
        />

        <FormField
          label="# copias*"
          className="flex flex-1 flex-col"
          input={
            <Input
              type="number"
              min={1}
              value={general.copias}
              onChange={(e) => setGeneral({
                ...general,
                copias: Number(e.target.value),
              })}
            />
          }
        />
      </div>

      <div className="space-y-4 flex self-stretch flex-col items-center">
        <h3 className="text-lg font-medium flex text-center">Imagen*</h3>
        <div className="flex flex-1 gap-3 self-stretch justify-center">
          <ImageUpload
            key="img-upload-1"
            value={general.imagen1}
            onChangeImage={(base64Image: string | null) => setGeneral({
              ...general,
              imagen1: base64Image,
            })}
          />
        </div>
      </div>
    </div>
  );
}