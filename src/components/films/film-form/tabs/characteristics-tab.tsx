"use client";

import { FormField } from "@/components/shared/form-field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Grid } from "@/components/ui/grid";

export function CharacteristicsTab() {
  return (
    <div className="space-y-6">
      <Grid columns={2}>
        <FormField
          label="Soporte"
          input={
            <Select>
              <option value="">Seleccionar soporte</option>
            </Select>
          }
        />

        <FormField
          label="Técnica"
          input={
            <Select>
              <option value="">Seleccionar técnica</option>
            </Select>
          }
        />
      </Grid>

      <Grid columns={2}>
        <FormField
          label="Alto (cm)"
          input={
            <Input 
              type="number" 
              step="0.1"
              min="0"
              placeholder="0.0"
            />
          }
        />

        <FormField
          label="Ancho (cm)"
          input={
            <Input 
              type="number" 
              step="0.1"
              min="0"
              placeholder="0.0"
            />
          }
        />
      </Grid>

      <div className="space-y-3">
        <Label>Tipo medidas</Label>
        <RadioGroup defaultValue="cm" className="flex gap-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cm" id="cm" />
            <Label htmlFor="cm">Centímetros</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pul" id="pul" />
            <Label htmlFor="pul">Pulgadas</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}