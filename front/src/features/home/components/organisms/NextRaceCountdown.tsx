export default function NextRaceCountdown() {
    return (
        <section className="w-full h-170 flex flex-col justify-center items-center gap-5 relative overflow-hidden">
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
            <div>
                <h2 className="text-3xl font-bold">Próximo crit</h2>
            </div>
            <div className="flex items-center gap-0">
                <div className="flex flex-col items-center">
                    <span className="text-[10rem] font-bold leading-none text-text-primary">02</span>
                    <span className="text-xs tracking-widest text-text-secondary uppercase font-semibold -mt-2">Días</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-text-secondary animate-pulse mx-6 -mt-10" />
                <div className="flex flex-col items-center">
                    <span className="text-[10rem] font-bold leading-none text-text-primary">07</span>
                    <span className="text-xs tracking-widest text-text-secondary uppercase font-semibold -mt-2">Horas</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-text-secondary animate-pulse mx-6 -mt-10" />
                <div className="flex flex-col items-center">
                    <span className="text-[10rem] font-bold leading-none text-text-primary">32</span>
                    <span className="text-xs tracking-widest text-text-secondary uppercase font-semibold -mt-2">Minutos</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-text-secondary animate-pulse mx-6 -mt-10" />
                <div className="flex flex-col items-center">
                    <span className="text-[10rem] font-bold leading-none text-text-primary">24</span>
                    <span className="text-xs tracking-widest text-text-secondary uppercase font-semibold -mt-2">Segundos</span>
                </div>
            </div>
            <div className="mt-4">
                <button className="rounded bg-text-secondary cursor-pointer px-6 py-3 text-black font-semibold">Registrarse</button>
            </div>
        </section>
    )
}