import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export function DescriptionTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="releaseYear">Año de estreno</Label>
          <Input id="releaseYear" type="number" placeholder="Año de estreno" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="director">Director</Label>
          <Select id="director">
            <option value="">Seleccione el director</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="production">Producción</Label>
          <Select id="production">
            <option value="">Seleccione o escriba a los productores</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="stars">Estelares</Label>
          <Select id="stars">
            <option value="">Escriba o selecciones a los estelares</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="genre">Género</Label>
          <Select id="genre">
            <option value="">Seleccione o escriba el género</option>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">País</Label>
          <Select id="country">
            <option value="">Escriba o escoja el país</option>
          </Select>
        </div>
      </div>
    </div>
  );
}