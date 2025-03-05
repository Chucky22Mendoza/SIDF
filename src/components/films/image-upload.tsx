import { Label } from "@/components/ui/label";
import { ImagePlus } from "lucide-react";

export function ImageUpload() {
  return (
    <div className="relative">
      <input
        type="file"
        className="hidden"
        id="image-upload"
        accept="image/*"
      />
      <Label
        htmlFor="image-upload"
        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-neutral-50"
      >
        <ImagePlus className="w-8 h-8 text-neutral-400" />
        <span className="mt-2 text-sm text-neutral-500">
          Subir imagen
        </span>
      </Label>
    </div>
  );
}