"use client";

import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";
import { MeRegistrationURL, MeURL } from "@/src/shared/constants/urls";
import {
  createRegistration,
  type CreateRegistrationDTO,
} from "../services/registrationService";

export const useRegisterChampionship = () => {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating, error } = useSWRMutation(
    MeRegistrationURL,
    (_key: string, { arg }: { arg: CreateRegistrationDTO }) =>
      createRegistration(arg),
  );

  const register = async (data: CreateRegistrationDTO) => {
    const result = await trigger(data);
    await mutate(MeURL);
    return result;
  };

  return { register, isRegistering: isMutating, error };
};
