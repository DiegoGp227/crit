import NavStanding from "../molecules/NavStanding";
import StandingsTable from "../molecules/StandingsTable";

export default function StandingsSection() {
    return (
        <section className="w-full h-170 flex flex-col justify-center items-center">
            <NavStanding />
            <StandingsTable />
        </section>
    )
}