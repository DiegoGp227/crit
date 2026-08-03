"use client";

import { useRef, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { InputHTMLAttributes } from "react";
import { User } from "lucide-react";
import Button from "@/src/shared/components/ui/Button";
import { cn } from "@/src/shared/utils/cn";
import {
  CATEGORY_LABELS,
  type CategoryType,
  type Profile,
  type UpdateProfileDTO,
} from "../services/profileService";
import { uploadImage } from "../services/profileService";
import { useBibs, useUpdateProfile } from "../hooks/useProfile";
import { parseProfileError } from "@/src/shared/utils/parseProfileError";

interface ProfileFormProps {
  initial?: Profile | null;
  onSuccess?: (profile: Profile) => void;
  onCancel?: () => void;
}

interface ProfileFormValues {
  fullName: string;
  category: string;
  team: string;
  bikeNickname: string;
  bikeFrame: string;
  bikeRatio: string;
  bikeWeight: string;
  bikeSize: string;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-dim outline-none transition-colors focus:border-border-yellow";

const labelClass =
  "text-xs font-semibold uppercase tracking-widest text-text-muted";

function Label({
  children,
  optional,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <span className={labelClass}>
      {children}
      {optional && (
        <span className="ml-1.5 font-medium normal-case text-text-secondary">
          (opcional)
        </span>
      )}
    </span>
  );
}

function Field({
  label,
  optional,
  hint,
  error,
  ...inputProps
}: {
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-2">
      <Label optional={optional}>{label}</Label>
      <input className={inputClass} {...inputProps} />
      {error ? (
        <span className="text-xs text-red-500">{error}</span>
      ) : hint ? (
        <span className="text-xs text-text-dim">{hint}</span>
      ) : null}
    </label>
  );
}

function PhotoPicker({
  label,
  value,
  onChange,
  circular = false,
}: {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  circular?: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError("Formato no soportado. Usa JPG, PNG, WebP o GIF.");
      return;
    }

    setUploading(true);
    setUploadError(null);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch (uploadErr) {
      setUploadError(parseProfileError(uploadErr));
    } finally {
      setUploading(false);
    }
  };

  const previewClass = cn(
    "h-16 w-16 shrink-0 border border-border bg-surface",
    circular ? "rounded-full" : "rounded-xl",
  );
  const imgClass = cn(
    "h-full w-full object-cover",
    circular ? "rounded-full" : "rounded-xl",
  );

  return (
    <div className="flex flex-col gap-2">
      <Label optional>{label}</Label>
      <div className="flex items-center gap-3">
        <div className={cn(previewClass, "flex items-center justify-center")}>
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt={label} className={imgClass} />
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
    </div>
  );
}

const toOptionalNumber = (value: string): number | undefined => {
  const trimmed = value.trim();
  if (trimmed === "") return undefined;
  const parsed = Number(trimmed);
  return Number.isNaN(parsed) ? undefined : parsed;
};

const padBib = (bibNumber: number) => String(bibNumber).padStart(3, "0");
const pad2 = (value: number) => String(value).padStart(2, "0");
const BIB_NUMBERS = Array.from({ length: 100 }, (_, index) => index);

export default function ProfileForm({
  initial,
  onSuccess,
  onCancel,
}: ProfileFormProps) {
  const isCreate = !initial;
  const bibAssigned = initial?.bibNumber != null;
  const { saveProfile, isSaving, error } = useUpdateProfile();
  const { used, isLoading: bibsLoading } = useBibs();

  const [avatar, setAvatar] = useState<string | null>(
    initial?.avatarUrl ?? null,
  );
  const [bikePhoto, setBikePhoto] = useState<string | null>(
    initial?.bikePhotoUrl ?? null,
  );
  const [selectedBib, setSelectedBib] = useState<number | null>(
    initial?.bibNumber ?? null,
  );
  const [bibError, setBibError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: initial?.fullName ?? "",
      category: initial?.category ?? "",
      team: initial?.team ?? "",
      bikeNickname: initial?.bikeNickname ?? "",
      bikeFrame: initial?.bikeFrame ?? "",
      bikeRatio: initial?.bikeRatio ?? "",
      bikeWeight: initial?.bikeWeight != null ? String(initial.bikeWeight) : "",
      bikeSize: initial?.bikeSize ?? "",
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = async (values) => {
    if (!bibAssigned && selectedBib === null) {
      setBibError("El dorsal es obligatorio");
      return;
    }

    const data: UpdateProfileDTO = {
      fullName: values.fullName.trim(),
      avatarUrl: avatar ?? "",
      bikePhotoUrl: bikePhoto ?? "",
    };

    if (selectedBib !== null) data.bibNumber = selectedBib;
    if (values.category) data.category = values.category as CategoryType;

    const team = values.team.trim();
    if (team) data.team = team;

    const bikeNickname = values.bikeNickname.trim();
    if (bikeNickname) data.bikeNickname = bikeNickname;

    const bikeFrame = values.bikeFrame.trim();
    if (bikeFrame) data.bikeFrame = bikeFrame;

    const bikeRatio = values.bikeRatio.trim();
    if (bikeRatio) data.bikeRatio = bikeRatio;

    const bikeWeight = toOptionalNumber(values.bikeWeight);
    if (bikeWeight !== undefined) data.bikeWeight = bikeWeight;

    const bikeSize = values.bikeSize.trim();
    if (bikeSize) data.bikeSize = bikeSize;

    const saved = await saveProfile(data);
    onSuccess?.(saved);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card flex w-full flex-col gap-8 p-6 sm:p-8"
    >
      <div className="flex flex-col gap-4">
        <p className="text-xs uppercase tracking-widest text-text-muted">
          Datos del corredor
        </p>
        <PhotoPicker
          label="Foto de perfil"
          value={avatar}
          onChange={setAvatar}
          circular
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Nombre completo"
            placeholder="ej. Diego Gongora"
            error={errors.fullName?.message}
            {...register("fullName", {
              required: "El nombre completo es obligatorio",
            })}
          />
          <label className="flex flex-col gap-2">
            <Label optional>Categoría</Label>
            <select className={inputClass} {...register("category")}>
              <option value="">Sin categoría</option>
              {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <Field
            label="Equipo"
            optional
            placeholder="ej. Team Bogotá Elite"
            {...register("team")}
          />
        </div>

        {bibAssigned ? (
          <Field
            label="Dorsal"
            optional
            value={padBib(initial?.bibNumber as number)}
            disabled
            hint="El dorsal ya está asignado y no se puede cambiar"
          />
        ) : (
          <div className="flex flex-col gap-2">
            <Label optional>Dorsal</Label>
            {bibsLoading ? (
              <p className="text-sm text-text-muted">
                Cargando dorsales disponibles...
              </p>
            ) : (
              <>
                <div className="grid grid-cols-10 gap-1.5">
                  {BIB_NUMBERS.map((bibNumber) => {
                    const taken = used.includes(bibNumber);
                    const isSelected = selectedBib === bibNumber;
                    return (
                      <button
                        key={bibNumber}
                        type="button"
                        disabled={taken}
                        onClick={() => {
                          setSelectedBib(bibNumber);
                          setBibError(null);
                        }}
                        className={cn(
                          "h-9 rounded-lg text-sm font-semibold transition-colors",
                          taken &&
                            "cursor-not-allowed bg-surface text-text-dim opacity-60 line-through",
                          isSelected && "bg-cta text-cta-ink",
                          !taken &&
                            !isSelected &&
                            "cursor-pointer bg-surface-raised text-text-primary hover:bg-bg-yellow-tint hover:text-text-secondary",
                        )}
                      >
                        {pad2(bibNumber)}
                      </button>
                    );
                  })}
                </div>
                <span className="text-xs text-text-dim">
                  Los dorsales tachados ya están asignados.
                </span>
                {bibError && <span className="text-xs text-red-500">{bibError}</span>}
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-xs uppercase tracking-widest text-text-muted">Mi bici</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Apodo"
            optional
            placeholder="ej. Mi Bbncita"
            {...register("bikeNickname")}
          />
          <Field
            label="Marco"
            optional
            placeholder="ej. Ontrail"
            {...register("bikeFrame")}
          />
          <Field
            label="Relación"
            optional
            placeholder="ej. 52*17"
            {...register("bikeRatio")}
          />
          <Field
            label="Peso (kg)"
            optional
            type="number"
            placeholder="ej. 9.7"
            {...register("bikeWeight")}
          />
          <Field
            label="Talla"
            optional
            placeholder="ej. L"
            {...register("bikeSize")}
          />

          <PhotoPicker
            label="Foto de la bici"
            value={bikePhoto}
            onChange={setBikePhoto}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{parseProfileError(error)}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={isSaving} className="flex-1">
          {isSaving
            ? "Guardando..."
            : isCreate
              ? "Crear perfil"
              : "Guardar cambios"}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
