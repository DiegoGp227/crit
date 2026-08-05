import { Check } from "lucide-react";
import { cn } from "@/src/shared/utils/cn";
import {
  COMPETITION_LABELS,
  type CompetitionType,
} from "../../services/registrationService";

const OPTIONS: { value: CompetitionType; description: string }[] = [
  { value: "EXPERTOS", description: "Competencia general" },
  { value: "FEMENINO", description: "Categoría femenina" },
];

interface RegistrationStepCategoryProps {
  value: CompetitionType | null;
  onChange: (value: CompetitionType) => void;
}

export default function RegistrationStepCategory({
  value,
  onChange,
}: RegistrationStepCategoryProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {OPTIONS.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "card relative flex flex-col items-center gap-2 p-5 text-center transition-colors",
              selected
                ? "border-2 border-cta"
                : "cursor-pointer border-2 border-transparent hover:border-border-hover",
            )}
          >
            <span className="font-semibold text-text-primary">
              {COMPETITION_LABELS[option.value]}
            </span>
            <span className="text-xs text-text-muted">{option.description}</span>
            {selected && (
              <span className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-cta text-cta-ink">
                <Check className="h-3.5 w-3.5" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
