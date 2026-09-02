"use client";

import { useRef, useState } from "react";
import { User } from "lucide-react";
import Button from "@/src/shared/components/ui/Button";
import Label from "@/src/shared/components/ui/Label";
import { cn } from "@/src/shared/utils/cn";
import { parseProfileError } from "@/src/shared/utils/parseProfileError";
import { uploadImage } from "../../services/profileService";
import CropModal from "../molecules/CropModal";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

interface PhotoPickerProps {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  circular?: boolean;
}

export default function PhotoPicker({
  label,
  value,
  onChange,
  circular = false,
}: PhotoPickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError("Formato no soportado. Usa JPG, PNG, WebP o GIF.");
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = () => {
      setCropImageSrc(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (blob: Blob) => {
    setCropImageSrc(null);
    setUploading(true);
    setUploadError(null);
    try {
      const file = new File([blob], "cropped.jpg", { type: blob.type });
      const url = await uploadImage(file);
      onChange(url);
    } catch (uploadErr) {
      setUploadError(parseProfileError(uploadErr));
    } finally {
      setUploading(false);
    }
  };

  const shape = circular ? "rounded-full" : "rounded-xl";
  const cropAspect = circular ? 1 : 16 / 9;

  return (
    <div className="flex flex-col gap-2">
      <Label optional>{label}</Label>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-16 w-16 shrink-0 items-center justify-center border border-border bg-surface",
            shape,
          )}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt={label} className={cn("h-full w-full object-cover", shape)} />
          ) : (
            <User className="h-7 w-7 text-text-dim" />
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Button
            type="button"
            variant="surface"
            size="sm"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? "Subiendo..." : "Subir foto"}
          </Button>
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="cursor-pointer text-left text-xs font-semibold text-text-muted transition-colors hover:text-text-primary"
            >
              Quitar
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(",")}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {uploadError && <span className="text-xs text-red-500">{uploadError}</span>}

      {cropImageSrc && (
        <CropModal
          imageSrc={cropImageSrc}
          aspect={cropAspect}
          circular={circular}
          onCropComplete={handleCropComplete}
          onCancel={() => setCropImageSrc(null)}
        />
      )}
    </div>
  );
}
