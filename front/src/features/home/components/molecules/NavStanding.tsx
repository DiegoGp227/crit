export default function NavStanding() {
    return (
        <div className="flex flex-col gap-5">
            <nav className="w-full flex items-center justify-center">
                <ul className="inline-flex gap-5 justify-center bg-surface-raised w-auto rounded-2xl">
                    <li className="px-10 py-3 bg-text-secondary text-black font-bold rounded-2xl cursor-pointer">Expertos</li>
                    <li className="px-10 py-3 text-text-muted font-bold rounded-2xl transition-all duration-500 hover:text-text-primary hover:bg-surface cursor-pointer">Intermedios</li>
                    <li className="px-10 py-3 text-text-muted font-bold rounded-2xl transition-all duration-500 hover:text-text-primary hover:bg-surface cursor-pointer">Novatos</li>
                    <li className="px-10 py-3 text-text-muted font-bold rounded-2xl transition-all duration-500 hover:text-text-primary hover:bg-surface cursor-pointer">Ruteros</li>
                    <li className="px-10 py-3 text-text-muted font-bold rounded-2xl transition-all duration-500 hover:text-text-primary hover:bg-surface cursor-pointer">Femenino</li>
                    <li className="px-10 py-3 text-text-muted font-bold rounded-2xl transition-all duration-500 hover:text-text-primary hover:bg-surface cursor-pointer">Clubs</li>
                </ul>
            </nav>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <h2 className="font-bold text-2xl text-text-primary">General - Crit Virgilio</h2>
                    <div className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-border-yellow bg-bg-yellow-tint px-2.5 py-0.5 text-xs font-medium text-text-secondary">
                        <span aria-hidden="true" className="text-sm">⚡</span>
                        <span>En Curso</span>
                    </div>
                </div>
                <div>
                    <div className="bg-surface flex gap-2 rounded-2xl">
                        <button className="bg-surface-raised py-2 px-5 rounded-2xl font-bold">General</button>
                        <button className="py-2 px-5 rounded-2xl transition-all duration-500 hover:text-text-primary font-bold">Por Etapa</button>
                    </div>
                </div>
            </div>
        </div>
    )
}