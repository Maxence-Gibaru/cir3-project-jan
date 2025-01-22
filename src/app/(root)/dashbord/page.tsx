"use client";

import TeamProgressContainer from "@/components/pages/leaderboard";
import ProgressDashboard from "@/components/pages/pourcent";
import ElapsedTime from "@/components/pages/timer";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";

const Dashboard = () => {
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
    <div className="flex flex-col h-screen bg-white text-dark">
      {/* Header */}
      <header className="bg-primary p-6 text-white">
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Temps écoulé */}
          <div className="bg-background shadow-lg rounded-lg p-6">
            <ElapsedTime startTime={startTime} />
          </div>

          {/* Classement */}
          <div className="bg-background shadow-lg rounded-lg p-6">
            <TeamProgressContainer data={teamData} />
          </div>

          {/* Pourcentage */}
          <div className="bg-background shadow-lg rounded-lg p-6">
            <ProgressDashboard data={teamData} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8 justify-center">
          <Button
            name="Générer les QR codes des indices"
            className="w-full md:w-auto bg-primary text-white px-6 py-3 rounded hover:bg-primary"
          />
          <Button
            name="Générer le code"
            className="w-full md:w-auto bg-primary text-white px-6 py-3 rounded hover:bg-primary"
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
