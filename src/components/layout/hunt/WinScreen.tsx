"use client";
import { Position } from "@/definitions";
import Link from "next/link";
import Image from "next/image";
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
        <div className="h-screen bg-greyBg text-gray-700 flex flex-col">
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
                        <span className="text-gray-700">{teamTime} secondes</span>
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
            </main>

            {/* Footer */}
            <footer className="bg-white text-gray-700 text-sm text-center py-4 mt-8">
                <p>🎉 Hâte de vous retrouver pour une nouvelle partie! 🎉</p>
            </footer>
        </div>
    );
}
