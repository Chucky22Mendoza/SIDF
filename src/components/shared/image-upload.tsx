"use client";

import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  value: string | null;
  onChangeImage?: (base64Image: string | null) => void;
};

export function ImageUpload({ value, onChangeImage }: Props) {
  const imgRef = useRef<HTMLInputElement>(null);
  // const [imageError, setImageError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onChangeImage?.(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(isDragging);
  };

  const handleDragEnter = () => {
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="relative"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={imgRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />

      {value ? (
        <div className="px-1  relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={value}
            alt="Preview"
            className="object-cover"
            width={100}
            height={100}
            loading="lazy"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => {
              onChangeImage?.(null);
              if (imgRef.current?.files) {
                imgRef.current.value = '';
              }
            }}
          >
            <X className="p-1 rounded-full transition-all bg-slate-200" />
          </Button>
        </div>
      ) : (
        <div
          onClick={() => imgRef.current?.click()}
          className="px-1 flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <ImagePlus className="h-8 w-8 text-gray-400" />
          <span className="mt-2 text-sm text-gray-500">
            Subir imagen
          </span>
        </div>
      )}
    </div>
  );
}