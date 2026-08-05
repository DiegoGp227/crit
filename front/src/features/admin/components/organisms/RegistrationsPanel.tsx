"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRegistrations } from "../../hooks/useRegistrations";
import RegistrationStats from "../molecules/RegistrationStats";
import type { RegistrationView } from "../molecules/RegistrationStats";
import RegistrationsTable from "../molecules/RegistrationsTable";
import Pagination from "../molecules/Pagination";
import type { CompetitionType } from "@/src/features/profile/services/registrationService";

const TAB_ORDER: CompetitionType[] = ["EXPERTOS", "FEMENINO"];
const PAGE_SIZE = 10;

export default function RegistrationsPanel() {
  const [active, setActive] = useState<RegistrationView>("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const competitionType = active === "ALL" ? undefined : active;

  const { registrations, pagination, isLoading } = useRegistrations({
    competitionType,
    search,
    page,
    pageSize: PAGE_SIZE,
  });

  const { pagination: allPagination } = useRegistrations({ pageSize: 1 });
  const { pagination: expertosPagination } = useRegistrations({
    competitionType: "EXPERTOS",
    pageSize: 1,
  });
  const { pagination: femeninoPagination } = useRegistrations({
    competitionType: "FEMENINO",
    pageSize: 1,
  });

  const stats = TAB_ORDER.map((key) => ({
    key,
    count:
      key === "EXPERTOS"
        ? expertosPagination?.total ?? 0
        : femeninoPagination?.total ?? 0,
  }));

  const handleSelect = (view: RegistrationView) => {
    setActive(view);
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const totalPages = pagination?.totalPages ?? 0;
  const currentPage = pagination?.page ?? 1;

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-text-primary">
          Inscritos al campeonato
        </h2>

        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-dim" />
          <input
            type="search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar por nombre, bib o documento"
            className="w-72 rounded-2xl border border-border bg-surface pl-9 pr-4 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-dim focus:border-border-yellow"
          />
        </label>
      </div>

      <RegistrationStats
        total={allPagination?.total ?? 0}
        stats={stats}
        active={active}
        onSelect={handleSelect}
      />

      {isLoading ? (
        <div className="flex w-full items-center justify-center rounded-2xl border border-border bg-surface px-6 py-14">
          <p className="text-sm text-text-muted">Cargando inscritos…</p>
        </div>
      ) : (
        <>
          <RegistrationsTable registrations={registrations} />

          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
