"use client";

import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Button from "@/src/shared/components/ui/Button";
import Input from "@/src/shared/components/ui/Input";
import Select from "@/src/shared/components/ui/Select";
import { parseProfileError } from "@/src/shared/utils/parseProfileError";
import PhotoPicker from "../atoms/PhotoPicker";
import BibPicker from "../molecules/BibPicker";
import FormSection from "../molecules/FormSection";
import { useBibs, useUpdateProfile } from "../../hooks/useProfile";
import {
  CATEGORY_LABELS,
  toUpdateProfileDTO,
  type Profile,
  type ProfileFormValues,
} from "../../services/profileService";

interface ProfileFormProps {
  initial?: Profile | null;
  onSuccess?: (profile: Profile) => void;
  onCancel?: () => void;
}

export default function ProfileForm({
  initial,
  onSuccess,
  onCancel,
}: ProfileFormProps) {
  const isCreate = !initial;
  const bibAssigned = initial?.bibNumber != null;
  const { saveProfile, isSaving, error } = useUpdateProfile();
  const { used, isLoading: bibsLoading } = useBibs();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: initial?.fullName ?? "",
      category: initial?.category ?? "",
      team: initial?.team ?? "",
      avatarUrl: initial?.avatarUrl ?? null,
      bikePhotoUrl: initial?.bikePhotoUrl ?? null,
      bibNumber: initial?.bibNumber ?? null,
      bikeNickname: initial?.bikeNickname ?? "",
      bikeFrame: initial?.bikeFrame ?? "",
      bikeRatio: initial?.bikeRatio ?? "",
      bikeWeight: initial?.bikeWeight != null ? String(initial.bikeWeight) : "",
      bikeSize: initial?.bikeSize ?? "",
    },
  });

  const onSubmit: SubmitHandler<ProfileFormValues> = async (values) => {
    const saved = await saveProfile(toUpdateProfileDTO(values));
    onSuccess?.(saved);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card flex w-full flex-col gap-8 p-6 sm:p-8"
    >
      <FormSection title="Datos del corredor">
        <Controller
          name="avatarUrl"
          control={control}
          render={({ field }) => (
            <PhotoPicker
              label="Foto de perfil"
              value={field.value}
              onChange={field.onChange}
              circular
            />
          )}
        />
        <Input
          label="Nombre completo"
          placeholder="ej. Diego Gongora"
          error={errors.fullName?.message}
          {...register("fullName", {
            required: "El nombre completo es obligatorio",
          })}
        />
        <Select label="Categoría" optional {...register("category")}>
          <option value="">Sin categoría</option>
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Input
          label="Equipo"
          optional
          placeholder="ej. Team Bogotá Elite"
          {...register("team")}
        />
        <Controller
          name="bibNumber"
          control={control}
          rules={{
            required: bibAssigned ? false : "El dorsal es obligatorio",
          }}
          render={({ field, fieldState }) => (
            <BibPicker
              bibAssigned={bibAssigned}
              bibNumber={initial?.bibNumber}
              used={used}
              selected={field.value}
              onSelect={field.onChange}
              isLoading={bibsLoading}
              error={fieldState.error?.message}
            />
          )}
        />
      </FormSection>

      <FormSection title="Mi bici">
        <Input
          label="Apodo"
          optional
          placeholder="ej. Mi Bbncita"
          {...register("bikeNickname")}
        />
        <Input
          label="Marco"
          optional
          placeholder="ej. Ontrail"
          {...register("bikeFrame")}
        />
        <Input
          label="Relación"
          optional
          placeholder="ej. 52*17"
          {...register("bikeRatio")}
        />
        <Input
          label="Peso (kg)"
          optional
          type="number"
          placeholder="ej. 9.7"
          {...register("bikeWeight")}
        />
        <Input
          label="Talla"
          optional
          placeholder="ej. L"
          {...register("bikeSize")}
        />
        <Controller
          name="bikePhotoUrl"
          control={control}
          render={({ field }) => (
            <PhotoPicker
              label="Foto de la bici"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </FormSection>

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
