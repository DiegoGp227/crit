"use client";

import { useMemo, useState } from "react";
import { COMPETITION_LABELS } from "@/src/features/profile/services/registrationService";
import { useRegistrations } from "../../hooks/useRegistrations";
import RegistrationTabs from "../molecules/RegistrationTabs";
import RegistrationsTable from "../molecules/RegistrationsTable";
import type { CompetitionType } from "@/src/features/profile/services/registrationService";

const TAB_ORDER: CompetitionType[] = ["EXPERTOS", "FEMENINOFIJA", "FEMENINORUTA"];

export default function RegistrationsPanel() {
  const [active, setActive] = useState<CompetitionType>("EXPERTOS");
  const { registrations: all, isLoading: loadingAll } = useRegistrations();
  const { registrations, isLoading } = useRegistrations(active);

  const tabs = useMemo(
    () =>
      TAB_ORDER.map((key) => ({
        key,
        label: COMPETITION_LABELS[key],
        count: all.filter((registration) => registration.competitionType === key)
          .length,
      })),
    [all],
  );

  return (
    <div className="flex w-full flex-col gap-5">
      <RegistrationTabs tabs={tabs} active={active} onChange={setActive} />
      {isLoading && !loadingAll ? (
        <div className="flex w-full items-center justify-center rounded-2xl border border-border bg-surface px-6 py-14">
          <p className="text-sm text-text-muted">Cargando inscritos…</p>
        </div>
      ) : (
        <RegistrationsTable registrations={registrations} />
      )}
    </div>
  );
}
