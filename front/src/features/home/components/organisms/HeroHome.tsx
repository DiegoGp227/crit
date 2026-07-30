import Image from "next/image";

export default function HeroHome() {
    return (
        <section className="flex h-screen w-full">
            <div className="h-full w-[50%] flex flex-col justify-center items-center gap-10">
                <Image
                    src="/brand/CritVirgilium.png"
                    alt="CritVirgilium logo"
                    width={623}
                    height={390}
                    style={{ height: "300px", width: "auto" }}
                />
                <div className="flex justify-center items-centerDale flex-col">
                    <p className="font-bold text-2xl">"Hecho por nosotros y para nosostros"</p>
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
            <div className="relative h-full w-[50%] overflow-hidden">
                <Image
                    src="/photos/grupo.jpg"
                    alt="Grupo"
                    fill
                    className="object-cover"
                    sizes="50vw"
                    priority
                />
            </div>
        </section>
    )
}