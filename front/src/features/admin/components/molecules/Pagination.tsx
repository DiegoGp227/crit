"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/src/shared/components/ui/Button";
import { cn } from "@/src/shared/utils/cn";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getPageNumbers = (page: number, totalPages: number): number[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, 2, page - 1, page, page + 1, totalPages - 1, totalPages]);

  return Array.from(pages)
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);
};

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-4">
      <p className="text-sm text-text-muted">
        Página {page} de {totalPages}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <Button
          variant="surface"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Página anterior"
          className="gap-1 px-3"
        >
          <ChevronLeft className="size-4" />
          <span className="hidden sm:inline">Anterior</span>
        </Button>

        {getPageNumbers(page, totalPages).map((pageNumber, index, arr) => {
          const isGap = index > 0 && pageNumber - arr[index - 1] > 1;
          return (
            <span key={pageNumber} className="flex items-center gap-1.5">
              {isGap && <span className="px-1 text-sm text-text-dim hidden sm:inline">…</span>}
              <button
                type="button"
                onClick={() => onPageChange(pageNumber)}
                aria-current={pageNumber === page ? "page" : undefined}
                className={cn(
                  "flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl text-sm font-semibold transition-colors",
                  pageNumber === page
                    ? "bg-cta text-cta-ink"
                    : "text-text-muted hover:bg-surface-raised hover:text-text-primary",
                )}
              >
                {pageNumber}
              </button>
            </span>
          );
        })}

        <Button
          variant="surface"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Página siguiente"
          className="gap-1 px-3"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
