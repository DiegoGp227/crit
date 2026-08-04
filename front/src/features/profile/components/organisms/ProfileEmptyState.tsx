import Section from "@/src/shared/components/ui/Section";
import Button from "@/src/shared/components/ui/Button";

interface ProfileEmptyStateProps {
  onCreate: () => void;
}

export default function ProfileEmptyState({ onCreate }: ProfileEmptyStateProps) {
  return (
    <Section>
      <div className="flex w-full flex-col items-start gap-6">
        <div>
          <h1 className="mt-2 text-3xl font-bold text-text-primary">
            Completa tu perfil
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Cuéntanos quién eres para crear tu perfil.
          </p>
        </div>
        <Button onClick={onCreate} className="w-full sm:w-auto">
          Completar perfil
        </Button>
      </div>
    </Section>
  );
}