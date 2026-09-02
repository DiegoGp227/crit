"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-bold text-text-primary">
        Algo salió mal
      </h2>
      <p className="max-w-sm text-sm text-text-muted">
        Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
      </p>
      <button
        onClick={() => reset()}
        className="mt-2 rounded-full bg-cta px-6 py-2.5 text-sm font-semibold text-cta-ink transition-colors hover:brightness-110"
      >
        Reintentar
      </button>
    </div>
  );
}
