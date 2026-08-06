"use client";

import { useState } from "react";
import { Calendar, CalendarPlus, Clock3, Info } from "lucide-react";
import Button from "@/src/shared/components/ui/Button";
import Input from "@/src/shared/components/ui/Input";
import { cn } from "@/src/shared/utils/cn";
import { padBib } from "@/src/shared/utils/format";
import {
  RACES,
  RACE_STATUS_META,
  formatRaceDate,
} from "../../services/racesService";

export default function CreateRacePanel() {
  const [raceDate, setRaceDate] = useState("");

  const dateLabel = raceDate
    ? new Date(`${raceDate}T00:00:00`).toLocaleDateString("es-CO", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Crear carrera</h2>
          <p className="mt-0.5 text-sm text-text-muted">
            Registra una nueva fecha de carrera. El identificador será asignado automáticamente.
          </p>
        </div>
        <span className="badge border border-border bg-surface-raised text-text-muted">
          <Clock3 className="size-3.5" />
          Estado inicial: Programada
        </span>
      </div>

      <section className="rounded-2xl border border-border bg-surface-raised p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-yellow-tint text-text-secondary">
            <CalendarPlus className="size-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Nueva carrera</h3>
            <p className="text-sm text-text-muted">
              Define únicamente la fecha. La carrera se crea en estado Programada.
            </p>
          </div>
        </div>

        <div className="mt-6 grid max-w-md gap-5">
          <Input
            label="Fecha de la carrera"
            type="date"
            value={raceDate}
            onChange={(event) => setRaceDate(event.target.value)}
            className="[color-scheme:dark]"
          />

          <div className="flex flex-wrap items-center gap-2">
            {dateLabel ? (
              <>
                <span className="badge border border-border bg-surface text-text-muted">
                  <Calendar className="size-3.5" />
                  {dateLabel}
                </span>
                <span className="badge border border-border-hover bg-surface text-text-muted">
                  #pendiente
                </span>
                <span className="badge border border-border-hover bg-surface text-text-muted">
                  Programada
                </span>
              </>
            ) : (
              <span className="badge border border-border bg-surface text-text-dim">
                Selecciona una fecha para ver el resumen
              </span>
            )}
          </div>

          <Button disabled={!raceDate} className="gap-2 self-start">
            <CalendarPlus className="size-4" />
            Crear carrera
          </Button>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-yellow-tint text-text-secondary">
              <Calendar className="size-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-text-primary">Carreras creadas</h3>
              <p className="text-sm text-text-muted">
                Fechas registradas en el campeonato y su estado.
              </p>
            </div>
          </div>
          <span className="badge border border-border bg-surface-raised text-text-muted">
            {RACES.length} carreras
          </span>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-120 border-collapse">
            <thead>
              <tr className="border-y border-border bg-surface-raised">
                {["Carrera", "Fecha", "Estado"].map((heading, index) => (
                  <th
                    key={heading}
                    className={cn(
                      "whitespace-nowrap px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-widest text-text-dim",
                      index === 0 ? "pl-6 text-left" : "text-left",
                      index === 2 ? "pr-6" : "",
                    )}
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RACES.map((race) => {
                const statusMeta = RACE_STATUS_META[race.status];
                return (
                  <tr
                    key={race.id}
                    className="border-t border-border transition-colors hover:bg-white/2"
                  >
                    <td className="whitespace-nowrap px-4 py-3.5 pl-6">
                      <span className="font-mono text-[0.82rem] font-semibold text-text-secondary">
                        {padBib(race.id)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-sm text-text-primary">
                      {formatRaceDate(race.raceDate)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 pr-6">
                      <span className={cn("badge", statusMeta.className)}>
                        {statusMeta.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-raised text-amber">
            <Info className="size-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Para tener en cuenta</h3>
            <p className="text-sm text-text-muted">
              Cómo se comporta el sistema con las carreras.
            </p>
          </div>
        </div>

        <ul className="mt-5 grid gap-x-8 gap-y-2.5 text-sm text-text sm:grid-cols-2">
          <li className="flex items-start gap-2.5">
            <Calendar className="mt-0.5 size-4 shrink-0 text-text-dim" />
            Si una carrera se aplaza, no otorga puntos y permanece en el historial.
          </li>
          <li className="flex items-start gap-2.5">
            <Calendar className="mt-0.5 size-4 shrink-0 text-text-dim" />
            No se renumeran las carreras; el identificador es su número.
          </li>
          <li className="flex items-start gap-2.5">
            <Calendar className="mt-0.5 size-4 shrink-0 text-text-dim" />
            Para recuperar una fecha aplazada, crea una nueva carrera.
          </li>
          <li className="flex items-start gap-2.5">
            <Calendar className="mt-0.5 size-4 shrink-0 text-text-dim" />
            Después de crear la carrera podrás descargar su plantilla de resultados.
          </li>
        </ul>
      </section>
    </div>
  );
}
