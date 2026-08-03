"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import Button from "@/src/shared/components/ui/Button";

const inputClasses =
    "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-dim outline-none transition-colors focus:border-border-yellow";

export default function AuthCard() {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

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
                <p className="relative max-w-sm text-sm text-text-muted">
                    La comunidad de critériums del Virgilio Barco en Bogotá. Corre, compite y hazte un nombre en las
                    tablas.
                </p>
                <span className="badge relative border border-border-yellow bg-bg-yellow-tint text-text-secondary">
                    <span aria-hidden="true">⚡</span>
                    <span>Próximo crit en 02 días</span>
                </span>
            </div>

            <div className="flex min-h-screen items-center justify-center px-6 py-20">
                <div className="w-full max-w-100">
                    <div className="mb-8 lg:hidden">
                        <Image
                            src="/brand/CritVirgilium.png"
                            alt="Crit Virgilio"
                            width={623}
                            height={390}
                            className="h-10 w-auto"
                            priority
                        />
                    </div>

                    <h1 className="text-3xl font-bold text-text-primary">Bienvenido de vuelta</h1>
                    <p className="mt-2 text-sm text-text-muted">
                        Inicia sesión para ver tu perfil, resultados y clasificación.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
                        <label className="flex flex-col gap-2">
                            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                                Correo o usuario
                            </span>
                            <input
                                type="text"
                                name="email"
                                autoComplete="username"
                                placeholder="ej. diego@critvirgilio.co"
                                className={inputClasses}
                            />
                        </label>

                        <label className="flex flex-col gap-2">
                            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                                Contraseña
                            </span>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className={inputClasses}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-xs font-semibold text-text-muted transition-colors hover:text-text"
                                >
                                    {showPassword ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                        </label>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex cursor-pointer items-center gap-2 text-text-muted">
                                <input type="checkbox" defaultChecked className="h-4 w-4 accent-cta" />
                                Recuérdame
                            </label>
                            <a
                                href="#"
                                className="font-medium text-text-secondary transition-opacity hover:opacity-80"
                            >
                                Olvidé mi contraseña
                            </a>
                        </div>

                        <Button type="submit" className="mt-2 w-full">
                            Entrar
                        </Button>
                    </form>

                    <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-text-dim">
                        <span className="h-px flex-1 bg-border" aria-hidden />
                        o continúa con
                        <span className="h-px flex-1 bg-border" aria-hidden />
                    </div>

                    <Button type="button" variant="surface" className="w-full">
                        <span className="font-bold">
                            <span className="text-[#4285F4]">G</span>
                            <span className="text-[#EA4335]">o</span>
                            <span className="text-[#FBBC05]">o</span>
                            <span className="text-[#34A853]">g</span>
                            <span className="text-[#4285F4]">l</span>
                            <span className="text-[#EA4335]">e</span>
                        </span>
                        Continuar con Google
                    </Button>

                    <p className="mt-8 text-center text-sm text-text-muted">
                        ¿No tienes cuenta?{" "}
                        <a href="#" className="font-semibold text-text-secondary transition-opacity hover:opacity-80">
                            Regístrate
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
