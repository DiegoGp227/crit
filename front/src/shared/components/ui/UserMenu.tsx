"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { useAuthStore } from "@/src/store/authStore";
import { useProfile } from "@/src/features/profile/hooks/useProfile";

export default function UserMenu() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const user = useAuthStore((s) => s.user);
    const clearAuth = useAuthStore((s) => s.clearAuth);
    const { data } = useProfile();

    const avatarUrl = data?.profile?.avatarUrl ?? null;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const handleLogout = () => {
        clearAuth();
        setOpen(false);
        router.push("/auth");
    };

    return (
        <div ref={menuRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-label="Menú de usuario"
                aria-expanded={open}
                className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border bg-surface transition-colors hover:border-border-hover"
            >
                {avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt="Foto de perfil"
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                ) : (
                    <User className="h-5 w-5 text-text-dim" />
                )}
            </button>

            {open && (
                <div className="absolute top-full right-0 mt-2 w-48 rounded-2xl border border-border bg-surface-raised p-1 shadow-lg">
                    <div className="border-b border-border px-4 py-2.5">
                        <p className="truncate text-sm font-semibold text-text-primary">{user?.email}</p>
                    </div>
                    {user?.role === "ADMIN" ? (
                        <Link
                            href="/admin"
                            onClick={() => setOpen(false)}
                            className="block cursor-pointer rounded-xl px-4 py-2.5 text-sm text-text-primary transition-colors hover:bg-surface"
                        >
                            Panel admin
                        </Link>
                    ) : (
                        <Link
                            href="/profile"
                            onClick={() => setOpen(false)}
                            className="block cursor-pointer rounded-xl px-4 py-2.5 text-sm text-text-primary transition-colors hover:bg-surface"
                        >
                            Perfil
                        </Link>
                    )}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="block w-full cursor-pointer rounded-xl px-4 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-surface"
                    >
                        Cerrar sesión
                    </button>
                </div>
            )}
        </div>
    );
}
