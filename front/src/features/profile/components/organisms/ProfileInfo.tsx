"use client";

import Image from "next/image";
import { useState } from "react";
import { User } from "lucide-react";
import Section from "@/src/shared/components/ui/Section";
import Button from "@/src/shared/components/ui/Button";
import Modal from "@/src/shared/components/ui/Modal";
import { useIsDesktop } from "@/src/shared/hooks/useIsDesktop";
import ProfileForm from "../../forms/ProfileForm";
import { useProfile, useProfileStats } from "../../hooks/useProfile";
import { CATEGORY_LABELS } from "../../services/profileService";

const padBib = (bibNumber: number) => String(bibNumber).padStart(3, "0");

export default function ProfileInfo() {
  const { data, isLoading } = useProfile();
  const isDesktop = useIsDesktop();
  const [formOpen, setFormOpen] = useState(false);

  const profile = data?.profile ?? null;
  const { stats } = useProfileStats(profile?.id);

  const closeForm = () => setFormOpen(false);

  if (isLoading && !data) {
    return (
      <Section>
        <p className="text-sm text-text-muted">Cargando perfil...</p>
      </Section>
    );
  }

  if (!profile) {
    return (
      <Section>
        <div className="flex w-full flex-col gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest text-text-muted">Mi perfil</p>
            <h1 className="mt-2 text-3xl font-bold text-text-primary">Completa tu perfil</h1>
            <p className="mt-2 text-sm text-text-muted">
              Cuéntanos quién eres para aparecer en la clasificación y en las carreras.
            </p>
          </div>
          {isDesktop ? (
            <ProfileForm onSuccess={closeForm} />
          ) : (
            <Button onClick={() => setFormOpen(true)} className="w-full sm:w-auto">
              Completar perfil
            </Button>
          )}
        </div>
        {!isDesktop && (
          <Modal open={formOpen} onClose={closeForm}>
            <h2 className="mb-4 text-2xl font-bold text-text-primary">Completa tu perfil</h2>
            <ProfileForm onSuccess={closeForm} onCancel={closeForm} />
          </Modal>
        )}
      </Section>
    );
  }

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
          background: "radial-gradient(ellipse at 60% 40%, rgba(254, 243, 0, 0.06), transparent 60%)",
        }}
      />
      <div className="relative flex w-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-widest text-text-muted">Mi perfil</p>
          <Button variant="surface" size="sm" onClick={() => setFormOpen(true)}>
            Editar perfil
          </Button>
        </div>

        <div className="relative grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[auto_1fr_auto] lg:justify-items-center">
          <div className="relative flex h-40 w-40 items-center justify-center justify-self-center overflow-hidden rounded-full border-2 border-border-hover bg-surface">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt="Foto de perfil"
                fill
                className="object-cover"
                sizes="160px"
                priority
              />
            ) : (
              <User className="h-16 w-16 text-text-dim" />
            )}
          </div>

          <div className="flex flex-col items-center gap-3 lg:items-start lg:text-left">
            <p className="text-3xl font-bold text-text-primary">{profile.fullName}</p>
            {(profile.team || profile.category) && (
              <div className="flex flex-wrap justify-center gap-4 text-text-muted lg:justify-start">
                {profile.team && <p>{profile.team}</p>}
                {profile.category && <p>{CATEGORY_LABELS[profile.category]}</p>}
              </div>
            )}
            <div className="flex flex-wrap justify-center gap-6 lg:justify-start">
              {statsItems.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center lg:items-start">
                  <p className="text-xs uppercase tracking-widest text-text-muted">{stat.label}</p>
                  <p className={stat.highlight ? "font-bold text-text-secondary" : "font-bold text-text-primary"}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 lg:border-l lg:border-border lg:pl-10">
            <span className="text-8xl leading-none font-bold text-text-secondary">
              {padBib(profile.bibNumber)}
            </span>
            <span className="text-xs uppercase tracking-widest text-text-muted">Dorsal</span>
          </div>
        </div>
      </div>

      <Modal open={formOpen} onClose={closeForm}>
        <h2 className="mb-4 text-2xl font-bold text-text-primary">Editar perfil</h2>
        <ProfileForm initial={profile} onSuccess={closeForm} onCancel={closeForm} />
      </Modal>
    </Section>
  );
}
