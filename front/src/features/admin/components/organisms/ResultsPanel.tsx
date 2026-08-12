"use client";

import { useMemo, useRef, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  FileDown,
  FileSpreadsheet,
  FileUp,
  Info,
  Loader2,
  TriangleAlert,
  UserCheck,
  UserX,
} from "lucide-react";
import Button from "@/src/shared/components/ui/Button";
import Select from "@/src/shared/components/ui/Select";
import { cn } from "@/src/shared/utils/cn";
import { padBib } from "@/src/shared/utils/format";
import {
  RACE_STATUS_META,
  downloadRaceExcel,
  raceLabel,
  uploadRaceExcel,
  type Race,
} from "../../services/racesService";
import { toResultView } from "../../services/resultsService";
import { useRaces, useRaceResults } from "../../hooks/useRaces";

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

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

interface ExcelRowError {
  fila: string;
  motivo: string;
}

const parseUploadError = (
  err: unknown,
): { message: string; errors: string[] } => {
  const message = parseError(err);

  if (err && typeof err === "object" && "response" in err) {
    const error = err as {
      response?: {
        data?: { details?: { errors?: ExcelRowError[] } };
      };
    };
    const items = error.response?.data?.details?.errors;
    if (Array.isArray(items) && items.length > 0) {
      return {
        message,
        errors: items.map((item) => `${item.fila}: ${item.motivo}`),
      };
    }
  }

  return { message, errors: [] };
};

const VALIDATION_RULES = [
  "Corredor inexistente",
  "profileId inexistente",
  "Corredor duplicado",
  "Filas eliminadas",
  "Filas adicionales",
  "Asistencia vacía",
  "Puntos vacíos",
  "Formato inválido",
];

