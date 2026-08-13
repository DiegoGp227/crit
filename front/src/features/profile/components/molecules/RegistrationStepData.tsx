import type { FieldErrors, UseFormRegister } from "react-hook-form";
import Input from "@/src/shared/components/ui/Input";
import BibPicker from "./BibPicker";
import type { Profile } from "../../services/profileService";
import type { RegistrationFormValues } from "../../services/registrationService";

interface RegistrationStepDataProps {
  register: UseFormRegister<RegistrationFormValues>;
  errors: FieldErrors<RegistrationFormValues>;
  profile: Profile;
  used: number[];
  selectedBib: number | null;
  onSelectBib: (bibNumber: number) => void;
  bibsLoading?: boolean;
  bibError?: string | null;
}

export default function RegistrationStepData({
  register,
  errors,
  profile,
  used,
  selectedBib,
  onSelectBib,
  bibsLoading = false,
  bibError = null,
}: RegistrationStepDataProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Nombre completo" value={profile.fullName} disabled />
        <Input
          label="Cédula"
          placeholder="ej. 1012345678"
          error={errors.document?.message}
          {...register("document", { required: "La cédula es obligatoria" })}
        />
        <Input
          label="Celular"
          placeholder="ej. 3001234567"
          error={errors.phone?.message}
          {...register("phone", { required: "El celular es obligatorio" })}
        />
        <Input
          label="Equipo"
          optional
          placeholder="Nombre de tu equipo"
          {...register("team")}
        />
        <Input
          label="Eps"
          placeholder="ej. Sanitas"
          error={errors.eps?.message}
          {...register("eps", { required: "La Eps es obligatoria" })}
        />
        <Input
          label="Nombre contacto de emergencia"
          placeholder="ej. María Pérez"
          error={errors.emergencyContactName?.message}
          {...register("emergencyContactName", {
            required: "El contacto de emergencia es obligatorio",
          })}
        />
        <Input
          label="Número contacto de emergencia"
          placeholder="ej. 3112345678"
          error={errors.emergencyContactPhone?.message}
          {...register("emergencyContactPhone", {
            required: "El número de emergencia es obligatorio",
          })}
        />
      </div>
      <BibPicker
        used={used}
        selected={selectedBib}
        onSelect={onSelectBib}
        isLoading={bibsLoading}
        error={bibError}
      />
    </div>
  );
}