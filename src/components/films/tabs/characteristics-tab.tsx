import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function CharacteristicsTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="support">Soporte</Label>
            <Select id="support">
              <option value="">Seleccionar soporte</option>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technique">Técnica</Label>
            <Select id="technique">
              <option value="">Seleccionar técnica</option>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="height">Alto</Label>
            <Input id="height" type="number" step="0.1" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="width">Ancho</Label>
            <Input id="width" type="number" step="0.1" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tipo medidas</Label>
          <RadioGroup defaultValue="cm" className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cm" id="cm" />
              <Label htmlFor="cm">Cm</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pul" id="pul" />
              <Label htmlFor="pul">Pul</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}