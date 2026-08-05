"use client";

import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useSWRConfig } from "swr";
import {
  BibsURL,
  MeProfileURL,
  MeURL,
  RiderURL,
} from "@/src/shared/constants/urls";
import {
  getMyProfile,
  getPublicProfile,
  getUsedBibs,
  updateMyProfile,
  type MyProfileResponse,
  type PublicProfileResponse,
  type UpdateProfileDTO,
} from "../services/profileService";

export const useProfile = () => {
  const { data, error, isLoading, mutate } = useSWR<MyProfileResponse>(
    MeURL.href,
    () => getMyProfile(),
  );
  return { data, error, isLoading, mutate };
};

export const useProfileStats = (profileId: number | null | undefined) => {
  const { data, error, isLoading } = useSWR<PublicProfileResponse>(
    profileId ? RiderURL(profileId).href : null,
    () => getPublicProfile(profileId as number),
  );
  return { stats: data?.stats, error, isLoading };
};

export const usePublicProfile = (profileId: number | null | undefined) => {
  const { data, error, isLoading } = useSWR<PublicProfileResponse>(
    profileId ? RiderURL(profileId).href : null,
    () => getPublicProfile(profileId as number),
  );
  return { profile: data?.profile ?? null, stats: data?.stats, error, isLoading };
};

export const useBibs = () => {
  const { data, error, isLoading } = useSWR<{ used: number[] }>(
    BibsURL.href,
    () => getUsedBibs(),
  );
  return { used: data?.used ?? [], error, isLoading };
};

export const useUpdateProfile = () => {
  const { mutate } = useSWRConfig();
  const { trigger, isMutating, error } = useSWRMutation(
    MeProfileURL.href,
    (_key: string, { arg }: { arg: UpdateProfileDTO }) =>
      updateMyProfile(arg),
  );

  const saveProfile = async (data: UpdateProfileDTO) => {
    const profile = await trigger(data);
    await mutate(MeURL.href, () => getMyProfile());
    if (profile) {
      await mutate(RiderURL(profile.id).href, () => getPublicProfile(profile.id));
    }
    return profile;
  };

  return { saveProfile, isSaving: isMutating, error };
};
