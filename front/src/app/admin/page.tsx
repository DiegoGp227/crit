"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import Section from "@/src/shared/components/ui/Section";
import RegistrationsPanel from "@/src/features/admin/components/organisms/RegistrationsPanel";

export default function AdminPage() {
    const router = useRouter();
    const user = useAuthStore((s) => s.user);

    useEffect(() => {
        if (!user || user.role !== "ADMIN") {
            router.replace("/");
        }
    }, [user, router]);

    if (!user || user.role !== "ADMIN") {
        return null;
    }

    return (
        <Section>
            <div className="w-full max-w-content">
                <h1 className="text-3xl font-bold text-text-primary">Panel de administración</h1>
                <p className="mt-2 text-sm text-text-muted">
                    Bienvenido, {user.email}. Esta sección es exclusiva para administradores.
                </p>
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-text-primary">Inscritos al campeonato</h2>
                    <div className="mt-4">
                        <RegistrationsPanel />
                    </div>
                </div>
            </div>
        </Section>
    );
}
