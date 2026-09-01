import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "@/src/shared/components/ui/Button";
import PasswordInput from "../components/atoms/PasswordInput";
import { useRegister } from "../hooks/useRegister";
import { parseAuthError } from "@/src/shared/utils/parseAuthError";

interface RegisterFormValues {
    email: string;
    password: string;
}

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>();

    const { register: registerUser, isRegistering, error } = useRegister();

    const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
        registerUser(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
            <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                    Correo
                </span>
                <input
                    type="email"
                    autoComplete="email"
                    placeholder="ej. user@critvirgilio.co"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-dim outline-none transition-colors focus:border-border-yellow"
                    {...register("email", { required: "El correo es obligatorio" })}
                />
                {errors.email && (
                    <span className="text-xs text-red-500">{errors.email.message}</span>
                )}
            </label>

            <PasswordInput
                field={register("password")}
                autoComplete="new-password"
                placeholder="Mínimo 8 caracteres"
            />
            {errors.password && (
                <span className="text-xs text-red-500">{errors.password.message}</span>
            )}

            {error && <span className="text-sm text-red-500">{parseAuthError(error)}</span>}

            <Button type="submit" className="mt-2 w-full" disabled={isRegistering}>
                {isRegistering ? "Creando cuenta..." : "Crear cuenta"}
            </Button>
        </form>
    );
}
