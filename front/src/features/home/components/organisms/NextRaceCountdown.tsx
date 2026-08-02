import Section from "@/src/shared/components/ui/Section";
import Button from "@/src/shared/components/ui/Button";

export default function NextRaceCountdown() {
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
                    <h2 className="text-3xl font-bold">Próximo crit</h2>
                </div>
                <div className="flex items-center justify-center gap-0">
                    <div className="flex flex-col items-center">
                        <span className="text-[clamp(2.5rem,12.5vw,10rem)] font-bold leading-none text-text-primary">02</span>
                        <span className="text-xs tracking-widest text-text-secondary uppercase font-semibold -mt-2">Días</span>
                    </div>
                    <span className="w-2.5 h-2.5 shrink-0 rounded-full bg-cta animate-pulse mx-2 -mt-1 sm:mx-4 md:mx-6" />
                    <div className="flex flex-col items-center">
                        <span className="text-[clamp(2.5rem,12.5vw,10rem)] font-bold leading-none text-text-primary">07</span>
                        <span className="text-xs tracking-widest text-text-secondary uppercase font-semibold -mt-2">Horas</span>
                    </div>
                    <span className="w-2.5 h-2.5 shrink-0 rounded-full bg-cta animate-pulse mx-2 -mt-1 sm:mx-4 md:mx-6" />
                    <div className="flex flex-col items-center">
                        <span className="text-[clamp(2.5rem,12.5vw,10rem)] font-bold leading-none text-text-primary">32</span>
                        <span className="text-xs tracking-widest text-text-secondary uppercase font-semibold -mt-2">Minutos</span>
                    </div>
                    <span className="w-2.5 h-2.5 shrink-0 rounded-full bg-cta animate-pulse mx-2 -mt-1 sm:mx-4 md:mx-6" />
                    <div className="flex flex-col items-center">
                        <span className="text-[clamp(2.5rem,12.5vw,10rem)] font-bold leading-none text-text-primary">24</span>
                        <span className="text-xs tracking-widest text-text-secondary uppercase font-semibold -mt-2">Segundos</span>
                    </div>
                </div>
                <div className="mt-4">
                    <Button>Registrarse</Button>
                </div>
            </div>
        </Section>
    )
}
