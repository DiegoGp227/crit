import Section from "@/src/shared/components/ui/Section";
import NavStanding from "../molecules/NavStanding";
import StandingsTable from "../molecules/StandingsTable";

export default function StandingsSection() {
    return (
        <Section className="flex flex-col gap-14">
            <NavStanding />
            <StandingsTable />
        </Section>
    )
}
