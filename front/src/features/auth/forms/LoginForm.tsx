import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "@/src/shared/components/ui/Button";
import PasswordInput from "../components/atoms/PasswordInput";
import { useLogin } from "../hooks/useLogin";
import { parseAuthError } from "@/src/shared/utils/parseAuthError";

interface LoginFormValues {
    email: string;
    password: string;
}

export default function LoginForm() {
    const { register, handleSubmit } = useForm<LoginFormValues>();

    const { signIn, isLoggingIn, error } = useLogin();

    const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
        signIn(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
            <label className="flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                    Correo o usuario
                </span>
                <input
                    type="text"
                    autoComplete="username"
                    placeholder="ej. diego@critvirgilio.co"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-dim outline-none transition-colors focus:border-border-yellow"
                    {...register("email")}
                />
            </label>

            <PasswordInput
                field={register("password")}
                autoComplete="current-password"
                placeholder="••••••••"
            />

            <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-text-muted">
                    <input type="checkbox" defaultChecked className="h-4 w-4 accent-cta" />
                    Recuérdame
                </label>
                <a href="#" className="font-medium text-text-secondary transition-opacity hover:opacity-80">
                    Olvidé mi contraseña
                </a>
            </div>

            {error && <span className="text-sm text-red-500">{parseAuthError(error)}</span>}

            <Button type="submit" className="mt-2 w-full" disabled={isLoggingIn}>
                {isLoggingIn ? "Entrando..." : "Entrar"}
            </Button>
        </form>
    );
}
