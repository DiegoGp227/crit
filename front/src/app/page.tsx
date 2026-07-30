"use client";
import AboutCircuit from "../features/home/components/organisms/AboutCircuit";
import HeroHome from "../features/home/components/organisms/HeroHome";
import NextRaceCountdown from "../features/home/components/organisms/NextRaceCountdown";
import StandingsSection from "../features/home/components/organisms/StandingsSection";

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <NextRaceCountdown />
      <AboutCircuit />
      <StandingsSection />
      <footer />
    </>
  );
}
