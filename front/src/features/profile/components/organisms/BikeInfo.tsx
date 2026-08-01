import Image from "next/image";
import Section from "@/src/shared/components/ui/Section";

const specs = [
    { label: "Marco", value: "Ontrail" },
    { label: "Relación", value: "52*17" },
    { label: "Peso", value: "9.7 kg" },
    { label: "Talla", value: "L" },
];

export default function BikeInfo() {
    return (
        <Section>
            <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
                <div className="card relative aspect-4/3 overflow-hidden">
                    <Image
                        src="/photos/bike.jpeg"
                        alt="La bicicleta"
                        fill
                        className="object-cover"
                        sizes="50vw"
                        priority
                    />
                </div>
                <div className="flex flex-col gap-6">
                    <p className="text-xs uppercase tracking-widest text-text-muted">La Bicicleta</p>
                    <h2 className="text-2xl font-bold text-text-primary">Mi Bbncita</h2>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {specs.map((spec) => (
                            <div key={spec.label} className="card p-3">
                                <p className="text-xs uppercase tracking-widest text-text-muted">{spec.label}</p>
                                <p className="font-bold text-text-primary">{spec.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    )
}
