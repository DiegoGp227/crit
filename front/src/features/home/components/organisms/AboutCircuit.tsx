import Image from "next/image";
import Section from "@/src/shared/components/ui/Section";

export default function AboutCircuit() {
    const stats = [
        { label: "Longitud", value: "1.5 km" },
        { label: "Vueltas", value: "10" },
        { label: "Superficie", value: "Asfalto" },
        { label: "Tráfico", value: "Sin tráfico" },
    ];

    return (
        <Section>
            <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
                <div className="flex flex-col gap-8">
                    <div>
                        <p className="text-xs uppercase tracking-widest text-text-muted">El circuito</p>
                        <h2 className="font-bold text-3xl text-text-primary sm:text-4xl">Virgilio Barco</h2>
                        <p className="mt-1 text-sm text-text-muted">Av. Calle 53 · Bogotá</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {stats.map((stat) => (
                            <div key={stat.label} className="card p-3">
                                <p className="text-sm text-text-muted">
                                    {stat.label}: <span className="font-bold text-text-primary">{stat.value}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <div className="card px-4 py-1 text-sm">Rectas rápidas</div>
                        <div className="card px-4 py-1 text-sm">Curva técnica</div>
                        <div className="card px-4 py-1 text-sm">Zona de sprint</div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <Image
                        src="/brand/Circuito2.png"
                        alt="Virgilio Barco"
                        width={623}
                        height={500}
                        className="h-auto w-full max-w-[560px]"
                    />
                </div>
            </div>
        </Section>
    )
}
