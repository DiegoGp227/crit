import type { FieldErrors, UseFormRegister } from "react-hook-form";
import Input from "@/src/shared/components/ui/Input";
import { padBib } from "@/src/shared/utils/format";
import type { Profile } from "../../services/profileService";
import type { RegistrationFormValues } from "../../services/registrationService";

interface RegistrationStepDataProps {
  register: UseFormRegister<RegistrationFormValues>;
  errors: FieldErrors<RegistrationFormValues>;
  profile: Profile;
}

export default function RegistrationStepData({
  register,
  errors,
  profile,
}: RegistrationStepDataProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Input label="Nombre completo" value={profile.fullName} disabled />
      <Input label="Dorsal" value={padBib(profile.bibNumber)} disabled />
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
  );
}
