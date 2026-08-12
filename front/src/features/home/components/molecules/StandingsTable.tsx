"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

export interface StandingRow {
  profileId: number;
  position: number;
  initials: string;
  name: string;
  team: string;
  points: number;
  races?: number;
}

const positionColor = (position: number) =>
  position === 1
    ? "text-gold"
    : position === 2
      ? "text-silver"
      : position === 3
        ? "text-bronze"
        : "text-text-dim";

interface StandingsTableProps {
  rows: StandingRow[];
  showRaces?: boolean;
}

export default function StandingsTable({
  rows,
  showRaces = false,
}: StandingsTableProps) {
  const columns = useMemo<ColumnDef<StandingRow>[]>(
    () => [
      {
        id: "position",
        header: "#",
        cell: ({ row }) => (
          <span className={`font-bold ${positionColor(row.original.position)}`}>
            {row.original.position}
          </span>
        ),
      },
      {
        id: "rider",
        header: "Corredor",
        cell: ({ row }) => {
          const { initials, name, team, position, profileId } = row.original;
          return (
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[0.65rem] font-bold ${
                  position <= 3
                    ? "border-border-yellow text-text-secondary"
                    : "border-border bg-surface-raised text-text-muted"
                }`}
              >
                {initials}
              </div>
              <div className="min-w-0">
                <Link
                  href={`/profiles/${profileId}`}
                  className="text-sm font-semibold text-text-primary transition-colors hover:text-text-secondary"
                >
                  {name}
                </Link>
                <div className="hidden text-[0.68rem] text-text-dim md:block">
                  {team}
                </div>
              </div>
            </div>
          );
        },
      },
      ...(showRaces
        ? [
            {
              id: "races",
              header: "Carreras",
              cell: ({ row }: { row: { original: StandingRow } }) => (
                <span className="text-sm text-text-muted">
                  {row.original.races}
                </span>
              ),
            },
          ]
        : []),
      {
        id: "points",
        header: "Pts",
        cell: ({ row }) => (
          <span className="font-bold text-text-primary">
            {row.original.points.toLocaleString("es-CO")}
          </span>
        ),
      },
    ],
    [showRaces],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (rows.length === 0) {
    return (
      <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="flex flex-col items-center justify-center gap-1 px-6 py-16 text-center">
          <p className="text-sm font-semibold text-text-primary">
            Sin datos para mostrar
          </p>
          <p className="text-xs text-text-muted">
            Aún no hay resultados para esta categoría.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full min-w-135 border-collapse">
          <thead className="bg-surface-raised">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={`whitespace-nowrap px-4 py-3.5 text-[0.68rem] font-semibold uppercase tracking-widest text-text-dim ${
                      index === 0 ? "w-10 pl-5" : ""
                    } ${header.id === "points" ? "hidden text-right min-[401px]:table-cell" : "text-left"} ${
                      index === headerGroup.headers.length - 1 ? "pr-5" : ""
                    }`}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-border transition-colors hover:bg-white/2"
              >
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={`px-4 py-3 text-sm ${index === 0 ? "pl-5" : ""} ${
                      cell.column.id === "points"
                        ? "hidden text-right min-[401px]:table-cell"
                        : "text-left"
                    } ${index === row.getVisibleCells().length - 1 ? "pr-5" : ""}`}
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