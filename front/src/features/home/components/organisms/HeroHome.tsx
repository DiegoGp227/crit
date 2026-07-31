import Image from "next/image";
import Section from "@/src/shared/components/ui/Section";

export default function HeroHome() {
    return (
        <Section container={false} className="py-0">
            <div className="grid w-full min-h-screen grid-cols-1 lg:grid-cols-2">
                <div className="flex flex-col justify-center items-center gap-10 px-6 py-20">
                    <Image
                        src="/brand/CritVirgilium.png"
                        alt="CritVirgilium logo"
                        width={623}
                        height={390}
                        style={{ height: "300px", width: "auto" }}
                    />
                    <div className="flex flex-col items-center text-center">
                        <p className="font-bold text-2xl">&ldquo;Hecho por nosotros y para nosostros&rdquo;</p>
                        <p className="font-bold text-2xl">Virgilio Barco · Bogotá</p>
                    </div>
                    <Image
                        src="/brand/By.png"
                        alt="CritVirgilium logo"
                        width={250}
                        height={70}
                        style={{ height: "70px", width: "auto" }}
                    />
                </div>
                <div className="relative min-h-[60vh] overflow-hidden lg:min-h-0">
                    <Image
                        src="/photos/grupo.jpg"
                        alt="Grupo"
                        fill
                        className="object-cover"
                        sizes="50vw"
                        priority
                    />
                </div>
            </div>
        </Section>
    )
}
