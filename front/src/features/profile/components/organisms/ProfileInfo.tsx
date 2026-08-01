import Image from "next/image";
import Section from "@/src/shared/components/ui/Section";

const stats = [
    { label: "Ranking", value: "#1", highlight: true },
    { label: "Puntos", value: "2.034" },
    { label: "Carreras", value: "12" },
    { label: "Victorias", value: "1", highlight: true },
    { label: "Km", value: "18.8" },
];

export default function ProfileInfo() {
    return (
        <Section className="relative overflow-hidden">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at 60% 40%, rgba(254, 243, 0, 0.06), transparent 60%)',
                }}
            />
            <div className="relative grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[auto_1fr_auto] lg:justify-items-center">
                <div className="relative h-40 w-40 justify-self-center overflow-hidden rounded-full border-2 border-border-hover">
                    <Image
                        src="/photos/profile.jpeg"
                        alt="Foto del grupo"
                        fill
                        className="object-cover"
                        sizes="160px"
                        priority
                    />
                </div>

                <div className="flex flex-col items-center gap-3 lg:items-start lg:text-left">
                    <p className="text-3xl font-bold text-text-primary">Diego Gongora</p>
                    <div className="flex flex-wrap justify-center gap-4 text-text-muted lg:justify-start">
                        <p>Team Bogotá Elite</p>
                        <p>Categoria Intermedio</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 lg:justify-start">
                        {stats.map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center lg:items-start">
                                <p className="text-xs uppercase tracking-widest text-text-muted">{stat.label}</p>
                                <p className={stat.highlight ? "font-bold text-text-secondary" : "font-bold text-text-primary"}>
                                    {stat.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1 lg:border-l lg:border-border lg:pl-10">
                    <span className="text-8xl leading-none font-bold text-text-secondary">027</span>
                    <span className="text-xs uppercase tracking-widest text-text-muted">Dorsal</span>
                </div>
            </div>
        </Section>
    )
}
