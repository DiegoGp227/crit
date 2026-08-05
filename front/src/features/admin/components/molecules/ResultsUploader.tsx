"use client";

import { useRef, useState } from "react";
import { FileUp, FileSpreadsheet } from "lucide-react";
import Button from "@/src/shared/components/ui/Button";
import Select from "@/src/shared/components/ui/Select";
import { cn } from "@/src/shared/utils/cn";
import { RACES, raceLabel, type RaceOption } from "../../services/racesService";

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function ResultsUploader() {
  const [race, setRace] = useState<RaceOption>(RACES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectFile = (next: File | null) => {
    if (next && /\.(xls|xlsx|csv)$/i.test(next.name)) {
      setFile(next);
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <h2 className="text-xl font-bold text-text-primary">Resultados</h2>

      <div className="w-full rounded-2xl border border-border bg-surface-raised p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cta text-cta-ink">
          <FileUp className="size-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-text-primary">Subir resultado de carrera</h3>
          <p className="text-sm text-text-muted">
            Selecciona la carrera y carga el archivo con los resultados.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        <Select
          label="Carrera"
          value={race.id}
          onChange={(event) =>
            setRace(
              RACES.find((r) => r.id === Number(event.target.value)) ?? RACES[0],
            )
          }
          className="w-full sm:max-w-md"
        >
          {RACES.map((r) => (
            <option key={r.id} value={r.id}>
              {raceLabel(r)}
            </option>
          ))}
        </Select>

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
            "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-surface px-6 py-10 text-center transition-colors",
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
              <span className="text-sm font-semibold text-text-primary">{file.name}</span>
              <span className="text-xs text-text-muted">{formatFileSize(file.size)}</span>
            </>
          ) : (
            <>
              <span className="text-sm font-semibold text-text-primary">
                Arrastra tu archivo aquí o haz clic para elegirlo
              </span>
              <span className="text-xs text-text-muted">Formatos: .xls, .xlsx o .csv</span>
            </>
          )}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept=".xls,.xlsx,.csv"
          className="hidden"
          onChange={(event) => selectFile(event.target.files?.[0] ?? null)}
        />

        <div className="flex flex-wrap items-center gap-3">
          <Button disabled={!file} className="gap-2">
            <FileUp className="size-4" />
            Subir resultado
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
      </div>
    </div>
    </div>
  );
}
