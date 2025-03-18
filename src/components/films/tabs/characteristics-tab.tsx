import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormField } from "@/components/shared/form-field";
import { useCatalogs } from "@/hooks/useCatalogs";
import { useEffect, useMemo, useState } from "react";
import { ICatalogData } from "@/domain/Catalogs";
import ReactSelect, { Option, ReactSelectOptions } from "@/components/ui/react-select";
import { useFilmeStore } from "@/store/FilmeStore";

export function CharacteristicsTab() {
  const { get } = useCatalogs();
  const [supports, setSupports] = useState<ICatalogData[]>([]);
  const [techniques, setTechniques] = useState<ICatalogData[]>([]);
  const characteristics = useFilmeStore((state) => state.characteristics);
  const setCharacteristics = useFilmeStore((state) => state.setCharacteristics);

  const getData = () => {
    get('soporte').then(setSupports);
    get('tecnica').then(setTechniques)
  };

  useEffect(() => {
    getData();
  }, []);

  const supportsOptions = useMemo<ReactSelectOptions>(() => (supports.map((item) => ({
    label: item.name,
    value: item.id,
  }))), [supports]);

  const techniquesOptions = useMemo<ReactSelectOptions>(() => (techniques.map((item) => ({
    label: item.name,
    value: item.id,
  }))), [techniques]);

  return (
    <div className="space-y-6 flex flex-1 self-stretch flex-col">
      <div className="flex gap-3 self-stretch justify-between">
        <FormField
          label="Soporte*"
          className="flex flex-1 flex-col"
          input={
            <ReactSelect
              options={supportsOptions}
              placeholder="Seleccionar Soporte"
              value={supportsOptions?.find((item) => item.value === characteristics.fkIdSoporte)}
              onChange={(data) => setCharacteristics({
                ...characteristics,
                fkIdSoporte: (data as Option).value,
              })}
            />
          }
        />

        <FormField
          label="Técnica de impresión*"
          className="flex flex-1 flex-col"
          input={
            <ReactSelect
              options={techniquesOptions}
              placeholder="Seleccionar Técnica"
              value={techniquesOptions?.find((item) => item.value === characteristics.fkIdTecnica)}
              onChange={(data) => setCharacteristics({
                ...characteristics,
                fkIdTecnica: (data as Option).value,
              })}
            />
          }
        />
      </div>
      <div className="flex gap-3 self-stretch justify-between">
        <FormField
          label="Alto*"
          className="flex flex-1 flex-col"
          input={
            <Input
              type="number"
              min={0.1}
              placeholder="1.23"
              value={characteristics.alto}
              onChange={(e) => setCharacteristics({
                ...characteristics,
                alto: Number(e.target.value),
              })}
            />
          }
        />

        <FormField
          label="Ancho*"
          className="flex flex-1 flex-col"
          input={
            <Input
              type="number"
              min={0.1}
              placeholder="1.23"
              value={characteristics.ancho}
              onChange={(e) => setCharacteristics({
                ...characteristics,
                ancho: Number(e.target.value),
              })}
            />
          }
        />

        <FormField
          label="Tipo medidas"
          className="flex flex-1 flex-col justify-center"
          input={
            <RadioGroup
              className="flex gap-4"
              value={characteristics.tipoMedida}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="CM"
                  id="cm"
                  checked={characteristics.tipoMedida === 'CM'}
                  onClick={() => setCharacteristics({
                    ...characteristics,
                    tipoMedida: 'CM',
                  })}
                />
                <Label htmlFor="cm">Cm</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="PUL"
                  id="pul"
                  checked={characteristics.tipoMedida === 'PUL'}
                  onClick={() => setCharacteristics({
                    ...characteristics,
                    tipoMedida: 'PUL',
                  })}
                />
                <Label htmlFor="pul">Pul</Label>
              </div>
            </RadioGroup>
          }
        />
      </div>
    </div>
  );
}
