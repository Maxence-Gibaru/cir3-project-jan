"use client";

import TeamProgressContainer from "@/components/pages/leaderboard";
import ProgressDashboard from "@/components/pages/pourcent";
import ElapsedTime from "@/components/pages/timer";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Dashboard() {
  const initialTeams = [
    { equipe: "Equipe A", indicesFaits: 8, totalIndices: 10 },
    { equipe: "Equipe B", indicesFaits: 5, totalIndices: 10 },
    { equipe: "Equipe C", indicesFaits: 7, totalIndices: 10 },
  ];

  
  const [teamData, setTeamData] = useState(initialTeams);

  // Initialiser le temps de départ une seule fois
  const [startTime] = useState(new Date().toISOString());

  // Mettre à jour les données des équipes toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setTeamData((prevData) =>
        prevData.map((team) => ({
          ...team,
          indicesFaits: Math.min(
            team.indicesFaits + Math.floor(Math.random() * 2), // Simuler progression aléatoire
            team.totalIndices
          ),
        }))
      );
    }, 5000);

    // Nettoyage de l'intervalle
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-grey to-sand  text-dark">
      {/* Header */}
      <header className="bg-primary p-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <Image
         src="/logoO.png" // Chemin de votre logo
         alt="Logo de One P'ISEN"
         width={50} // Ajustez la largeur
         height={50} // Ajustez la hauteur
         className="absolute mx-auto top-4 right-4 rounded-full"
        />
        
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Temps écoulé */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-secondary mb-4">Temps écoulé</h2>
            <ElapsedTime startTime={startTime} />
          </div>

          {/* Classement */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-secondary mb-4">Classement</h2>
            <TeamProgressContainer data={teamData} />
          </div>

          {/* Pourcentage */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-secondary mb-4">Pourcentage</h2>
            <ProgressDashboard data={teamData} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8 justify-center">
          <Button className="bg-white text-primary px-6 py-3 rounded-lg hover:bg-secondary hover:text-white">
            Générer les QR codes des indices
          </Button>
          <Button className="bg-white text-primary px-6 py-3 rounded-lg hover:bg-secondary hover:text-white">
            Générer le code
          </Button>
        </div>
      </main>
    </div>
  );
}