export default function ResultsPanel() {
  const { races, isLoading: racesLoading } = useRaces();
  const [selectedRaceId, setSelectedRaceId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const race: Race | null =
    races.find((r) => r.id === selectedRaceId) ?? races[0] ?? null;

  const { results, isLoading: resultsLoading, mutate: mutateResults } =
    useRaceResults(race?.id ?? null);

  const rows = useMemo(
    () => results.map(toResultView).sort((a, b) => b.points - a.points),
    [results],
  );

  const selectFile = (next: File | null) => {
    if (next && /\.xlsx$/i.test(next.name)) {
      setFile(next);
      setUploadSuccess(null);
      setUploadError(null);
      setUploadErrors([]);
    }
  };

  const handleDownload = async (raceId: number) => {
    if (downloading) return;
    setDownloading(true);
    setDownloadError(null);
    try {
      await downloadRaceExcel(raceId);
    } catch (err) {
      setDownloadError(parseError(err));
    } finally {
      setDownloading(false);
    }
  };

  const handleUpload = async () => {
    if (!race || !file || uploading) return;
    setUploading(true);
    setUploadError(null);
    setUploadErrors([]);
    setUploadSuccess(null);
    try {
      await uploadRaceExcel(race.id, file);
      setFile(null);
      setUploadSuccess("Resultados guardados correctamente.");
      await mutateResults();
    } catch (err) {
      const parsed = parseUploadError(err);
      setUploadError(parsed.message);
      setUploadErrors(parsed.errors);
    } finally {
      setUploading(false);
    }
  };

  const statusMeta = race ? RACE_STATUS_META[race.status] : null;
  const raceDateLabel = race
    ? new Date(race.raceDate).toLocaleDateString("es-CO", {
        weekday: "short",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-text-primary">Resultados</h2>
          <p className="mt-0.5 text-sm text-text-muted">
            Descarga la plantilla, diligénciala y súbela para definir los puntos de cada carrera.
          </p>
        </div>
        <span className="badge border border-border bg-surface-raised text-text-muted">
          <FileSpreadsheet className="size-3.5" />
          El sistema no calcula puntos
        </span>
      </div>

      {/* Carrera seleccionada */}
      <section className="rounded-2xl border border-border bg-surface-raised p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-yellow-tint text-text-secondary">
            <Calendar className="size-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Carrera</h3>
            <p className="text-sm text-text-muted">
              Selecciona la carrera a la que pertenecerán los resultados.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-end">
          {racesLoading ? (
            <div className="flex items-center gap-2 pb-0.5 text-sm text-text-muted">
              Cargando carreras…
            </div>
          ) : races.length === 0 ? (
            <p className="pb-0.5 text-sm text-text-muted">
              Crea una carrera primero desde la pestaña «Crear carrera».
            </p>
          ) : (
            <>
              <Select
                label="Carrera"
                value={race?.id ?? ""}
                onChange={(event) =>
                  setSelectedRaceId(Number(event.target.value))
                }
                className="w-full lg:max-w-md"
              >
                {races.map((r) => (
                  <option key={r.id} value={r.id}>
                    {raceLabel(r)}
                  </option>
                ))}
              </Select>

              {race && (
                <div className="flex flex-wrap items-center gap-2 pb-0.5">
                  <span className="badge border border-border bg-surface font-mono text-text-primary">
                    #{race.id}
                  </span>
                  <span className="badge text-text-muted">
                    <Calendar className="size-3.5" />
                    {raceDateLabel}
                  </span>
                  {statusMeta && (
                    <span className={cn("badge", statusMeta.className)}>
                      {statusMeta.label}
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Descarga y carga */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="flex flex-col rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-raised text-text-secondary">
              <FileDown className="size-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-text-primary">
                Descargar plantilla
              </h3>
              <p className="text-sm text-text-muted">
                Genera un Excel con dos hojas (Expertos y Femenino), una fila por
                corredor inscrito.
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-border bg-surface-raised p-4">
            <p className="text-[0.7rem] font-medium uppercase tracking-widest text-text-dim">
              Columnas
            </p>
            <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1.5">
              {["Dorsal", "Nombre", "Equipo", "Asistencia", "Puntos"].map((col) => (
                <span key={col} className="text-sm font-medium text-text-primary">
                  {col}
                </span>
              ))}
              <span className="text-sm text-text-muted">
                +{" "}
                <span className="font-mono text-xs text-text-dim">profileId</span>{" "}
                (oculta)
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-text-muted">
              <span className="text-text-primary">Asistencia</span> usa un listado
              (PRESENT / ABSENT). Solo modifica esa columna y{" "}
              <span className="text-text-primary">Puntos</span> (pueden ser
              positivos, cero o negativos). Si la carrera ya tiene resultados, se
              descargan con sus valores.
            </p>
          </div>

          {downloadError && (
            <p className="mt-4 text-sm font-medium text-accent-bright">
              {downloadError}
            </p>
          )}

          <Button
            disabled={!race || downloading}
            onClick={() => race && handleDownload(race.id)}
            className="mt-5 gap-2 self-start"
          >
            {downloading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <FileDown className="size-4" />
            )}
            {downloading ? "Generando…" : "Descargar Excel"}
          </Button>
        </section>

        <section className="flex flex-col rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cta text-cta-ink">
              <FileUp className="size-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-text-primary">
                Subir resultados
              </h3>
              <p className="text-sm text-text-muted">
                El archivo pasa a ser la fuente de verdad de esta carrera.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              selectFile(event.dataTransfer.files?.[0] ?? null);
            }}
            className={cn(
              "mt-5 flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-surface-raised px-6 py-10 text-center transition-colors",
              dragging
                ? "border-border-yellow bg-bg-yellow-tint"
                : "border-border-hover hover:border-border-yellow",
            )}
          >
            <FileSpreadsheet
              className={cn("size-8", file ? "text-text-secondary" : "text-text-dim")}
            />
            {file ? (
              <>
                <span className="text-sm font-semibold text-text-primary">
                  {file.name}
                </span>
                <span className="text-xs text-text-muted">
                  {formatFileSize(file.size)}
                </span>
              </>
            ) : (
              <>
                <span className="text-sm font-semibold text-text-primary">
                  Arrastra tu archivo aquí o haz clic para elegirlo
                </span>
                <span className="text-xs text-text-muted">
                  Solo archivos .xlsx (la plantilla descargada)
                </span>
              </>
            )}
          </button>

          <input
            ref={inputRef}
            type="file"
            accept=".xlsx"
            className="hidden"
            onChange={(event) => selectFile(event.target.files?.[0] ?? null)}
          />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button
              disabled={!file || uploading}
              onClick={handleUpload}
              className="gap-2"
            >
              {uploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <FileUp className="size-4" />
              )}
              {uploading ? "Subiendo…" : "Subir resultado"}
            </Button>
            {file && (
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-primary"
              >
                Quitar archivo
              </button>
            )}
          </div>

          {uploadError && (
            <div className="mt-4 rounded-xl border border-accent-bright/25 bg-accent-bright/5 p-4">
              <p className="text-sm font-medium text-accent-bright">
                {uploadError}
              </p>
              {uploadErrors.length > 0 && (
                <ul className="mt-2.5 space-y-1">
                  {uploadErrors.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-1.5 text-xs text-text-muted"
                    >
                      <TriangleAlert className="mt-0.5 size-3 shrink-0 text-accent-bright" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {uploadSuccess && (
            <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-green">
              <CheckCircle2 className="size-4" />
              {uploadSuccess}
            </p>
          )}

          <p className="mt-4 flex items-start gap-1.5 text-xs text-text-muted">
            <TriangleAlert className="mt-0.5 size-3.5 shrink-0 text-amber" />
            Al subir un archivo válido se eliminarán los resultados actuales de la
            carrera y se insertarán los nuevos.
          </p>
        </section>
      </div>

      {/* Validación estricta */}
      <section className="rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-raised text-amber">
            <Info className="size-5" />
          </span>
          <div>
            <h3 className="text-lg font-bold text-text-primary">Validación estricta</h3>
            <p className="text-sm text-text-muted">
              Si el archivo tiene cualquier error, no se guarda absolutamente nada.
            </p>
          </div>
        </div>

        <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
          {VALIDATION_RULES.map((rule) => (
            <li key={rule} className="flex items-center gap-2.5 text-sm text-text">
              <CheckCircle2 className="size-4 shrink-0 text-green" />
              {rule}
            </li>
          ))}
        </ul>
      </section>

      {/* Vista previa */}
      <section className="rounded-2xl border border-border bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6">
          <div>
            <h3 className="text-lg font-bold text-text-primary">
              Resultados de la carrera
            </h3>
            <p className="text-sm text-text-muted">
              Lo que actualmente tiene cargada la carrera seleccionada.
            </p>
          </div>
          <span className="badge border border-border bg-surface-raised text-text-muted">
            {rows.length} corredores
          </span>
        </div>

        {resultsLoading ? (
          <div className="flex items-center justify-center gap-2 px-6 py-10 text-sm text-text-muted">
            Cargando resultados…
          </div>
        ) : rows.length === 0 ? (
          <div className="mx-6 my-6 flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border-hover bg-surface-raised/40 px-6 py-10 text-center">
            <FileSpreadsheet className="size-6 text-text-dim" />
            <p className="text-sm font-semibold text-text-primary">
              Aún no hay resultados para esta carrera
            </p>
            <p className="text-xs text-text-muted">
              Descarga la plantilla, diligénciala y súbela para llenarla.
            </p>
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-140 border-collapse">
              <thead>
                <tr className="border-y border-border bg-surface-raised">
                  {["#", "Dorsal", "Corredor", "Equipo", "Asistencia", "Puntos"].map(
                    (heading, index) => (
                      <th
                        key={heading}
                        className={cn(
                          "whitespace-nowrap px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-widest text-text-dim",
                          index === 0 ? "pl-6 text-right" : "text-left",
                          index === 5 ? "pr-6 text-right" : "",
                        )}
                      >
                        {heading}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={row.bib}
                    className="border-t border-border transition-colors hover:bg-white/2"
                  >
                    <td className="whitespace-nowrap px-4 py-3.5 pl-6 text-right">
                      <span className="font-mono text-xs font-semibold text-text-dim">
                        {index + 1}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5">
                      <span className="font-mono text-[0.82rem] font-semibold text-text-secondary">
                        {padBib(row.bib)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-sm font-semibold text-text-primary">
                      {row.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-sm text-text">
                      {row.team ?? "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5">
                      <span
                        className={cn(
                          "badge",
                          row.attendance === "PRESENT"
                            ? "border border-green/25 bg-green-dim text-green"
                            : "border border-border bg-surface-raised text-text-muted",
                        )}
                      >
                        {row.attendance === "PRESENT" ? (
                          <UserCheck className="size-3.5" />
                        ) : (
                          <UserX className="size-3.5" />
                        )}
                        {row.attendance === "PRESENT" ? "Presente" : "Ausente"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 pr-6 text-right">
                      <span
                        className={cn(
                          "font-mono text-sm font-bold",
                          row.points < 0 ? "text-amber" : "text-text-primary",
                        )}
                      >
                        {row.points > 0 ? `+${row.points}` : row.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="border-t border-border px-6 py-4 text-xs text-text-muted">
          Resultados ordenados de mayor a menor puntaje para la carrera seleccionada.
          Al subir un nuevo Excel, esta vista se reemplaza por el contenido del archivo.
        </p>
      </section>
    </div>
  );
}
