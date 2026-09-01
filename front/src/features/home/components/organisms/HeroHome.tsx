import Image from "next/image";
import Section from "@/src/shared/components/ui/Section";
import HeroCarousel from "./HeroCarousel";

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
                        className="h-24 w-auto sm:h-32 md:h-40 lg:h-75"
                    />
                    <div className="flex flex-col items-center text-center">
                        <p className="text-xl font-bold sm:text-2xl">&ldquo;Hecho por nosotros y para nosostros&rdquo;</p>
                        <p className="text-xl font-bold sm:text-2xl">Virgilio Barco · Bogotá</p>
                    </div>
                    <Image
                        src="/brand/By.png"
                        alt="Crit Virgilio"
                        width={623}
                        height={198}
                        className="h-60 w-auto sm:h-72 md:h-84 lg:h-96"
                    />
                </div>
                <HeroCarousel />
            </div>
        </Section>
    )
}
