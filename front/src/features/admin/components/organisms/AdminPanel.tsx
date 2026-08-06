"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarPlus, ClipboardList, FileUp, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/src/store/authStore";
import Button from "@/src/shared/components/ui/Button";
import Section from "@/src/shared/components/ui/Section";
import RegistrationsPanel from "./RegistrationsPanel";
import CreateRacePanel from "./CreateRacePanel";
import ResultsPanel from "./ResultsPanel";

type AdminTab = "inscripciones" | "crear-carrera" | "resultados";

const TABS = [
  { key: "inscripciones", label: "Inscripciones", icon: ClipboardList },
  { key: "crear-carrera", label: "Crear carrera", icon: CalendarPlus },
  { key: "resultados", label: "Subir resultados", icon: FileUp },
] as const;

export default function AdminPanel() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [tab, setTab] = useState<AdminTab>("inscripciones");

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      router.replace("/");
    }
  }, [user, router]);

  if (user?.role !== "ADMIN") {
    return null;
  }

  return (
    <Section>
      <div className="flex flex-col gap-2">
        <span className="badge w-fit border border-border-yellow bg-bg-yellow-tint text-text-secondary">
          <ShieldCheck className="size-3.5" />
          Panel de administración
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-text-primary">
          Campeonato
        </h1>
        <p className="text-sm text-text-muted">
          Gestiona las inscripciones y los resultados de las carreras.
        </p>
      </div>

      <nav className="mt-8 flex w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ul className="inline-flex w-max items-center gap-2 rounded-2xl bg-surface-raised p-2 sm:w-auto">
          {TABS.map(({ key, label, icon: Icon }) => (
            <li key={key}>
              <Button
                size="lg"
                variant={tab === key ? "primary" : "ghost"}
                onClick={() => setTab(key)}
                aria-pressed={tab === key}
                className="gap-2"
              >
                <Icon className="size-4" />
                {label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8">
        {tab === "inscripciones" ? (
          <RegistrationsPanel />
        ) : tab === "crear-carrera" ? (
          <CreateRacePanel />
        ) : (
          <ResultsPanel />
        )}
      </div>
    </Section>
  );
}
