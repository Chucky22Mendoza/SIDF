import { Label } from "@/components/ui/label";
import { ImagePlus } from "lucide-react";

type Props = {
  onLoadImage?: (base64Image: string) => void;
};

export function ImageUpload({ onLoadImage }: Props) {
  const processImage = (file: File) => {
    if (file.type === 'image/png' || file.type === 'image/jpeg') {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = () => {
        img.onload = () => {
          onLoadImage?.(img.src);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
      return;
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      className="relative"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="hidden"
        id="image-upload"
        accept="image/*"
        onChange={handleImageUpload}
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