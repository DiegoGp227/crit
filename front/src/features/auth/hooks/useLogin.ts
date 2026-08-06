"use client";

import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import { LoginURL } from "@/src/shared/constants/urls";
import { login, type AuthDTO } from "../services/authService";

export const useLogin = () => {
    const router = useRouter();
    const setAuth = useAuthStore((s) => s.setAuth);

    const { trigger, isMutating, error } = useSWRMutation(
        LoginURL,
        (_key: string, { arg }: { arg: AuthDTO }) => login(arg),
    );

    const signIn = async (data: AuthDTO) => {
        const { userInfo } = await trigger(data);
        setAuth(userInfo);
        router.push(userInfo.role === "ADMIN" ? "/admin" : "/profile");
    };

    return { signIn, isLoggingIn: isMutating, error };
};
