"use client";

import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import { SignupURL } from "@/src/shared/constants/urls";
import { signup, type AuthDTO } from "../services/authService";

export const useRegister = () => {
    const router = useRouter();
    const setAuth = useAuthStore((s) => s.setAuth);

    const { trigger, isMutating, error } = useSWRMutation(
        SignupURL.href,
        (_key: string, { arg }: { arg: AuthDTO }) => signup(arg),
    );

    const register = async (data: AuthDTO) => {
        const { token, userInfo } = await trigger(data);
        setAuth({ token, user: userInfo });
        router.push("/profile");
    };

    return { register, isRegistering: isMutating, error };
};
