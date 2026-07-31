import AboutCircuit from "../features/home/components/organisms/AboutCircuit";
import HeroHome from "../features/home/components/organisms/HeroHome";
import NextRaceCountdown from "../features/home/components/organisms/NextRaceCountdown";
import SponsorsSection from "../features/home/components/organisms/SponsorsSection";
import StandingsSection from "../features/home/components/organisms/StandingsSection";
import Footer from "../features/home/components/organisms/Footer";

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <NextRaceCountdown />
      <AboutCircuit />
      <StandingsSection />
      <SponsorsSection />
      <Footer />
    </>
  );
}
