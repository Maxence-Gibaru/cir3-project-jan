"use client";
import { Position } from "@/definitions";
import "./wait.css";


export default function WinScreen({ teamTime, treasurePosition, team, isWin }: { teamTime: number, treasurePosition: Position, team: string[], isWin: boolean }) {

    return (
        <div className="h-screen flex flex-col justify-center items-center uppercase text-xl font-bold tracking-[0.5rem]">
            <p>{isWin ? "Bravo !" : "Dommage !"}</p>

            <p>Temps : {teamTime} secondes</p>
            <p>
                Trésor : {treasurePosition.lat} {treasurePosition.lng}
            </p>
            
            <p>Équipe : {team.join(", ")}</p>
        </div>
    );
}