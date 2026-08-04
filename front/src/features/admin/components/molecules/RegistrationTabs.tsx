"use client";

import Button from "@/src/shared/components/ui/Button";
import type { CompetitionType } from "@/src/features/profile/services/registrationService";

export interface RegistrationTab {
  key: CompetitionType;
  label: string;
  count: number;
}

interface RegistrationTabsProps {
  tabs: RegistrationTab[];
  active: CompetitionType;
  onChange: (tab: CompetitionType) => void;
}

export default function RegistrationTabs({
  tabs,
  active,
  onChange,
}: RegistrationTabsProps) {
  return (
    <nav className="flex w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <ul className="inline-flex w-max items-center gap-2 rounded-2xl bg-surface-raised p-2 sm:w-auto sm:gap-3">
        {tabs.map((tab) => (
          <li key={tab.key}>
            <Button
              size="lg"
              variant={active === tab.key ? "primary" : "ghost"}
              onClick={() => onChange(tab.key)}
              aria-pressed={active === tab.key}
              className="gap-2"
            >
              <span>{tab.label}</span>
              <span
                className={
                  active === tab.key
                    ? "inline-flex min-w-6 items-center justify-center rounded-full bg-cta-ink/15 px-2 py-0.5 text-[0.7rem] font-bold"
                    : "inline-flex min-w-6 items-center justify-center rounded-full bg-surface-raised px-2 py-0.5 text-[0.7rem] font-bold text-text-muted"
                }
              >
                {tab.count}
              </span>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
