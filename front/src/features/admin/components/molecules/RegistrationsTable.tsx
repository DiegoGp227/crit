"use client";

import { Fragment, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  FileText,
  HeartPulse,
  Instagram,
  Phone,
  User,
} from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  type ColumnDef,
  type ExpandedState,
} from "@tanstack/react-table";
import { padBib } from "@/src/shared/utils/format";
import { cn } from "@/src/shared/utils/cn";
import type { AdminRegistration } from "../../services/registrationsService";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
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
  const router = useRouter();
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const columns = useMemo<ColumnDef<AdminRegistration>[]>(
    () => [
      {
        id: "expand",
        header: "",
        cell: ({ row }) => (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              row.getToggleExpandedHandler()();
            }}
            aria-expanded={row.getIsExpanded()}
            aria-label={row.getIsExpanded() ? "Ocultar detalles" : "Ver detalles"}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-text-dim transition-colors hover:bg-surface-raised hover:text-text-primary"
          >
            {row.getIsExpanded() ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </button>
        ),
      },
      {
        id: "bib",
        header: "Bib",
        cell: ({ row }) => (
          <span className="font-mono text-sm font-semibold text-text-secondary">
            {padBib(row.original.bibNumber)}
          </span>
        ),
      },
      {
        id: "rider",
        header: "Corredor",
        cell: ({ row }) => {
          const { fullName } = row.original.profile;
          const avatarUrl = row.original.profile.avatarUrl;
          return (
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-raised text-2xs font-bold text-text-muted">
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt={`Foto de ${fullName}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials(fullName)
                )}
              </div>
              <div className="min-w-0">
                <span className="block truncate text-sm font-semibold text-text-primary">
                  {fullName}
                </span>
                <span className="block text-xs text-text-dim">
                  {row.original.phone}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        id: "team",
        header: "Equipo",
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-sm text-text">
            {row.original.profile.team ?? "—"}
          </span>
        ),
      },
      {
        id: "instagram",
        header: "Instagram",
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-sm text-text">
            {row.original.instagram ?? "—"}
          </span>
        ),
      },
      {
        id: "category",
        header: "Categoría",
        cell: ({ row }) => (
          <span className="whitespace-nowrap text-sm text-text">
            {row.original.competitionType}
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
        id: "emergency",
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
          <span className="whitespace-nowrap text-sm text-text-muted">
            {formatDate(row.original.createdAt)}
          </span>
        ),
      },
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: registrations,
    columns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
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
        <table className="w-full min-w-160 border-collapse">
          <thead className="bg-surface-raised">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={cn(
                      "whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-widest text-text-dim",
                      index === 0 ? "w-12 pl-5" : "text-left",
                      index === headerGroup.headers.length - 1 ? "pr-5" : "",
                    )}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <tr
                  onClick={() => router.push(`/profiles/${row.original.profileId}`)}
                  className="cursor-pointer border-t border-border transition-colors hover:bg-white/2"
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <td
                      key={cell.id}
                      className={cn(
                        "px-4 py-3.5",
                        index === 0 ? "pl-5" : "",
                        index === row.getVisibleCells().length - 1 ? "pr-5" : "",
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <tr className="border-t-0 bg-surface-raised/40">
                    <td colSpan={row.getVisibleCells().length} className="px-5 py-4">
                      <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
                        <Detail
                          icon={FileText}
                          label="Documento"
                          value={row.original.document}
                        />
                        <Detail
                          icon={HeartPulse}
                          label="EPS"
                          value={row.original.eps}
                        />
                        <Detail
                          icon={User}
                          label="Contacto emergencia"
                          value={row.original.emergencyContactName}
                        />
                        <Detail
                          icon={Phone}
                          label="Tel. emergencia"
                          value={row.original.emergencyContactPhone}
                        />
                        <Detail
                          icon={Instagram}
                          label="Instagram"
                          value={row.original.instagram ?? "—"}
                        />
                        <Detail
                          icon={CalendarDays}
                          label="Inscrito"
                          value={formatDate(row.original.createdAt)}
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <p className="hidden items-center justify-center gap-1.5 py-2 text-2xs text-text-dim max-[600px]:flex">
        <span aria-hidden>←</span> Desliza para ver más <span aria-hidden>→</span>
      </p>
    </div>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FileText;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface text-text-dim">
        <Icon className="size-3.5" />
      </span>
      <span className="min-w-0">
        <span className="block text-2xs font-medium uppercase tracking-wider text-text-dim">
          {label}
        </span>
        <span className="block truncate text-sm text-text-primary">{value}</span>
      </span>
    </div>
  );
}
