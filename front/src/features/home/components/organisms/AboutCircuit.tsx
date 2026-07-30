import Image from "next/image";

export default function AboutCircuit() {
    return (
        <section className="w-full h-170 flex justify-center items-center gap-5 ">
            <div className="flex">
                <div className="flex items-start flex-col w-[55%] gap-5">
                    <div>
                        <p>El circuito</p>
                        <h2 className="font-bold text-4xl text-text-primary">Virgilio Barco</h2>
                        <p>Av. Calle 53 · Bogotá</p>
                    </div>
                    <div className="flex flex-wrap w-200 items-center gap-3">
                        <div className="w-67.5  bg-surface-raised rounded-2xl p-3"><p className="text-text-muted">Longitud: <span className="text-text-primary font-bold">1.5 km</span></p></div>
                        <div className="w-67.5  bg-surface-raised rounded-2xl p-3"><p className="text-text-muted">Vueltas: <span className="text-text-primary font-bold">10</span></p></div>
                        <div className="w-67.5  bg-surface-raised rounded-2xl p-3"><p className="text-text-muted">Superficie: <span className="text-text-primary font-bold">Asfalto</span></p></div>
                        <div className="w-67.5  bg-surface-raised rounded-2xl p-3"><p className="text-text-muted">Tráfico: <span className="text-text-primary font-bold">Sin tráfico</span></p></div>
                    </div>
                    <div className="flex gap-2">
                        <div className="bg-surface-raised px-4 py-1 rounded-2xl"><p>Rectas rápidas</p></div>
                        <div className="bg-surface-raised px-4 py-1 rounded-2xl"><p>Curva técnica</p></div>
                        <div className="bg-surface-raised px-4 py-1 rounded-2xl"><p>Zona de sprint</p></div>
                    </div>
                </div>
                <div className="flex items-center justify-center flex-col w-[55%]">
                    <Image
                        src="/brand/Circuito2.png"
                        alt="CritVirgilium logo"
                        width={623}
                        height={500}
                        style={{ height: "500px", width: "auto" }}
                    />
                </div>
            </div>
        </section>
    )
}