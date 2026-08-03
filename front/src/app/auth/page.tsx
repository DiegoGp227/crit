import AuthSistem from "@/src/features/auth/components/organisms/AuthSistem";
import Image from "next/image";

export default function AuthPage() {
    return (
        <div className="grid w-full min-h-screen lg:grid-cols-[1fr_1.2fr]">
            <div className="relative hidden flex-col items-center justify-center gap-8 overflow-hidden px-12 text-center lg:flex">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 30%, rgba(254, 243, 0, 0.06), transparent 60%)',
                    }}
                />
                <Image
                    src="/brand/CritVirgilium.png"
                    alt="Crit Virgilio"
                    width={623}
                    height={390}
                    className="relative h-24 w-auto"
                    priority
                />
                <div className="flex flex-col items-center text-center">
                    <p className="text-xl font-bold sm:text-2xl">&ldquo;Hecho por nosotros y para nosostros&rdquo;</p>
                    <p className="text-xl font-bold sm:text-2xl">Virgilio Barco · Bogotá</p>
                </div>
                <Image
                    src="/brand/By.png"
                    alt="CritVirgilium logo"
                    width={623}
                    height={30}
                    style={{ height: "30px", width: "auto" }}
                />
            </div>

            <AuthSistem />
        </div>
    );
}
