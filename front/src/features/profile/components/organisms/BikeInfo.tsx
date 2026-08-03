"use client";

import Image from "next/image";
import Section from "@/src/shared/components/ui/Section";
import { useProfile } from "../../hooks/useProfile";

const DEFAULT_BIKE_PHOTO = "/photos/bike.jpeg";

export default function BikeInfo() {
  const { data } = useProfile();
  const profile = data?.profile ?? null;

  if (!profile) return null;

  const hasBike =
    profile.bikeNickname ||
    profile.bikeFrame ||
    profile.bikeRatio ||
    profile.bikeWeight != null ||
    profile.bikeSize;

  if (!hasBike) return null;

  const specs = [
    { label: "Marco", value: profile.bikeFrame },
    { label: "Relación", value: profile.bikeRatio },
    {
      label: "Peso",
      value: profile.bikeWeight != null ? `${profile.bikeWeight} kg` : null,
    },
    { label: "Talla", value: profile.bikeSize },
  ].filter((spec): spec is { label: string; value: string } => spec.value != null);

  return (
    <Section>
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="card relative aspect-4/3 overflow-hidden">
          <Image
            src={profile.bikePhotoUrl ?? DEFAULT_BIKE_PHOTO}
            alt="La bicicleta"
            fill
            className="object-cover"
            sizes="50vw"
            priority
          />
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-xs uppercase tracking-widest text-text-muted">La Bicicleta</p>
          <h2 className="text-2xl font-bold text-text-primary">
            {profile.bikeNickname ?? "Mi bici"}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {specs.map((spec) => (
              <div key={spec.label} className="card p-3">
                <p className="text-xs uppercase tracking-widest text-text-muted">{spec.label}</p>
                <p className="font-bold text-text-primary">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
