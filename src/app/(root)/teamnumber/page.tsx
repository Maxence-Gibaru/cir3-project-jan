"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TeamSelectionPage() {
  const router = useRouter();

  const clues = [
    { id: 1, clue: "Indice 1" },
    { id: 2, clue: "Indice 2" },
    { id: 3, clue: "Indice 3" },
    { id: 4, clue: "Indice 4" },
  ];

  const maxTeams = clues.length;
  const [numTeams, setNumTeams] = useState(1);
  const [playersPerTeam, setPlayersPerTeam] = useState(1);
  const [error, setError] = useState("");

  const handleNext = () => {
    if (numTeams > maxTeams) {
      setError(
        `Le nombre d'équipes (${numTeams}) ne peut pas dépasser le nombre d'indices (${maxTeams}).`
      );
    } else {
      setError("");
      router.push("/next-page");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F2EFE7] px-8 py-10">
        <h1 className="text-gray-700 text-4xl font-bold text-center">Sélection du nombre d'équipes</h1>

      <div className="mb-6 w-full max-w-xs mt-8">
        <label htmlFor="numTeams" className="text-gray-700 text-xl font-semibold">
          Nombre d'équipes :
        </label>
        <input
          id="numTeams"
          type="number"
          min="1"
          max={maxTeams}
          value={numTeams}
          onChange={(e) => setNumTeams(Number(e.target.value))}
          className="mt-2 w-full px-4 py-3 border-2 border-gray rounded-full text-center text-lg"
        />
      </div>

      <div className="mb-8 w-full max-w-xs">
        <label htmlFor="playersPerTeam" className="text-gray-700 text-xl font-semibold">
          Joueurs par équipe (optionnel si 0) :
        </label>
        <input
          id="playersPerTeam"
          type="number"
          min="0"
          value={playersPerTeam}
          onChange={(e) => setPlayersPerTeam(Number(e.target.value))}
          className="mt-2 w-full px-4 py-3 border-2 border-grey rounded-full text-center text-lg"
        />
      </div>

      {error && (
        <p className="text-red-500 text-center mb-6">
          {error}
        </p>
      )}

      <button
        onClick={handleNext}
        className="mt-6 px-8 py-4 bg-[#9ACBD0] text-gray-700 text-xl font-semibold rounded-lg hover:bg-gray-800 transition-all duration-200"
      >
        Suivant
      </button>
    </div>
  );
}
