import Image from "next/image";
import Section from "@/src/shared/components/ui/Section";
import DualLogoSponsor from "../molecules/DualLogoSponsor";

interface Sponsor {
    name: string;
    logo?: string;
    logos?: string[];
    url: string;
    gold: boolean;
}

const sponsors: Sponsor[] = [
    { name: "Sumerian Cycling", logo: "/brand/sponsors/Sumerian4-09.png", url: "https://www.instagram.com/sumeriancycling/", gold: true },
    { name: "Bicicle Parking", logo: "/brand/sponsors/Bicilcle Parking.png", url: "https://www.instagram.com/bicycle_parking.r/", gold: true },
    { name: "The Bike Thender", logo: "/brand/sponsors/The Bike Thender_Mesa de trabajo 1.png", url: "https://www.instagram.com/thebikethender/", gold: true },
    {
        name: "Bogofija / BogoChicas",
        logos: ["/brand/sponsors/Logo Bogofija 2021.png", "/brand/sponsors/BogoChicas TM.png"],
        url: "https://www.instagram.com/bogofija/",
        gold: true,
    },
];

function InstagramIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
    );
}

export default function SponsorsSection() {
    return (
        <Section className="relative overflow-hidden text-center">
            <div
                className="pointer-events-none absolute rounded-full"
                style={{
                    width: 900,
                    height: 380,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "radial-gradient(ellipse, rgba(254, 243, 0, 0.06), transparent 60%)",
                }}
            />

            <div className="relative flex flex-col items-center">
                <div className="flex flex-col items-center gap-2">
                    <span className="badge bg-bg-yellow-tint text-text-secondary">Patrocinadores</span>
                    <h2 className="text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
                        Aliados que hacen <em className="text-text-secondary not-italic">posible</em> el Crit
                    </h2>
                </div>

                <div className="mt-14 flex w-full flex-wrap items-stretch justify-center gap-6 md:gap-8">
                    {sponsors.map((sponsor) =>
                        sponsor.logos ? (
                            <DualLogoSponsor
                                key={sponsor.name}
                                name={sponsor.name}
                                logos={sponsor.logos}
                                url={sponsor.url}
                            />
                        ) : (
                            <a
                                key={sponsor.name}
                                href={sponsor.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex min-w-55 flex-1 flex-col items-center gap-5 rounded-3xl border border-border bg-surface px-10 py-10 transition-all duration-300 hover:-translate-y-1 hover:border-border-yellow hover:bg-surface-raised hover:shadow-[0_24px_50px_-24px_rgba(254,243,0,0.3)] sm:max-w-[320px]"
                            >
                                <div className="relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-2xl bg-surface-raised transition-all duration-300 group-hover:bg-surface">
                                    {sponsor.logo ? (
                                        <Image
                                            src={sponsor.logo}
                                            alt={`Logo de ${sponsor.name}`}
                                            fill
                                            sizes="144px"
                                            className="object-contain p-4"
                                        />
                                    ) : (
                                        <span className="px-2 text-center text-lg font-extrabold uppercase tracking-widest text-text-primary">
                                            {sponsor.name}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col items-center gap-1.5">
                                    <span className="text-xl font-semibold text-text-primary">{sponsor.name}</span>
                                    <span className="flex items-center gap-1.5 text-xs font-medium text-text-muted transition-colors duration-300 group-hover:text-text-secondary">
                                        <InstagramIcon className="h-3.5 w-3.5" />
                                        Ver perfil
                                    </span>
                                </div>
                            </a>
                        )
                    )}
                </div>

                <div className="mt-16 w-full border-t border-border pt-8">
                    <p className="text-sm text-text-muted">
                        ¿Tu marca quiere ser parte?{" "}
                        <a href="#" className="font-semibold text-text-secondary transition-opacity hover:opacity-80">
                            Contáctanos
                        </a>
                    </p>
                </div>
            </div>
        </Section>
    )
}