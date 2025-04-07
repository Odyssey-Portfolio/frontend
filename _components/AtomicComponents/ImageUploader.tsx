"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageUploaderProps {
  label?: string;
  onChange?: (imageString: File | null) => void;
}

export default function ImageUploader({ label, onChange }: ImageUploaderProps) {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onChange?.(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    onChange?.(null);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-gray-700 font-medium">{label}</label>}

      <div className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-blue-500 transition-all duration-200">
        {image ? (
          <div className="relative w-full h-full">
            <Image
              src={image}
              alt="Uploaded preview"
              fill
              className="object-cover rounded-lg"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md hover:bg-red-600 transition-all"
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <input
              type="file"
              accept="image/*"
              className="absolute w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageUpload}
            />
            <p className="text-gray-500 text-sm">Click to upload an image</p>
          </>
        )}
      </div>
    </div>
  );
}
