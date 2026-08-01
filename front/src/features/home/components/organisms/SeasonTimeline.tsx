import Section from "@/src/shared/components/ui/Section";
import { cn } from "@/src/shared/utils/cn";

type EventType = "race" | "training" | "finale";

interface SeasonEvent {
    type: EventType;
    name: string;
    icon: string;
}

interface SeasonMonth {
    name: string;
    past?: boolean;
    current?: boolean;
    event?: SeasonEvent;
}

const months: SeasonMonth[] = [
    { name: "Ene" },
    { name: "Feb", past: true, event: { type: "training", name: "Fondo", icon: "🚴" } },
    { name: "Mar", past: true, event: { type: "race", name: "Crit #10", icon: "🏁" } },
    { name: "Abr", past: true, event: { type: "training", name: "Sprint", icon: "🚴" } },
    { name: "May", past: true, event: { type: "race", name: "Crit #12", icon: "🏁" } },
    { name: "Jun", past: true, event: { type: "training", name: "Técnica", icon: "🚴" } },
    { name: "Jul", current: true, event: { type: "race", name: "Crit #19", icon: "🏁" } },
    { name: "Ago", event: { type: "training", name: "Fuerza", icon: "🚴" } },
    { name: "Sep", event: { type: "race", name: "Crit #21", icon: "🏁" } },
    { name: "Oct", event: { type: "training", name: "Cadencia", icon: "🚴" } },
    { name: "Nov", event: { type: "race", name: "Crit #24", icon: "🏁" } },
    { name: "Dic", event: { type: "finale", name: "Gran Final", icon: "🏆" } },
];

export default function SeasonTimeline() {
    return (
        <Section>
            <div className="mb-12">
                <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[2px] text-text-muted">
                    Temporada 2026
                </p>
                <h2 className="text-3xl font-bold text-text-primary">El viaje</h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted">
                    Cinco carreras, cinco entrenamientos y una Gran Final que lo decide todo.
                </p>
            </div>

            <div className="relative">
                <div
                    className="pointer-events-none absolute inset-x-0 top-1/2 h-72 -translate-y-1/2 rounded-full"
                    style={{
                        background: "radial-gradient(ellipse, rgba(254, 243, 0, 0.06), transparent 65%)",
                    }}
                />

                <div className="relative overflow-x-auto px-5 pb-4">
                    <div className="flex items-start">
                        {months.map((month) => {
                            const event = month.event;
                            return (
                                <div
                                    key={month.name}
                                    className="flex min-w-[80px] flex-1 flex-col items-center transition-transform duration-300 hover:-translate-y-1"
                                >
                                    <div className="flex h-18 w-full flex-col items-center justify-end">
                                        {month.current && (
                                            <span className="badge mb-1.5 border-border-yellow bg-bg-yellow-tint text-text-secondary">
                                                Próximo
                                            </span>
                                        )}
                                        {event && (
                                            <div
                                                className={cn(
                                                    "flex h-10 w-10 items-center justify-center rounded-2xl border text-lg",
                                                    event.type === "finale"
                                                        ? "border-gold/40 bg-bg-yellow-tint shadow-[0_0_24px_rgba(254,243,0,0.12)]"
                                                        : event.type === "race"
                                                          ? month.current
                                                              ? "border-border-yellow bg-bg-yellow-tint"
                                                              : month.past
                                                                ? "border-border bg-surface opacity-70 grayscale"
                                                                : "border-border bg-surface-raised"
                                                          : cn(
                                                                "border-dashed border-border bg-surface",
                                                                month.past && "opacity-70"
                                                            )
                                                )}
                                            >
                                                {event.icon}
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative mt-3 h-3.5 w-full">
                                        <div className="absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 bg-border-hover" />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                            {month.current && (
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cta opacity-50" />
                                            )}
                                            <span
                                                className={cn(
                                                    "block rounded-full border-2 border-bg",
                                                    month.current
                                                        ? "relative h-3.5 w-3.5 bg-cta shadow-[0_0_16px_rgba(254,243,0,0.5)]"
                                                        : event?.type === "finale"
                                                          ? "h-3.5 w-3.5 bg-gold ring-4 ring-gold/15"
                                                          : event?.type === "race"
                                                            ? month.past
                                                                ? "h-3 w-3 bg-green"
                                                                : "h-3 w-3 bg-border-hover"
                                                            : event?.type === "training"
                                                              ? "h-2.5 w-2.5 bg-text-dim"
                                                              : "h-2.5 w-2.5 bg-border-hover"
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <span
                                        className={cn(
                                            "mt-2 text-[0.7rem] uppercase tracking-wide",
                                            event ? "font-semibold text-text-primary" : "font-medium text-text-muted"
                                        )}
                                    >
                                        {month.name}
                                    </span>
                                    {event && (
                                        <span
                                            className={cn(
                                                "mt-1 max-w-[70px] text-center text-[0.62rem] font-semibold uppercase tracking-wider",
                                                event.type === "finale"
                                                    ? "text-text-secondary"
                                                    : month.current
                                                      ? "text-text-primary"
                                                      : "text-text-dim"
                                            )}
                                        >
                                            {event.name}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
                <span className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="h-2.5 w-2.5 rounded-full bg-green" />
                    Carrera
                </span>
                <span className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="h-2.5 w-2.5 rounded-full bg-text-dim" />
                    Entrenamiento
                </span>
                <span className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="h-2.5 w-2.5 rounded-full bg-cta" />
                    Próximo
                </span>
                <span className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="h-2.5 w-2.5 rounded-full bg-gold ring-4 ring-gold/15" />
                    Gran Final
                </span>
            </div>
        </Section>
    );
}
