import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export function AccessibilityTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="grid grid-cols-3 gap-4">
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="observations">Observaciones</Label>
          <Textarea 
            id="observations" 
            placeholder="Escriba las observaciones generales"
            className="min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cataloger">Catalogador</Label>
            <Select id="cataloger">
              <option value="">Seleccionar catalogador</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="capturer">Capturista</Label>
            <Select id="capturer">
              <option value="">Seleccionar capturista</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="catalogYear">Año de catalogación</Label>
            <Input id="catalogYear" type="number" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="archive">Archivo</Label>
          <Select id="archive">
            <option value="">Seleccionar archivo</option>
          </Select>
        </div>
      </div>
    </div>
  );
}