"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import Container from "@/src/shared/components/ui/Container";
import Button from "@/src/shared/components/ui/Button";
import UserMenu from "./UserMenu";

const HIDE_HEADER_ROUTES = ["/auth"];

export default function Header() {
    const pathname = usePathname();
    const user = useAuthStore((s) => s.user);

    if (HIDE_HEADER_ROUTES.includes(pathname)) {
        return null;
    }

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-bg/85 backdrop-blur-md">
            <Container className="flex h-16 items-center justify-between">
                <Link href="/" aria-label="Crit Virgilio - Inicio">
                    <Image
                        src="/brand/CritVirgilium.png"
                        alt="Crit Virgilio"
                        width={623}
                        height={390}
                        className="h-9 w-auto"
                        priority
                    />
                </Link>
                {user ? (
                    <UserMenu />
                ) : (
                    <Link href="/auth" aria-label="Iniciar sesión">
                        <Button variant="ghost" size="sm">
                            Iniciar sesión
                        </Button>
                    </Link>
                )}
            </Container>
        </header>
    );
}
