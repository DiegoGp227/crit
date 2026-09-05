"use client";

import { useState } from "react";
import { Calendar, CalendarPlus, Clock3, Info, Loader2, Trash2 } from "lucide-react";
import Button from "@/src/shared/components/ui/Button";
import Input from "@/src/shared/components/ui/Input";
import Modal from "@/src/shared/components/ui/Modal";
import { cn } from "@/src/shared/utils/cn";
import { padBib } from "@/src/shared/utils/format";
import {
  RACE_STATUS_META,
  createRace,
  deleteRace,
  formatRaceDate,
  updateRace,
  type Race,
  type RaceStatus,
} from "../../services/racesService";
import { useRaces } from "../../hooks/useRaces";

const STATUS_OPTIONS: RaceStatus[] = ["SCHEDULED", "FINISHED", "POSTPONED"];

const parseError = (err: unknown): string => {
  if (err && typeof err === "object" && "response" in err) {
    const error = err as {
      response?: { data?: { message?: string } };
      request?: unknown;
    };
    if (error.response?.data?.message) return error.response.data.message;
    if (error.request) return "Error de conexión. Verifica tu conexión a internet.";
  }
  return "Ocurrió un error inesperado. Inténtalo de nuevo.";
};

export default function CreateRacePanel() {
  const { races, isLoading, mutate } = useRaces();
  const [raceDate, setRaceDate] = useState("");
  const [maleLaps, setMaleLaps] = useState<number>(0);
  const [femaleLaps, setFemaleLaps] = useState<number>(0);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Race | null>(null);
  const [deleting, setDeleting] = useState(false);

  const dateLabel = raceDate
    ? new Date(`${raceDate}T00:00:00`).toLocaleDateString("es-CO", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  const handleCreate = async () => {
    if (!raceDate || creating) return;
    setCreating(true);
    setError(null);
    try {
      await createRace(`${raceDate}T19:00:00.000Z`, maleLaps, femaleLaps);
      setRaceDate("");
      setMaleLaps(0);
      setFemaleLaps(0);
      await mutate();
    } catch (err) {
      setError(parseError(err));
    } finally {
      setCreating(false);
    }
  };

  const handleStatusChange = async (race: Race, status: RaceStatus) => {
    try {
      await updateRace(race.id, { status });
      await mutate();
    } catch (err) {
      setError(parseError(err));
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    try {
      await deleteRace(deleteTarget.id);
      setDeleteTarget(null);
      await mutate();
    } catch (err) {
      setError(parseError(err));
    } finally {
      setDeleting(false);
    }
  };

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

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Vueltas masculinas"
              type="number"
              min={0}
              value={maleLaps}
              onChange={(event) => setMaleLaps(Number(event.target.value))}
            />
            <Input
              label="Vueltas femeninas"
              type="number"
              min={0}
              value={femaleLaps}
              onChange={(event) => setFemaleLaps(Number(event.target.value))}
            />
          </div>
          <p className="text-xs text-text-muted">
            1 vuelta = 1.5 km. Los km se calculan automáticamente por cada corredor presente.
          </p>

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

          {error && (
            <p className="text-sm font-medium text-accent-bright">{error}</p>
          )}

          <Button
            disabled={!raceDate || creating}
            onClick={handleCreate}
            className="gap-2 self-start"
          >
            {creating ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <CalendarPlus className="size-4" />
            )}
            {creating ? "Creando…" : "Crear carrera"}
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
            {races.length} carreras
          </span>
        </div>

        <div className="mt-5 overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 px-6 py-10 text-sm text-text-muted">
              <Loader2 className="size-4 animate-spin" />
              Cargando carreras…
            </div>
          ) : races.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-1 px-6 py-10 text-center">
              <Calendar className="size-6 text-text-dim" />
              <p className="text-sm font-semibold text-text-primary">
                Aún no hay carreras creadas
              </p>
              <p className="text-xs text-text-muted">
                Crea la primera carrera con el formulario de arriba.
              </p>
            </div>
          ) : (
            <table className="w-full min-w-140 border-collapse">
              <thead>
                <tr className="border-y border-border bg-surface-raised">
                  {["Carrera", "Fecha", "Vueltas", "Estado"].map((heading, index) => (
                    <th
                      key={heading}
                      className={cn(
                        "whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-widest text-text-dim",
                        index === 0 ? "pl-6 text-left" : "text-left",
                        index === 3 ? "pr-6" : "",
                      )}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {races.map((race) => {
                  const statusMeta = RACE_STATUS_META[race.status];
                  return (
                    <tr
                      key={race.id}
                      className="border-t border-border transition-colors hover:bg-white/2"
                    >
                      <td className="whitespace-nowrap px-4 py-3.5 pl-6">
                        <span className="font-mono text-sm font-semibold text-text-secondary">
                          {padBib(race.id)}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-sm text-text-primary">
                        {formatRaceDate(race.raceDate)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 text-sm text-text-muted">
                        H: {race.maleLaps} / M: {race.femaleLaps}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3.5 pr-6">
                        <div className="flex items-center gap-2">
                          <span className={cn("badge", statusMeta.className)}>
                            {statusMeta.label}
                          </span>
                          <select
                            value={race.status}
                            onChange={(event) =>
                              handleStatusChange(
                                race,
                                event.target.value as RaceStatus,
                              )
                            }
                            aria-label={`Cambiar estado de la carrera #${race.id}`}
                            className="rounded-xl border border-border bg-surface px-2.5 py-1.5 text-xs text-text-muted outline-none transition-colors focus:border-border-yellow"
                          >
                            {STATUS_OPTIONS.map((status) => (
                              <option key={status} value={status}>
                                {RACE_STATUS_META[status].label}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(race)}
                            aria-label={`Eliminar carrera #${race.id}`}
                            className="rounded-lg p-1.5 text-text-dim transition-colors hover:bg-accent-bright/10 hover:text-accent-bright"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
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

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <h3 className="text-lg font-bold text-text-primary">
            Eliminar carrera
          </h3>
          <p className="mt-2 text-sm text-text-muted">
            ¿Seguro que quieres eliminar la carrera{" "}
            <span className="font-semibold text-text-primary">
              #{deleteTarget?.id}
            </span>
            {deleteTarget && ` del ${formatRaceDate(deleteTarget.raceDate)}`}?
            Esta acción no se puede deshacer.
          </p>
          <div className="mt-5 flex items-center justify-end gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeleteTarget(null)}
              disabled={deleting}
            >
              Cancelar
            </Button>
            <Button
              variant="surface"
              size="sm"
              onClick={handleDelete}
              disabled={deleting}
              className="gap-2 text-accent-bright"
            >
              {deleting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
              {deleting ? "Eliminando…" : "Eliminar"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
