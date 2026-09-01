"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { CheckCircle2 } from "lucide-react";
import Modal from "@/src/shared/components/ui/Modal";
import Button from "@/src/shared/components/ui/Button";
import { cn } from "@/src/shared/utils/cn";
import { parseProfileError } from "@/src/shared/utils/parseProfileError";
import { useRegisterChampionship } from "../../hooks/useRegistration";
import { useBibs } from "../../hooks/useProfile";
import {
  toCreateRegistrationDTO,
  type CompetitionType,
  type RegistrationFormValues,
} from "../../services/registrationService";
import type { Profile } from "../../services/profileService";
import RegistrationStepIntro from "../molecules/RegistrationStepIntro";
import RegistrationStepCategory from "../molecules/RegistrationStepCategory";
import RegistrationStepData from "../molecules/RegistrationStepData";
import RegistrationStepConfirm from "../molecules/RegistrationStepConfirm";

const STEP_TITLES = [
  "Información",
  "Categoría",
  "Tus datos",
  "Confirmación",
];

interface RegistrationModalProps {
  open: boolean;
  onClose: () => void;
  profile: Profile;
}

export default function RegistrationModal({
  open,
  onClose,
  profile,
}: RegistrationModalProps) {
  const [step, setStep] = useState(0);
  const [competitionType, setCompetitionType] =
    useState<CompetitionType | null>(null);
  const [selectedBib, setSelectedBib] = useState<number | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, isRegistering, error } = useRegisterChampionship();
  const { used, isLoading: bibsLoading } = useBibs();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    defaultValues: {
      document: "",
      phone: "",
      team: profile.team ?? "",
      eps: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      instagram: "",
    },
  });

  const onSubmit: SubmitHandler<RegistrationFormValues> = async (values) => {
    if (!competitionType || selectedBib === null) return;
    await register(toCreateRegistrationDTO(values, competitionType, selectedBib));
    setSubmitted(true);
  };

  const close = () => {
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} className="sm:max-w-2xl">
      <div className="card flex w-full flex-col p-6 sm:p-8">
        {submitted ? (
        <div className="flex flex-col items-center gap-4 py-10 text-center">
          <CheckCircle2 className="h-16 w-16 text-cta" />
          <h2 className="text-2xl font-bold text-text-primary">
            ¡Inscripción exitosa!
          </h2>
          <p className="text-sm text-text-muted">
            Ya haces parte del campeonato. Nos vemos en la línea de salida.
          </p>
          <Button onClick={close}>Cerrar</Button>
        </div>
      ) : (
        <>
          <h2 className="mb-4 text-2xl font-bold text-text-primary">
            Inscripción al campeonato
          </h2>

          <div className="mb-6 flex flex-col gap-3">
            <div className="flex gap-1.5">
              {STEP_TITLES.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors",
                    index <= step ? "bg-cta" : "bg-surface",
                  )}
                />
              ))}
            </div>
            <p className="text-xs uppercase tracking-widest text-text-muted">
              {STEP_TITLES[step]}
            </p>
          </div>

          {step === 0 && <RegistrationStepIntro />}
          {step === 1 && (
            <RegistrationStepCategory
              value={competitionType}
              onChange={setCompetitionType}
            />
          )}
          {step === 2 && (
            <RegistrationStepData
              register={registerField}
              errors={errors}
              profile={profile}
              used={used}
              selectedBib={selectedBib}
              onSelectBib={setSelectedBib}
              bibsLoading={bibsLoading}
            />
          )}
          {step === 3 && (
            <RegistrationStepConfirm
              bibNumber={selectedBib}
              accepted={accepted}
              onChange={setAccepted}
            />
          )}

          {error && (
            <p className="mt-4 text-sm text-red-500">
              {parseProfileError(error)}
            </p>
          )}

          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <Button variant="ghost" onClick={() => setStep(step - 1)}>
                Atrás
              </Button>
            )}
            {step === 0 && (
              <Button className="flex-1" onClick={() => setStep(1)}>
                Continuar
              </Button>
            )}
            {step === 1 && (
              <Button
                className="flex-1"
                disabled={!competitionType}
                onClick={() => setStep(2)}
              >
                Continuar
              </Button>
            )}
            {step === 2 && (
              <Button
                className="flex-1"
                disabled={selectedBib === null}
                onClick={handleSubmit(() => setStep(3))}
              >
                Continuar
              </Button>
            )}
            {step === 3 && (
              <Button
                className="flex-1"
                disabled={!accepted || isRegistering}
                onClick={handleSubmit(onSubmit)}
              >
                {isRegistering ? "Inscribiendo..." : "Inscribirme"}
              </Button>
            )}
          </div>
        </>
      )}
      </div>
    </Modal>
  );
}
