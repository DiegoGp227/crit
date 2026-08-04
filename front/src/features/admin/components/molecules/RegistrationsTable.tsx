"use client";

import { useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { padBib } from "@/src/shared/utils/format";
import type { AdminRegistration } from "../../services/registrationsService";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const initials = (fullName: string) =>
  fullName
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

interface RegistrationsTableProps {
  registrations: AdminRegistration[];
}

export default function RegistrationsTable({
  registrations,
}: RegistrationsTableProps) {
  const columns = useMemo<ColumnDef<AdminRegistration>[]>(
    () => [
      {
        id: "bib",
        header: "#",
        cell: ({ row }) => (
          <span className="font-mono text-[0.82rem] font-semibold text-text-secondary">
            {padBib(row.original.profile.bibNumber)}
          </span>
        ),
      },
      {
        id: "rider",
        header: "Corredor",
        cell: ({ row }) => {
          const { fullName } = row.original.profile;
          return (
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-surface-raised text-[0.65rem] font-bold text-text-muted">
                {initials(fullName)}
              </div>
              <span className="min-w-0 text-sm font-semibold text-text-primary">
                {fullName}
              </span>
            </div>
          );
        },
      },
      {
        id: "phone",
        header: "Teléfono",
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-sm text-text">
            {row.original.phone}
          </span>
        ),
      },
      {
        id: "document",
        header: "Documento",
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-sm text-text">
            {row.original.document}
          </span>
        ),
      },
      {
        id: "eps",
        header: "EPS",
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-sm text-text">
            {row.original.eps}
          </span>
        ),
      },
      {
        id: "emergencyName",
        header: "Contacto emergencia",
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-sm text-text">
            {row.original.emergencyContactName}
          </span>
        ),
      },
      {
        id: "emergencyPhone",
        header: "Tel. emergencia",
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-sm text-text">
            {row.original.emergencyContactPhone}
          </span>
        ),
      },
      {
        id: "createdAt",
        header: "Inscrito",
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-sm text-text-dim">
            {formatDate(row.original.createdAt)}
          </span>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: registrations,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (registrations.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-1 rounded-2xl border border-border bg-surface px-6 py-14 text-center">
        <p className="text-sm font-semibold text-text-primary">
          No hay inscritos en esta categoría
        </p>
        <p className="text-xs text-text-muted">
          Los corredores que se inscriban aparecerán aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-180 border-collapse">
          <thead className="bg-surface-raised">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={`whitespace-nowrap px-4 py-3.5 text-[0.68rem] font-semibold uppercase tracking-widest text-text-dim ${
                      index === 0 ? "w-14 pl-5" : "text-left"
                    } ${index === headerGroup.headers.length - 1 ? "pr-5" : ""}`}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t border-border transition-colors hover:bg-white/2">
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={`px-4 py-3 ${index === 0 ? "pl-5" : ""} ${
                      index === row.getVisibleCells().length - 1 ? "pr-5" : ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="hidden items-center justify-center gap-1.5 py-2 text-[0.7rem] text-text-dim max-[600px]:flex">
        <span aria-hidden>←</span> Desliza para ver más <span aria-hidden>→</span>
      </p>
    </div>
  );
}
