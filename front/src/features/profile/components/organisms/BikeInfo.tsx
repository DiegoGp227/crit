import Image from "next/image";
import { Bike } from "lucide-react";
import Section from "@/src/shared/components/ui/Section";
import { cn } from "@/src/shared/utils/cn";
import type { Profile } from "../../services/profileService";

interface BikeInfoProps {
  profile: Profile;
}

export default function BikeInfo({ profile }: BikeInfoProps) {
  const specs = [
    { label: "Marco", value: profile.bikeFrame },
    { label: "Relación", value: profile.bikeRatio },
    {
      label: "Peso",
      value: profile.bikeWeight != null ? `${profile.bikeWeight} kg` : null,
    },
    { label: "Talla", value: profile.bikeSize },
  ];

  return (
    <Section>
      <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="card relative flex aspect-4/3 items-center justify-center overflow-hidden">
          {profile.bikePhotoUrl ? (
            <Image
              src={profile.bikePhotoUrl}
              alt="La bicicleta"
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
          ) : (
            <Bike className="h-24 w-24 text-text-dim" />
          )}
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-xs uppercase tracking-widest text-text-muted">La Bicicleta</p>
          <h2 className="text-2xl font-bold text-text-primary">
            {profile.bikeNickname ?? "Mi bici"}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {specs.map((spec) => (
              <div key={spec.label} className="card p-3">
                <p className="text-xs uppercase tracking-widest text-text-muted">
                  {spec.label}
                </p>
                <p
                  className={cn(
                    "font-bold",
                    spec.value ? "text-text-primary" : "text-text-dim",
                  )}
                >
                  {spec.value ?? "—"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
