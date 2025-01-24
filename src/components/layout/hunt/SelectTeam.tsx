"use client";

import TeamBox from "@/components/layout/team/TeamBox";

interface SelectTeamData {
    huntId: string;
    name: string;
    maxGuests: number;
    teams: string[][];
}

export default function SelectTeam({ huntId, name, maxGuests, teams, goNext }: SelectTeamData & { goNext: () => void }) {
    console.log("teams : ", teams)
    return (
        <div className="h-screen bg-greyBg">
            <h1 className="flex justify-center text-4xl py-5 font-bold text-center items-center align-middle uppercase">{name}</h1>
            <h3 className="flex justify-center text-4xl py-5 font-bold text-center items-center align-middle">Choix des équipes</h3>
            <div className="flex flex-col justify-evenly items-center gap-10 sm:flex-row flex-wrap">
                {teams.map((guests, index) => (
                    <TeamBox key={index} huntId={huntId} index={index} guests={guests} maxGuests={maxGuests} goNext={goNext} />
                ))}
            </div>
        </div>
    );
}

