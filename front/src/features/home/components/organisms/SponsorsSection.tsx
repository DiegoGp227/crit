import Image from "next/image";
import Section from "@/src/shared/components/ui/Section";

interface Sponsor {
    name: string;
    logo?: string;
    gold: boolean;
}

const sponsors: Sponsor[] = [
    { name: "Specialized", logo: "/brand/sponsors/Specialized_wordmark.svg", gold: true },
    { name: "SRAM", logo: "/brand/sponsors/SRAM_logo.svg", gold: true },
    { name: "Roval", gold: false },
    { name: "Gatorade", logo: "/brand/sponsors/Gatorade_logo.svg", gold: false },
    { name: "IDRD", gold: false },
    { name: "Shimano", logo: "/brand/sponsors/Shimano.svg", gold: false },
];

export default function SponsorsSection() {
    return (
        <Section className="text-center">
            <div>
                <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[2px] text-text-muted">
                    Patrocinadores
                </p>
                <h2 className="text-3xl font-bold text-text-primary">
                    Aliados que hacen <em className="text-text-secondary not-italic">posible</em> el Crit
                </h2>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-10">
                {sponsors.map((sponsor) => (
                    <div
                        key={sponsor.name}
                        className={`group flex min-w-[140px] flex-col items-center gap-3 rounded-2xl p-7 px-8 transition-all duration-300 hover:bg-surface-raised ${
                            sponsor.gold ? "min-w-[160px]" : ""
                        }`}
                    >
                        <div
                            className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-raised transition-all duration-300 group-hover:border-border-yellow ${
                                sponsor.gold ? "h-[88px] w-[88px]" : "h-[72px] w-[72px]"
                            }`}
                        >
                            {sponsor.logo ? (
                                <Image
                                    src={sponsor.logo}
                                    alt={`Logo de ${sponsor.name}`}
                                    fill
                                    sizes="88px"
                                    className="object-contain p-3 brightness-0 invert transition-all duration-300 group-hover:brightness-100 group-hover:invert-0"
                                />
                            ) : (
                                <span className="px-2 text-center text-xs font-extrabold uppercase tracking-widest text-text-primary">
                                    {sponsor.name}
                                </span>
                            )}
                        </div>
                        <span
                            className={`text-sm font-semibold ${
                                sponsor.gold ? "text-text-primary" : "text-text-muted group-hover:text-text-primary"
                            }`}
                        >
                            {sponsor.name}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-12 border-t border-border pt-8">
                <p className="text-sm text-text-muted">
                    ¿Tu marca quiere ser parte?{" "}
                    <a href="#" className="font-semibold text-text-secondary transition-opacity hover:opacity-80">
                        Contáctanos
                    </a>
                </p>
            </div>
        </Section>
    )
}
