"use client";

import { FormField } from "@/components/shared/form-field";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Grid } from "@/components/ui/grid";

export function AccessibilityTab() {
  return (
    <div className="space-y-6">
      <Grid columns={3}>
        <div className="space-y-2">
          <Label>Permite consulta</Label>
          <div className="flex items-center space-x-2">
            <Switch id="allowConsult" />
            <Label htmlFor="allowConsult">Sí</Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Permite reproducción</Label>
          <div className="flex items-center space-x-2">
            <Switch id="allowReproduction" />
            <Label htmlFor="allowReproduction">Sí</Label>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Reproducción digital</Label>
          <div className="flex items-center space-x-2">
            <Switch id="digitalReproduction" />
            <Label htmlFor="digitalReproduction">Sí</Label>
          </div>
        </div>
      </Grid>

      <FormField
        label="Observaciones"
        input={
          <Textarea 
            placeholder="Escriba las observaciones generales"
            className="min-h-[100px]"
          />
        }
      />

      <Grid columns={3}>
        <FormField
          label="Catalogador"
          input={
            <Select>
              <option value="">Seleccionar catalogador</option>
            </Select>
          }
        />

        <FormField
          label="Capturista"
          input={
            <Select>
              <option value="">Seleccionar capturista</option>
            </Select>
          }
        />

        <FormField
          label="Año de catalogación"
          input={
            <Input 
              type="number"
              min={1900}
              max={new Date().getFullYear()}
              defaultValue={new Date().getFullYear()}
            />
          }
        />
      </Grid>

      <FormField
        label="Archivo"
        input={
          <Select>
            <option value="">Seleccionar archivo</option>
          </Select>
        }
      />
    </div>
  );
}