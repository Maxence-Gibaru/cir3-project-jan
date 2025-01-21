"use client";

import React, { useState, useEffect } from "react";
import TeamProgressContainer from "@/components/pages/leaderbord";
import ProgressDashboard from "@/components/pages/pourcent";
import ElapsedTime from "@/components/pages/timer";

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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Dashboard</h1>

      {/* Timer reste indépendant */}
      <div style={{ marginBottom: "20px" }}>
        <ElapsedTime startTime={startTime} />
      </div>

      {/* Classement mis à jour toutes les 5 secondes */}
      <div style={{ marginBottom: "20px" }}>
        <TeamProgressContainer data={teamData} />
      </div>

      {/* Progression des équipes */}
      <div style={{ marginBottom: "20px" }}>
        <ProgressDashboard data={teamData} />
      </div>
    </div>
  );
};

export default Dashboard;
