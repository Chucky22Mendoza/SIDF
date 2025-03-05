"use client";

import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Grid } from "@/components/ui/grid";

export function DescriptionTab() {
  return (
    <div className="space-y-6">
      <Grid columns={2}>
        <FormField
          label="Año de estreno"
          input={
            <Input 
              type="number" 
              placeholder="Año de estreno"
              min={1900}
              max={new Date().getFullYear()}
            />
          }
        />

        <FormField
          label="Director"
          input={
            <Select>
              <option value="">Seleccione el director</option>
            </Select>
          }
        />
      </Grid>

      <FormField
        label="Producción"
        input={
          <Select>
            <option value="">Seleccione o escriba a los productores</option>
          </Select>
        }
      />

      <FormField
        label="Estelares"
        input={
          <Select>
            <option value="">Escriba o selecciones a los estelares</option>
          </Select>
        }
      />

      <Grid columns={2}>
        <FormField
          label="Género"
          input={
            <Select>
              <option value="">Seleccione o escriba el género</option>
            </Select>
          }
        />

        <FormField
          label="País"
          input={
            <Select>
              <option value="">Escriba o escoja el país</option>
            </Select>
          }
        />
      </Grid>
    </div>
  );
}