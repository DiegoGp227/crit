"use client";

import { useState } from "react";
import Section from "@/src/shared/components/ui/Section";
import { useProfile, useProfileStats } from "../../hooks/useProfile";
import ProfileContent from "./ProfileContent";
import ProfileEmptyState from "./ProfileEmptyState";
import ProfileFormModal from "./ProfileFormModal";
import RegistrationModal from "./RegistrationModal";

export default function ProfileView() {
  const { data, isLoading } = useProfile();
  const profile = data?.profile ?? null;
  const registration = data?.registration ?? null;
  const { stats } = useProfileStats(profile?.id);
  const [formOpen, setFormOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);

  const closeForm = () => setFormOpen(false);

  if (isLoading && !data) {
    return (
      <Section>
        <p className="text-sm text-text-muted">Cargando perfil...</p>
      </Section>
    );
  }

  return (
    <>
      {profile ? (
        <ProfileContent
          profile={profile}
          stats={stats}
          registration={registration}
          onEdit={() => setFormOpen(true)}
          onRegister={() => setRegistrationOpen(true)}
        />
      ) : (
        <ProfileEmptyState onCreate={() => setFormOpen(true)} />
      )}
      <ProfileFormModal open={formOpen} onClose={closeForm} initial={profile} />
      {profile && (
        <RegistrationModal
          key={registrationOpen ? "open" : "closed"}
          open={registrationOpen}
          onClose={() => setRegistrationOpen(false)}
          profile={profile}
        />
      )}
    </>
  );
}
