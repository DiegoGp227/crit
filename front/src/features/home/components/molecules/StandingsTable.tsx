"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";

type Trend = "up" | "down" | "same";

interface StandingRow {
  position: number;
  initials: string;
  name: string;
  team: string;
  time: string;
  points: number;
  trend: { direction: Trend; value: number };
}

const standings: StandingRow[] = [
  { position: 1, initials: "DG", name: "Diego Góngora", team: "Team Bogotá Elite", time: "1:02:34", points: 2480, trend: { direction: "up", value: 2 } },
  { position: 2, initials: "JP", name: "Juan Pérez", team: "Team Ciclismo Capital", time: "+0:12", points: 2310, trend: { direction: "up", value: 1 } },
  { position: 3, initials: "AR", name: "Andrés Ruiz", team: "Team Andes", time: "+0:45", points: 2145, trend: { direction: "same", value: 0 } },
  { position: 4, initials: "CD", name: "Camilo Díaz", team: "Team Capital", time: "+1:08", points: 1980, trend: { direction: "up", value: 3 } },
  { position: 5, initials: "FM", name: "Felipe Mora", team: "Team Bogotá Elite", time: "+1:23", points: 1875, trend: { direction: "down", value: 1 } },
  { position: 6, initials: "SL", name: "Santiago López", team: "Team Andes", time: "+2:15", points: 1720, trend: { direction: "up", value: 4 } },
  { position: 7, initials: "PM", name: "Pedro Martínez", team: "Team Ciclismo Capital", time: "+3:02", points: 1655, trend: { direction: "down", value: 2 } },
  { position: 8, initials: "AG", name: "Ana Gómez", team: "Team Femenino Elite", time: "+3:45", points: 1590, trend: { direction: "up", value: 5 } },
  { position: 9, initials: "CR", name: "Carlos Ríos", team: "Team Independiente", time: "+4:20", points: 1445, trend: { direction: "down", value: 3 } },
  { position: 10, initials: "LV", name: "Laura Vega", team: "Team Femenino Elite", time: "+5:10", points: 1320, trend: { direction: "same", value: 0 } },
];

const positionColor = (position: number) =>
  position === 1 ? "text-gold" : position === 2 ? "text-silver" : position === 3 ? "text-bronze" : "text-text-dim";

const trendStyles: Record<Trend, string> = {
  up: "text-green",
  down: "text-accent",
  same: "text-text-dim",
};

const trendIcon: Record<Trend, string> = {
  up: "▲",
  down: "▼",
  same: "►",
};

export default function StandingsTable() {
  const data = useMemo(() => standings, []);

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
          const { initials, name, team, trend, position } = row.original;
          return (
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border text-[0.65rem] font-bold ${
                  position <= 3 ? "border-border-yellow text-text-secondary" : "border-border bg-surface-raised text-text-muted"
                }`}
              >
                {initials}
              </div>
              <div className="min-w-0">
                <Link
                  href="/profile"
                  className="text-sm font-semibold text-text-primary transition-colors hover:text-text-secondary"
                >
                  {name}
                </Link>
                <div className="hidden text-[0.68rem] text-text-dim md:block">{team}</div>
              </div>
              <span className={`ml-1.5 hidden flex-shrink-0 text-[0.68rem] sm:inline-flex ${trendStyles[trend.direction]}`}>
                {trendIcon[trend.direction]} {trend.direction === "same" ? "0" : `${trend.value > 0 ? "+" : "-"}${Math.abs(trend.value)}`}
              </span>
            </div>
          );
        },
      },
      {
        id: "time",
        header: "Tiempo",
        cell: ({ row }) => (
          <span
            className={`font-mono text-[0.82rem] ${row.original.position === 1 ? "font-semibold text-text-secondary" : "text-text"}`}
          >
            {row.original.time}
          </span>
        ),
      },
      {
        id: "points",
        header: "Pts",
        cell: ({ row }) => (
          <span className="font-bold text-text-primary">{row.original.points.toLocaleString("en-US")}</span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
              <tr key={row.id} className="border-t border-border transition-colors hover:bg-white/2">
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={`px-4 py-3 text-sm ${index === 0 ? "pl-5" : ""} ${
                      cell.column.id === "points" ? "hidden text-right min-[401px]:table-cell" : "text-left"
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
