import { ImageUpload } from "@/components/shared/image-upload";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Grid } from "@/components/ui/grid";

export function GeneralTab() {
  return (
    <div className="space-y-6">
      <FormField
        label="Título"
        input={
          <Input 
            id="title" 
            placeholder="Título del filme"
            className="w-full"
          />
        }
      />

      <Grid columns={3}>
        <FormField
          label="Tipología"
          input={
            <Select>
              <option value="">Seleccionar tipología</option>
            </Select>
          }
        />
        
        <FormField
          label="Fondo"
          input={
            <Select>
              <option value="">Seleccionar fondo</option>
            </Select>
          }
        />
        
        <FormField
          label="Colección"
          input={
            <Select>
              <option value="">Seleccionar colección</option>
            </Select>
          }
        />
      </Grid>

      <Grid columns={3}>
        <FormField
          label="Caja"
          input={
            <Select>
              <option value="">Seleccionar caja</option>
            </Select>
          }
        />
        
        <FormField
          label="Estante"
          input={
            <Select>
              <option value="">Seleccionar estante</option>
            </Select>
          }
        />
        
        <FormField
          label="# copias"
          input={
            <div className="flex gap-2">
              <Input type="number" min="1" defaultValue="1" />
              <Button variant="outline">Ver</Button>
            </div>
          }
        />
      </Grid>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Imágenes</h3>
        <Grid columns={3}>
          <ImageUpload />
          <ImageUpload />
          <ImageUpload />
        </Grid>
      </div>
    </div>
  );
}