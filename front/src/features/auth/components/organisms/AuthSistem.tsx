"use client";

import { useState } from "react";
import Image from "next/image";
import LoginForm from "../../forms/LoginForm";
import RegisterForm from "../../forms/RegisterForm";

type Mode = "login" | "register";

export default function AuthSistem() {
    const [mode, setMode] = useState<Mode>("login");

    return (
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

                <div className="flex gap-1 rounded-2xl bg-surface p-1">
                    <button
                        type="button"
                        onClick={() => setMode("login")}
                        className={`flex-1 cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                            mode === "login"
                                ? "bg-surface-raised text-text-primary"
                                : "text-text-muted hover:text-text-primary"
                        }`}
                    >
                        Iniciar sesión
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("register")}
                        className={`flex-1 cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                            mode === "register"
                                ? "bg-surface-raised text-text-primary"
                                : "text-text-muted hover:text-text-primary"
                        }`}
                    >
                        Registrarse
                    </button>
                </div>

                {mode === "login" ? (
                    <>
                        <h1 className="mt-8 text-4xl font-bold text-text-primary">Bienvenido de vuelta</h1>
                        <p className="mt-2 text-sm text-text-muted">
                            Inicia sesión para ver tu perfil, resultados y clasificación.
                        </p>
                        <LoginForm />
                    </>
                ) : (
                    <>
                        <h1 className="mt-8 text-4xl font-bold text-text-primary">Crea tu cuenta</h1>
                        <p className="mt-2 text-sm text-text-muted">
                            Regístrate para competir, ver resultados y escalar en la clasificación.
                        </p>
                        <RegisterForm />
                    </>
                )}

                <p className="mt-8 text-center text-sm text-text-muted">
                    {mode === "login" ? (
                        <>
                            ¿No tienes cuenta?{" "}
                            <button
                                type="button"
                                onClick={() => setMode("register")}
                                className="cursor-pointer font-semibold text-text-secondary transition-opacity hover:opacity-80"
                            >
                                Regístrate
                            </button>
                        </>
                    ) : (
                        <>
                            ¿Ya tienes cuenta?{" "}
                            <button
                                type="button"
                                onClick={() => setMode("login")}
                                className="cursor-pointer font-semibold text-text-secondary transition-opacity hover:opacity-80"
                            >
                                Inicia sesión
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
