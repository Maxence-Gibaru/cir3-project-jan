"use client";

import { Dispatch, SetStateAction } from "react";
import { Button, Input } from "@heroui/react";
interface TeamnumberProps {
  Numberindice:number;
  numTeams:number;
  setNumTeams: Dispatch<SetStateAction<number>>;
  playersPerTeam:number;
  setPlayersPerTeam: Dispatch<SetStateAction<number>>;
  onNext: () => void; // Nouvelle prop
}


export default function Teamnumber({Numberindice,numTeams, setNumTeams,playersPerTeam, setPlayersPerTeam,onNext}:TeamnumberProps) {
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-greyBg px-8 py-10">

  <h1 className="text-gray-800 text-4xl font-bold text-center mb-10">
    Sélection du nombre d&apos;équipes
  </h1>

  <div> 
    {/* NE PAS SUPPRIMER, PERMETS DE SUPPRIMER UN BUG */}
  </div>
  <div className="mb-8 w-full mt-6 max-w-xs">
    <label
      htmlFor="playersPerTeam" className="text-gray-700 text-xl font-semibold flex justify-center"
    >
      Nombre d&apos;équipes :
    </label>
    <Input
      id="numTeams"
      type="number"
      min="1"
      defaultValue="1"
      onChange={(e) => setNumTeams(Number(e.target.value))}
      className=" text-center py-3 border border-gray-300 flex flex-row gap-5 bg-white rounded-full justify-center items-center shadow-md w-full"
    />
  </div>

  <div className="mb-16 w-full mt-6 max-w-xs">
    <label
      htmlFor="playersPerTeam" className="text-gray-700 text-xl font-semibold flex justify-center"
    >
      Joueurs maximum par équipe :
    </label>
    <Input
      id="playersPerTeam"
      type="number"
      min="0"
      defaultValue="5"
      onChange={(e) => setPlayersPerTeam(Number(e.target.value))}
      className=" text-center py-3 border border-gray-300 flex flex-row gap-5 bg-white rounded-full justify-center items-center shadow-md w-full"
    />
  </div>

  <Button
    onPress={onNext}
    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary shadow-md"
  >
    Valider
  </Button>
</div>

  );
}
