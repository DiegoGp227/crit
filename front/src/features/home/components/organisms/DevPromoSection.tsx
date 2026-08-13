import Section from "@/src/shared/components/ui/Section";

const highlights = [
    { title: "Inscripciones", desc: "Corredores y categorías en línea, sin papeleo." },
    { title: "Puntuación", desc: "Carga de resultados y clasificación al instante." },
    { title: "Panel admin", desc: "Control total de carreras y participantes." },
    { title: "Diseño propio", desc: "Identidad visual construida desde cero." },
];

const stack = ["React js", "Next.js", "TypeScript", "Node.js", "PostgreSQL"];

function CheckIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}

function GitHubIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.18-.02-2.13-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.4-5.25 5.68.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
        </svg>
    );
}

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M12.04 2a9.9 9.9 0 0 0-8.4 15.17L2.04 22l4.96-1.56A9.9 9.9 0 1 0 12.04 2Zm0 18.18a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-2.95.93.96-2.86-.2-.3a8.29 8.29 0 1 1 6.72 3.57Zm4.55-6.2c-.25-.13-1.47-.73-1.7-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.13-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
        </svg>
    );
}

export default function DevPromoSection() {
    return (
        <Section className="relative overflow-hidden">
            <div
                className="pointer-events-none absolute rounded-full"
                style={{
                    width: 700,
                    height: 400,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "radial-gradient(ellipse, rgba(240, 20, 84, 0.08), transparent 60%)",
                }}
            />

            <div className="relative grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
                    <span className="badge bg-accent-bg text-accent-bright">Desarrollo web</span>
                    <h2 className="text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
                        ¿Quieres un <em className="text-accent not-italic">desarrollo</em> para tu proyecto?
                    </h2>
                    <p className="max-w-md text-sm text-text-muted">
                        Soy Diego, desarrollador full-stack. Detrás del Crit hay una plataforma completa:
                        inscripciones, puntuación, clasificación en tiempo real, panel de administración
                        e identidad visual propia — Contactame y Hagamos algo
                        así para tu idea.
                    </p>

                    <ul className="grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
                        {highlights.map((item) => (
                            <li
                                key={item.title}
                                className="card flex items-start gap-3 p-4 text-left"
                            >
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-dim text-green">
                                    <CheckIcon className="h-3 w-3" />
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                                    <p className="text-xs text-text-muted">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
                        <a
                            href="https://wa.me/573184144278?text=Hola%20Diego%2C%20vi%20tu%20web%20del%20Crit%20y%20me%20gustar%C3%ADa%20hablar%20de%20un%20desarrollo%20para%20mi%20proyecto."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-2xl bg-cta px-8 py-3 font-semibold text-cta-ink transition-all duration-500 hover:opacity-90"
                        >
                            <WhatsAppIcon className="h-5 w-5" />
                            Escríbeme por WhatsApp
                        </a>
                        <a
                            href="https://github.com/DiegoGp227"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-semibold text-text-secondary transition-opacity hover:opacity-80"
                        >
                            <GitHubIcon className="h-4 w-4" />
                            github.com/DiegoGp227
                        </a>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="card overflow-hidden rounded-3xl border border-border">
                        <div className="flex items-center gap-2 border-b border-border bg-surface px-5 py-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                            <span className="h-2.5 w-2.5 rounded-full bg-amber" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green" />
                            <span className="ml-3 text-xs text-text-muted">crit-virgilio.app</span>
                        </div>
                        <div className="flex flex-col gap-3 p-6 font-mono text-sm">
                            <p className="text-text-muted">
                                <span className="text-green">$</span> quien construyó el crit?
                            </p>
                            <p className="text-text-primary">
                                Diego Gongora (@DiegoGp227), full-stack, de principio a fin.
                            </p>
                            <p className="text-text-muted">
                                <span className="text-green">$</span> stack
                            </p>
                            <p className="text-text-primary">
                                {stack.map((tech, i) => (
                                    <span key={tech}>
                                        <span className="text-accent-bright">{tech}</span>
                                        {i < stack.length - 1 && <span className="text-text-dim"> · </span>}
                                    </span>
                                ))}
                            </p>
                            <p className="text-text-muted">
                                <span className="text-green">$</span> ¿quieres un desarrollo así?
                            </p>
                            <p className="text-text-primary">
                                <span className="text-green">true</span> — hablemos por{" "}
                                <a
                                    href="https://wa.me/573184144278?text=Hola%20Diego%2C%20vi%20tu%20web%20del%20Crit%20y%20me%20gustar%C3%ADa%20hablar%20de%20un%20desarrollo%20para%20mi%20proyecto."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-accent-bright underline-offset-2 hover:underline"
                                >
                                    WhatsApp
                                </a>
                                .
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 lg:justify-end">
                        {stack.map((tech) => (
                            <span
                                key={tech}
                                className="badge bg-surface-raised text-text-muted"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}