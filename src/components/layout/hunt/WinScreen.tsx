"use client";
import { LeaderBoard, Position } from "@/definitions";
import Image from "next/image";
import Link from "next/link";
import "./wait.css";

export default function WinScreen({ teamTime, treasurePosition, team, isWin, leaderBoard }: { teamTime: number, treasurePosition: Position, team: string[], isWin: boolean, leaderBoard: LeaderBoard[] }) {
    function formatTime(teamTime) {
        const totalSeconds = Math.floor(teamTime / 1000); // Convertir en secondes
        const hours = Math.floor(totalSeconds / 3600); // Calculer les heures
        const minutes = Math.floor((totalSeconds % 3600) / 60); // Calculer les minutes restantes
        const seconds = totalSeconds % 60; // Calculer les secondes restantes
    
        // Ajouter un zéro devant si nécessaire pour les valeurs inférieures à 10
        const formattedHours = hours.toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");
    
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
    return (
        <div className="min-h-screen bg-greyBg text-gray-700 flex flex-col">
            {/* Header */}
            <header className="bg-white p-4 flex items-center shadow-md">
                <Link href="/" className="hover:opacity-80 transition-opacity flex items-center">
                    <Image
                        src="/logoO.png"
                        alt="Logo de One P'ISEN"
                        width={50}
                        height={50}
                        className="rounded-full"
                    />
                    <span className="ml-3 font-bold text-xl text-gray-800">One Pisen</span>
                </Link>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col justify-center items-center uppercase text-center px-4">
                {/* Bravo/Dommage */}
                <h1 className={`text-6xl font-extrabold mb-8 transition-transform transform ${isWin ? "text-green-500" : "text-red-500"} animate-bounce`}>
                    {isWin ? "Bravo !" : "Dommage !"}
                </h1>

                {/* Card for details */}
                <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-transform hover:scale-105">
                    <p className="text-lg font-semibold mb-4">
                        <span className="block text-sm text-gray-500 uppercase tracking-wider">Durée de la partie :</span>
                        <span className="text-gray-700">{formatTime(teamTime)}</span>
                    </p>
                    <p className="text-lg font-semibold mb-4">
                        <span className="block text-sm text-gray-500 uppercase tracking-wider">Coordonnées du trésor :</span>
                        <span className="text-gray-700">{treasurePosition.lat}, {treasurePosition.lng}</span>
                    </p>
                    <p className="text-lg font-semibold">
                        <span className="block text-sm text-gray-500 uppercase tracking-wider">Nom de l'équipe :</span>
                        <span className="text-gray-700">{team.join(", ")}</span>
                    </p>
                </div>

                {leaderBoard.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-2xl">leaderBoard :</h2>
                    <div className="flex justify-center items-end mt-5">
                        {/* Deuxième place */}
                        {leaderBoard[1] && (
                            <div className="flex flex-col items-center mx-2">
                                <div className="w-14 h-20 md:w-20 md:h-32 bg-gray-400 flex justify-center items-center text-black">
                                    2
                                </div>
                                <p className="mt-2 text-sm md:text-base">{leaderBoard[1].teamIndex}</p>
                                <p className="text-sm md:text-base">{formatTime(leaderBoard[1].teamTime)}</p>
                            </div>
                        )}

                        {/* Première place */}
                        {leaderBoard[0] && (
                            <div className="flex flex-col items-center mx-2">
                                <div className="w-16 h-24 md:w-24 md:h-40 bg-yellow flex justify-center items-center text-black">
                                    1
                                </div>
                                <p className="mt-2 text-sm md:text-base">{leaderBoard[0].teamIndex}</p>
                                <p className="text-sm md:text-base">{formatTime(leaderBoard[0].teamTime)}</p>
                            </div>
                        )}

                        {/* Troisième place */}
                        {leaderBoard[2] && (
                            <div className="flex flex-col items-center mx-2">
                                <div className="w-12 h-16 md:w-20 md:h-28 bg-orange-500 flex justify-center items-center text-black">
                                    3
                                </div>
                                <p className="mt-2 text-sm md:text-base">{leaderBoard[2].teamIndex}</p>
                                <p className="text-sm md:text-base">{formatTime(leaderBoard[2].teamTime)} </p>
                            </div>
                        )}
                    </div>
                    <div className="mt-10 w-full text-center">

                        <ul className="list-decimal mt-4 mx-auto text-sm md:text-base">
                            {leaderBoard.slice(3).map((entry, index) => (
                                <li key={index} className="mt-1">
                                    {index + 4} : {entry.teamIndex} - {formatTime(entry.teamTime)} 
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            </main>

            {/* Footer */}
            <footer className="bg-white text-gray-700 text-sm text-center py-4 mt-8">
                <p>🎉 Hâte de vous retrouver pour une nouvelle partie! 🎉</p>
            </footer>
        </div>
    );
}
