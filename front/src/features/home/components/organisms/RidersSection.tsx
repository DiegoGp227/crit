"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Loader2, Search } from "lucide-react";
import Section from "@/src/shared/components/ui/Section";
import Pagination from "@/src/features/admin/components/molecules/Pagination";
import { useRiders } from "../../hooks/useRiders";
import {
  CATEGORY_LABELS,
  type CategoryType,
} from "@/src/features/profile/services/profileService";

const ITEMS_PER_PAGE = 10;

type FilterType = "ALL" | CategoryType | "SIN_CATEGORIA";

interface Rider {
  id: number;
  fullName: string;
  avatarUrl: string | null;
  team: string | null;
  category: CategoryType | null;
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: "ALL", label: "Todos" },
  { value: "PRINCIPIANTE", label: "Principiante" },
  { value: "NOVATO", label: "Novato" },
  { value: "EXPERTO", label: "Experto" },
  { value: "RUTA", label: "Ruta" },
  { value: "MUJER", label: "Femenino" },
  { value: "SIN_CATEGORIA", label: "Sin categoría" },
];

const CATEGORY_COLORS: Record<CategoryType, string> = {
  PRINCIPIANTE: "bg-green/20 text-green",
  NOVATO: "bg-amber/20 text-amber",
  EXPERTO: "bg-accent/20 text-accent-bright",
  RUTA: "bg-blue/20 text-blue",
  MUJER: "bg-pink/20 text-pink",
};

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "?";

export default function RidersSection() {
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { riders, isLoading, error } = useRiders();

  useEffect(() => {
    setPage(1);
  }, [filter, search]);

  const filteredRiders = useMemo(() => {
    let result = riders;

    if (filter !== "ALL") {
      if (filter === "SIN_CATEGORIA") {
        result = result.filter((rider) => !rider.category);
      } else {
        result = result.filter((rider) => rider.category === filter);
      }
    }

    if (search.trim()) {
      const query = search.toLowerCase().trim();
      result = result.filter(
        (rider) =>
          rider.fullName.toLowerCase().includes(query) ||
          rider.team?.toLowerCase().includes(query),
      );
    }

    return result;
  }, [riders, filter, search]);

  const totalPages = Math.ceil(filteredRiders.length / ITEMS_PER_PAGE);
  const paginatedRiders = filteredRiders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const counts = useMemo(() => {
    const map: Record<FilterType, number> = {
      ALL: riders.length,
      PRINCIPIANTE: 0,
      NOVATO: 0,
      EXPERTO: 0,
      RUTA: 0,
      MUJER: 0,
      SIN_CATEGORIA: 0,
    };
    for (const rider of riders) {
      if (rider.category) {
        map[rider.category as FilterType]++;
      } else {
        map.SIN_CATEGORIA++;
      }
    }
    return map;
  }, [riders]);

  return (
    <Section className="py-32">
      <div className="flex w-full flex-col items-center gap-6 text-center">
        <span className="badge bg-bg-yellow-tint text-text-secondary">
          Corredores
        </span>
        <h2 className="text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
          Conoce a los{" "}
          <em className="text-text-secondary not-italic">participantes</em>
        </h2>
        <p className="max-w-md text-sm text-text-muted">
          Explora el perfil de cada corredor de Crit
        </p>
      </div>

      <div className="mx-auto mt-10 w-full max-w-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-dim" />
          <input
            type="text"
            placeholder="Buscar por nombre o equipo…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-border bg-surface pl-11 pr-5 py-3 text-sm text-text-primary placeholder:text-text-dim transition-colors focus:border-border-yellow focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {FILTERS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setFilter(tab.value)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === tab.value
                ? "bg-cta text-cta-ink"
                : "bg-surface text-text-muted hover:bg-surface-raised hover:text-text-primary"
            }`}
          >
            {tab.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-2xs ${
                filter === tab.value
                  ? "bg-cta-ink/10 text-cta-ink"
                  : "bg-surface-raised text-text-dim"
              }`}
            >
              {counts[tab.value]}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-12 w-full">
        {isLoading ? (
          <div className="flex w-full items-center justify-center gap-3 rounded-2xl border border-border bg-surface py-20 text-sm text-text-muted">
            <Loader2 className="size-4 animate-spin" />
            Cargando corredores…
          </div>
        ) : error || filteredRiders.length === 0 ? (
          <div className="w-full rounded-2xl border border-border bg-surface py-20 text-center">
            <p className="text-sm font-semibold text-text-primary">
              Sin resultados
            </p>
            <p className="mt-1 text-xs text-text-muted">
              No se encontraron corredores con ese filtro.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {paginatedRiders.map((rider) => (
              <Link
                key={rider.id}
                href={`/profiles/${rider.id}`}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-border-yellow hover:bg-surface-raised hover:shadow-[0_20px_50px_-20px_rgba(254,243,0,0.15)]"
              >
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-border bg-surface-raised text-lg font-bold text-text-primary transition-all duration-300 group-hover:border-border-yellow group-hover:scale-105">
                  {rider.avatarUrl ? (
                    <img
                      src={rider.avatarUrl}
                      alt={rider.fullName}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    getInitials(rider.fullName)
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-text-primary transition-colors group-hover:text-text-secondary">
                    {rider.fullName}
                  </p>
                  {rider.team && (
                    <p className="truncate text-xs text-text-muted">
                      {rider.team}
                    </p>
                  )}
                  <div className="mt-2">
                    {rider.category ? (
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-2xs font-medium ${CATEGORY_COLORS[rider.category as CategoryType]}`}
                      >
                        {CATEGORY_LABELS[rider.category as CategoryType]}
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-surface-raised px-2.5 py-1 text-2xs font-medium text-text-dim">
                        Sin categoría
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </Section>
  );
}
