import AboutCircuit from "../features/home/components/organisms/AboutCircuit";
import DevPromoSection from "../features/home/components/organisms/DevPromoSection";
import HeroHome from "../features/home/components/organisms/HeroHome";
import HomeCountdownMask from "../features/home/components/organisms/HomeCountdownMask";
import NextRaceCountdown from "../features/home/components/organisms/NextRaceCountdown";
import RidersSection from "../features/home/components/organisms/RidersSection";
import SeasonTimeline from "../features/home/components/organisms/SeasonTimeline";
import SponsorsSection from "../features/home/components/organisms/SponsorsSection";
import StandingsSection from "../features/home/components/organisms/StandingsSection";
import Footer from "../features/home/components/organisms/Footer";

export default function HomePage() {
  return (
    <>
      {/* <HomeCountdownMask /> */}
      <HeroHome />
      <NextRaceCountdown />
      <SeasonTimeline />
      <StandingsSection />
      <RidersSection />
      <AboutCircuit />
      <SponsorsSection />
      <DevPromoSection />
      <Footer />
    </>
  );
}
