"use client";
import { Position } from "@/definitions";
import "./wait.css";


export default function WinScreen({ teamTime, treasurePosition, team, isWin, leaderBoard }: { teamTime: number, treasurePosition: Position, team: string[], isWin: boolean, leaderBoard: LeaderBoard }) {
    const podium = [
        { teamName: "Équipe Alpha", time: 95 },
        { teamName: "Équipe Beta", time: 105 },
        { teamName: "Équipe Gamma", time: 120 },
        { teamName: "Équipe 4", time: 130 },
        { teamName: "Équipe 5", time: 140 },
    ];

    return (
        <div className="h-screen flex flex-col justify-center items-center uppercase text-xl font-bold tracking-[0.5rem]">
            <p>{isWin ? "Bravo !" : "Dommage !"}</p>

            <p>Temps : {teamTime} secondes</p>
            <p>
                Trésor : {treasurePosition.lat} {treasurePosition.lng}
            </p>
            
            <p>Équipe : {team.join(", ")}</p>

            {podium?.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-2xl">Podium :</h2>
                    <div className="flex justify-center items-end mt-5">
                        {/* Deuxième place */}
                        {podium[1] && (
                            <div className="flex flex-col items-center mx-2">
                                <div className="w-14 h-20 md:w-20 md:h-32 bg-gray-400 flex justify-center items-center text-black">
                                    2
                                </div>
                                <p className="mt-2 text-sm md:text-base">{podium[1].teamName}</p>
                                <p className="text-sm md:text-base">{podium[1].time} sec</p>
                            </div>
                        )}

                        {/* Première place */}
                        {podium[0] && (
                            <div className="flex flex-col items-center mx-2">
                                <div className="w-16 h-24 md:w-24 md:h-40 bg-yellow flex justify-center items-center text-black">
                                    1
                                </div>
                                <p className="mt-2 text-sm md:text-base">{podium[0].teamName}</p>
                                <p className="text-sm md:text-base">{podium[0].time} sec</p>
                            </div>
                        )}

                        {/* Troisième place */}
                        {podium[2] && (
                            <div className="flex flex-col items-center mx-2">
                                <div className="w-12 h-16 md:w-20 md:h-28 bg-orange-500 flex justify-center items-center text-black">
                                    3
                                </div>
                                <p className="mt-2 text-sm md:text-base">{podium[2].teamName}</p>
                                <p className="text-sm md:text-base">{podium[2].time} sec</p>
                            </div>
                        )}
                    </div>
                    <div className="mt-10 w-full text-center">

                        <ul className="list-decimal mt-4 mx-auto text-sm md:text-base">
                            {podium.slice(3).map((entry, index) => (
                                <li key={index} className="mt-1">
                                    {index + 4} : {entry.teamName} - {entry.time} sec
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
