"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import apiClient from "@/src/shared/services/apiClient";
import { CreateAdminTempURL } from "@/src/shared/constants/urls";
import Button from "@/src/shared/components/ui/Button";

interface FormValues {
  email: string;
  password: string;
}

export default function CreateAdminPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await apiClient.post(CreateAdminTempURL, data);
      setSuccess(`Admin creado: ${res.data.userInfo.email} (ID: ${res.data.userInfo.id})`);
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.response?.data?.details
          ? JSON.stringify(err.response.data.details)
          : "Error al crear admin";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold text-text-primary">Crear Admin</h1>
        <p className="mt-2 text-sm text-text-muted">
          Panel temporal. Este endpoint será eliminado.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Correo
            </span>
            <input
              type="email"
              autoComplete="email"
              placeholder="admin@critvirgilio.co"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-dim outline-none transition-colors focus:border-border-yellow"
              {...register("email", { required: "El correo es obligatorio" })}
            />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email.message}</span>
            )}
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
              Contraseña
            </span>
            <input
              type="password"
              autoComplete="new-password"
              placeholder="Mínimo 8 caracteres"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-dim outline-none transition-colors focus:border-border-yellow"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: { value: 8, message: "Mínimo 8 caracteres" },
              })}
            />
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password.message}</span>
            )}
          </label>

          {success && (
            <span className="text-sm text-green-500">{success}</span>
          )}
          {error && (
            <span className="text-sm text-red-500">{error}</span>
          )}

          <Button type="submit" className="mt-2 w-full" disabled={loading}>
            {loading ? "Creando..." : "Crear Admin"}
          </Button>
        </form>
      </div>
    </div>
  );
}
