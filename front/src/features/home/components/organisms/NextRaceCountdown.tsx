"use client";

import { Fragment } from "react";
import Link from "next/link";
import Section from "@/src/shared/components/ui/Section";
import Button from "@/src/shared/components/ui/Button";
import { useCountdown, pad } from "@/src/shared/hooks/useCountdown";

export default function NextRaceCountdown() {
    const { days, hours, minutes, seconds } = useCountdown();

    const cells = [
        { label: "Días", value: pad(days) },
        { label: "Horas", value: pad(hours) },
        { label: "Minutos", value: pad(minutes) },
        { label: "Segundos", value: pad(seconds) },
    ];

    return (
        <Section className="relative overflow-hidden">
            <div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: 1100,
                    height: 400,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'radial-gradient(ellipse, rgba(254, 243, 0, 0.1), transparent 60%)',
                }}
            />
            <div className="relative flex flex-col items-center gap-5">
                <div>
                    <h2 className="text-3xl font-bold sm:text-4xl">Próximo crit</h2>
                </div>
                <div className="flex items-center justify-center gap-0">
                    {cells.map((cell, index) => (
                        <Fragment key={cell.label}>
                            {index > 0 && (
                                <span className="w-2.5 h-2.5 shrink-0 rounded-full bg-cta animate-pulse mx-2 -mt-1 sm:mx-4 md:mx-6" />
                            )}
                            <div className="flex flex-col items-center">
                                <span className="text-countdown font-bold leading-none text-text-primary tabular-nums">
                                    {cell.value}
                                </span>
                                <span className="text-xs tracking-widest text-text-secondary uppercase font-semibold -mt-2">
                                    {cell.label}
                                </span>
                            </div>
                        </Fragment>
                    ))}
                </div>
                <div className="mt-4">
                    <Link href="/auth">
                        <Button>Registrarse</Button>
                    </Link>
                </div>
            </div>
        </Section>
    )
}