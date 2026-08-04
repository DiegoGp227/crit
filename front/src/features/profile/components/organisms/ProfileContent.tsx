import type { Profile, ProfileStats } from "../../services/profileService";
import type { Registration } from "../../services/registrationService";
import ProfileInfo from "./ProfileInfo";
import BikeInfo from "./BikeInfo";

interface ProfileContentProps {
  profile: Profile;
  stats?: ProfileStats;
  registration?: Registration | null;
  onEdit: () => void;
  onRegister: () => void;
}

export default function ProfileContent({
  profile,
  stats,
  registration,
  onEdit,
  onRegister,
}: ProfileContentProps) {
  return (
    <>
      <ProfileInfo
        profile={profile}
        stats={stats}
        registration={registration}
        onEdit={onEdit}
        onRegister={onRegister}
      />
      <BikeInfo profile={profile} />
    </>
  );
}
