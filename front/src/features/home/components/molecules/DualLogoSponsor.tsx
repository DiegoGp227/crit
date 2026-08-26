import Image from "next/image";

interface DualLogoSponsorProps {
    name: string;
    logos: string[];
    url: string;
}

export default function DualLogoSponsor({ name, logos, url }: DualLogoSponsorProps) {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-55 flex-1 flex-col items-center gap-5 rounded-3xl border border-border bg-surface px-8 py-10 transition-all duration-300 hover:-translate-y-1 hover:border-border-yellow hover:bg-surface-raised hover:shadow-[0_24px_50px_-24px_rgba(254,243,0,0.3)] sm:max-w-[360px]"
        >
            <div className="grid w-full grid-cols-2 gap-1 overflow-hidden rounded-2xl">
                {logos.map((logo) => (
                    <div
                        key={logo}
                        className="relative flex h-40 items-center justify-center bg-surface-raised p-4 transition-colors duration-300 group-hover:bg-surface"
                    >
                        <Image
                            src={logo}
                            alt={`Logo de ${name}`}
                            fill
                            sizes="160px"
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>
            <div className="flex flex-col items-center gap-1.5">
                <span className="text-center text-xl font-semibold text-text-primary">{name}</span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-text-muted transition-colors duration-300 group-hover:text-text-secondary">
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                    >
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                    </svg>
                    Ver perfil
                </span>
            </div>
        </a>
    );
}