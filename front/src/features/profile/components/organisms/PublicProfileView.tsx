"use client";

import { useParams } from "next/navigation";
import Section from "@/src/shared/components/ui/Section";
import { usePublicProfile } from "../../hooks/useProfile";
import ProfileInfo from "./ProfileInfo";
import BikeInfo from "./BikeInfo";

export default function PublicProfileView() {
  const params = useParams<{ id: string }>();
  const profileId = params?.id ? Number(params.id) : undefined;

  const { profile, registration, stats, isLoading } = usePublicProfile(profileId);

  if (isLoading && !profile) {
    return (
      <Section>
        <p className="text-sm text-text-muted">Cargando perfil...</p>
      </Section>
    );
  }

  if (!profile) {
    return (
      <Section>
        <div className="flex w-full flex-col items-center gap-2 rounded-2xl border border-border bg-surface px-6 py-14 text-center">
          <p className="text-sm font-semibold text-text-primary">
            Perfil no encontrado
          </p>
          <p className="text-xs text-text-muted">
            El corredor que buscas no existe.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <>
      <ProfileInfo
        profile={profile}
        stats={stats}
        registration={registration}
        title="Perfil de corredor"
      />
      <BikeInfo profile={profile} />
    </>
  );
}
