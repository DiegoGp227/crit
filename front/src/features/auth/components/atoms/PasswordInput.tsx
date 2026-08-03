import { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export default function PasswordInput({
    field,
    autoComplete,
    placeholder,
}: {
    field: UseFormRegisterReturn;
    autoComplete: string;
    placeholder?: string;
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                Contraseña
            </span>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-dim outline-none transition-colors focus:border-border-yellow"
                    {...field}
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
    );
}
