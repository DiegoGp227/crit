import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-2xl font-bold text-text-primary">404</h2>
      <p className="max-w-sm text-sm text-text-muted">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-cta px-6 py-2.5 text-sm font-semibold text-cta-ink transition-colors hover:brightness-110"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
