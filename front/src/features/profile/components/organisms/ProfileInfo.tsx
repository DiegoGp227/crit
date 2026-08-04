import { CheckCircle2, User } from "lucide-react";
import Section from "@/src/shared/components/ui/Section";
import Button from "@/src/shared/components/ui/Button";
import { padBib } from "@/src/shared/utils/format";
import {
  CATEGORY_LABELS,
  type Profile,
  type ProfileStats,
} from "../../services/profileService";
import {
  COMPETITION_LABELS,
  type Registration,
} from "../../services/registrationService";

interface ProfileInfoProps {
  profile: Profile;
  stats?: ProfileStats;
  registration?: Registration | null;
  onEdit: () => void;
  onRegister: () => void;
}

export default function ProfileInfo({
  profile,
  stats,
  registration,
  onEdit,
  onRegister,
}: ProfileInfoProps) {
  const statsItems = [
    { label: "Ranking", value: "#1", highlight: true },
    { label: "Puntos", value: stats?.points?.toLocaleString("es-CO") ?? "—" },
    { label: "Carreras", value: stats?.races?.toString() ?? "—" },
    { label: "Victorias", value: "1", highlight: true },
    { label: "Km", value: profile.kilometers?.toString() ?? "—" },
  ];

  return (
    <Section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(254, 243, 0, 0.06), transparent 60%)",
        }}
      />
      <div className="relative flex w-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-text-muted">Mi perfil</p>
          <Button variant="surface" size="sm" onClick={onEdit}>
            Editar perfil
          </Button>
        </div>

        <div className="relative grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[auto_1fr_auto] lg:justify-items-center">
          <div className="relative flex h-40 w-40 items-center justify-center justify-self-center overflow-hidden rounded-full border-2 border-border-hover bg-surface">
            {profile.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatarUrl}
                alt="Foto de perfil"
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-16 w-16 text-text-dim" />
            )}
          </div>

          <div className="flex flex-col items-center gap-3 lg:items-start lg:text-left">
            <p className="text-3xl font-bold text-text-primary">{profile.fullName}</p>
            <div className="flex flex-wrap justify-center gap-4 text-text-muted lg:justify-start">
              <p className={profile.team ? "" : "text-text-dim"}>
                {profile.team ?? "—"}
              </p>
              <p className={profile.category ? "" : "text-text-dim"}>
                {profile.category ? CATEGORY_LABELS[profile.category] : "—"}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-6 lg:justify-start">
              {statsItems.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center lg:items-start">
                  <p className="text-xs uppercase tracking-widest text-text-muted">
                    {stat.label}
                  </p>
                  <p
                    className={
                      stat.highlight
                        ? "font-bold text-text-secondary"
                        : "font-bold text-text-primary"
                    }
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 lg:border-l lg:border-border lg:pl-10">
            <div className="flex flex-col items-center gap-1">
              <span className="text-8xl leading-none font-bold text-text-secondary">
                {padBib(profile.bibNumber)}
              </span>
              <span className="text-xs uppercase tracking-widest text-text-muted">Dorsal</span>
            </div>
            {registration ? (
              <span className="badge bg-cta text-cta-ink">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Inscrito · {COMPETITION_LABELS[registration.competitionType]}
              </span>
            ) : (
              <Button size="sm" onClick={onRegister}>
                Inscribirse al campeonato
              </Button>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
