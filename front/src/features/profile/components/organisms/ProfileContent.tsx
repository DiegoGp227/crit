import type { Profile, ProfileStats } from "../../services/profileService";
import ProfileInfo from "./ProfileInfo";
import BikeInfo from "./BikeInfo";

interface ProfileContentProps {
  profile: Profile;
  stats?: ProfileStats;
  onEdit: () => void;
}

export default function ProfileContent({
  profile,
  stats,
  onEdit,
}: ProfileContentProps) {
  return (
    <>
      <ProfileInfo profile={profile} stats={stats} onEdit={onEdit} />
      <BikeInfo profile={profile} />
    </>
  );
}