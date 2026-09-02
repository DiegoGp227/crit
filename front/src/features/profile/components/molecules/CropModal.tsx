"use client";

import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import Button from "@/src/shared/components/ui/Button";
import { Loader2 } from "lucide-react";

interface CropModalProps {
  imageSrc: string;
  aspect: number;
  circular?: boolean;
  onCropComplete: (croppedBlob: Blob) => void;
  onCancel: () => void;
}

export default function CropModal({
  imageSrc,
  aspect,
  circular = false,
  onCropComplete,
  onCancel,
}: CropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [processing, setProcessing] = useState(false);

  const onCropCompleteInternal = useCallback(
    (_croppedArea: unknown, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleCrop = async () => {
    if (!croppedAreaPixels) return;
    setProcessing(true);
    try {
      const { getCroppedImg } = await import("@/src/shared/utils/getCroppedImg");
      const blob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(blob);
    } catch {
      // error handled silently
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="flex w-full max-w-lg flex-col gap-4 rounded-2xl border border-border bg-surface p-4">
        <div className="relative h-80 w-full overflow-hidden rounded-xl bg-surface-raised">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape={circular ? "round" : "rect"}
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteInternal}
          />
        </div>

        <div className="flex flex-col gap-2 px-2">
          <label className="text-xs text-text-muted">Zoom</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-cta"
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            Cancelar
          </Button>
          <Button size="sm" disabled={processing || !croppedAreaPixels} onClick={handleCrop}>
            {processing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Procesando…
              </span>
            ) : (
              "Aplicar"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
