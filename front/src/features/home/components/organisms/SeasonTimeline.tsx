import Section from "@/src/shared/components/ui/Section";
import { cn } from "@/src/shared/utils/cn";

type EventType = "race" | "finale";

interface SeasonRace {
    type: EventType;
    date: string;
    name: string;
    icon: string;
}

const races: SeasonRace[] = [
    { type: "race", date: "04 Sep", name: "Crit #1", icon: "🏁" },
    { type: "race", date: "11 Sep", name: "Crit #2", icon: "🏁" },
    { type: "race", date: "18 Sep", name: "Crit #3", icon: "🏁" },
    { type: "race", date: "25 Sep", name: "Crit #4", icon: "🏁" },
    { type: "finale", date: "02 Oct", name: "Gran Final", icon: "🏆" },
];

export default function SeasonTimeline() {
    return (
        <Section className="relative overflow-hidden">
            <div
                className="pointer-events-none absolute inset-x-0 top-10 h-96 -translate-y-1/2 rounded-full"
                style={{
                    background: "radial-gradient(ellipse, rgba(254, 243, 0, 0.05), transparent 60%)",
                }}
            />

            <div className="relative mb-14 flex flex-col items-center gap-3 text-center">
                <span className="badge border-border-yellow bg-bg-yellow-tint text-text-secondary">
                    Temporada 2026
                </span>
                <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">Calendario</h2>
                <p className="max-w-md text-sm leading-relaxed text-text-muted">
                    Cinco carreras cada viernes, una Gran Final que lo decide todo.
                </p>
            </div>

            <div className="relative">
                <div className="relative overflow-x-auto px-5 pb-4">
                    <div className="flex items-start">
                        {races.map((race, index) => {
                            const isNext = index === 0;
                            const isFinale = race.type === "finale";
                            return (
                                <div
                                    key={race.date}
                                    className="group flex min-w-31 flex-1 flex-col items-center transition-transform duration-300 hover:-translate-y-1"
                                >
                                    <div
                                        className={cn(
                                            "relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border text-2xl transition-all duration-300",
                                            isFinale
                                                ? "border-gold/40 bg-linear-to-br from-bg-yellow-tint to-surface shadow-[0_0_28px_rgba(254,243,0,0.18)]"
                                                : isNext
                                                    ? "border-border-yellow bg-bg-yellow-tint shadow-[0_0_18px_rgba(254,243,0,0.12)]"
                                                    : "border-border bg-surface-raised group-hover:border-border-hover"
                                        )}
                                    >
                                        {race.icon}
                                        {isNext && (
                                            <span className="absolute -right-1 -top-1 flex h-3 w-3">
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cta opacity-60" />
                                                <span className="relative inline-flex h-3 w-3 rounded-full bg-cta" />
                                            </span>
                                        )}
                                    </div>

                                    <div className="relative mt-3 h-4 w-full">
                                        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-border-hover" />
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                            {isNext && (
                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cta opacity-50" />
                                            )}
                                            <span
                                                className={cn(
                                                    "block rounded-full border-2 border-bg",
                                                    isNext
                                                        ? "h-3.5 w-3.5 bg-cta shadow-[0_0_16px_rgba(254,243,0,0.5)]"
                                                        : isFinale
                                                            ? "h-3.5 w-3.5 bg-gold ring-4 ring-gold/15"
                                                            : "h-3 w-3 bg-border-hover group-hover:bg-cta/60"
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <div
                                        className={cn(
                                            "mt-3 w-full rounded-2xl border px-3 py-3 text-center transition-all duration-300",
                                            isFinale
                                                ? "border-gold/40 bg-linear-to-b from-bg-yellow-tint/80 to-surface shadow-[0_0_24px_rgba(254,243,0,0.10)]"
                                                : isNext
                                                    ? "border-border-yellow bg-surface-raised"
                                                    : "border-border bg-surface group-hover:border-border-hover"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "block text-2xs font-semibold uppercase tracking-widest",
                                                isFinale
                                                    ? "text-gold"
                                                    : isNext
                                                        ? "text-text-secondary"
                                                        : "text-text-dim"
                                            )}
                                        >
                                            {race.date}
                                        </span>
                                        <span
                                            className={cn(
                                                "mt-1 block text-sm font-bold",
                                                isFinale
                                                    ? "text-text-primary"
                                                    : isNext
                                                        ? "text-text-primary"
                                                        : "text-text-muted group-hover:text-text-secondary"
                                            )}
                                        >
                                            {race.name}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
                <span className="flex items-center gap-2 text-xs text-text-muted">
                    <span className="h-2.5 w-2.5 rounded-full bg-border-hover" />
                    Carrera
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