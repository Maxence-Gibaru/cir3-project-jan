"use client";

import { useState } from "react";

import { Dispatch, SetStateAction } from "react";
import { Button } from "@heroui/react";
interface TeamnumberProps {
  Numberindice: number;
  numTeams: number;
  setNumTeams: Dispatch<SetStateAction<number>>;
  playersPerTeam: number;
  setPlayersPerTeam: Dispatch<SetStateAction<number>>;
  onNext: () => void; // Nouvelle prop
}


export default function Teamnumber({Numberindice,numTeams, setNumTeams,playersPerTeam, setPlayersPerTeam,onNext}:TeamnumberProps) {
  
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
          max={Numberindice}
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

          <Button   onPress={onNext}  className="bg-green-500 text-white px-6 py-3 rounded">
              Valider
          </Button>
    </div>
  );
}
