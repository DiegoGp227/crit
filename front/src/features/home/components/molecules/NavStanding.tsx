"use client";

import { useState } from "react";
import Button from "@/src/shared/components/ui/Button";

const categories = ["Expertos", "Intermedios", "Novatos", "Ruteros", "Femenino", "Clubs"];

const races = [
    "Crit #19 — 18 Jul 2026",
    "Crit #18 — 05 Jul 2026",
    "Crit #17 — 21 Jun 2026",
    "Crit #16 — 14 Jun 2026",
];

type View = "general" | "etapa";

export default function NavStanding() {
    const [category, setCategory] = useState(categories[0]);
    const [view, setView] = useState<View>("general");
    const [race, setRace] = useState(races[0]);

    return (
        <div className="flex w-full flex-col gap-5">
            <nav className="flex w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <ul className="mx-auto inline-flex w-max items-center gap-2 rounded-2xl bg-surface-raised p-2 sm:w-auto sm:gap-5">
                    {categories.map((c) => (
                        <li key={c}>
                            <Button
                                size="lg"
                                variant={category === c ? "primary" : "ghost"}
                                onClick={() => setCategory(c)}
                                aria-pressed={category === c}
                            >
                                {c}
                            </Button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <h2 className="font-bold text-2xl text-text-primary">General - Crit Virgilio</h2>
                    <span className="badge border border-border-yellow bg-bg-yellow-tint text-text-secondary">
                        <span aria-hidden="true" className="text-sm">⚡</span>
                        <span>En Curso</span>
                    </span>
                </div>
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-surface">
                        <Button
                            variant={view === "general" ? "surface" : "ghost"}
                            size="sm"
                            onClick={() => setView("general")}
                            aria-pressed={view === "general"}
                        >
                            General
                        </Button>
                        <Button
                            variant={view === "etapa" ? "surface" : "ghost"}
                            size="sm"
                            onClick={() => setView("etapa")}
                            aria-pressed={view === "etapa"}
                        >
                            Por Etapa
                        </Button>
                    </div>
                    <select
                        value={race}
                        onChange={(e) => setRace(e.target.value)}
                        aria-label="Seleccionar carrera"
                        className="min-w-0 max-w-full cursor-pointer rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-text transition-colors hover:border-border-hover focus:border-border-yellow focus:outline-none"
                    >
                        {races.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}
