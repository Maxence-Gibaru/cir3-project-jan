"use client";

import TeamProgressContainer from "@/components/pages/leaderboard";
import ProgressDashboard from "@/components/pages/pourcent";
import ElapsedTime from "@/components/pages/timer";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Creation_qrcode from "@/components/ui/Creation_qrcode";
import { Hunt } from "@/models/Hunt";
import { fetchApi } from "@/lib/api";
import clsx from 'clsx';
interface SecondComponentProps {
  hunts: Hunt[];
  setHunts: (hunts: Hunt[]) => void;
  onNext: () => void;
  hunt: Hunt;
  setHunt: (hunts: Hunt) => void;
}

export default function Dashboard({hunts,setHunts,hunt,setHunt,onNext}: SecondComponentProps) {
  const initialTeams = [
    { equipe: "Equipe A", indicesFaits: 8, totalIndices: 10 },
    { equipe: "Equipe B", indicesFaits: 5, totalIndices: 10 },
    { equipe: "Equipe C", indicesFaits: 7, totalIndices: 10 },
  ];

  
  const [teamData, setTeamData] = useState(initialTeams);

  const [startTime] = useState(new Date().toISOString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTeamData((prevData) =>
        prevData.map((team) => ({
          ...team,
          indicesFaits: Math.min(
            team.indicesFaits + Math.floor(Math.random() * 2),
            team.totalIndices
          ),
        }))
      );
    }, 5000);


    return () => clearInterval(interval);
  }, []);

  const stop_game = async () => {

        await fetchApi("organizer/stop", {
          method: "PUT",
          body: { huntId: hunt._id },
        }).then(() =>{
         console.log("good_stop");
         }
      ).catch((err) => console.error(err));
      }

    const start_game = async () => {

      await fetchApi("organizer/start", {
        method: "PUT",
        body: { huntId: hunt._id },
      }).then(() =>{
        console.log("good_start");
        }
    ).catch((err) => console.error(err));
    }


  return (
    <div className="flex flex-col h-screen text-dark">
      {/* Header */}
      <header className="bg-white p-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
        <Image
          src="/logoO.png"
          alt="Logo de One P'ISEN"
          width={50}
          height={50}
          className="absolute mx-auto top-4 right-4 rounded-full"
        />

      </header>

      {/* Contenu principal*/}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Temps écoulé */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Temps écoulé</h2>
            <ElapsedTime startTime={startTime} />
          </div>

          {/* Classement */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Classement</h2>
            <TeamProgressContainer data={teamData} />
          </div>

          {/* Pourcentage */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Pourcentage</h2>
            <ProgressDashboard data={teamData} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-8 justify-center">

          <Creation_qrcode hunt={hunt}/>

          <Button className="bg-darkBlueBg text-white px-6 py-3 rounded-lg hover:bg-blueBg">
            Générer le code
          </Button>
           {/* Bouton Lancer */}
            <Button 
            onPress={hunt.status === 'opened' ? start_game : stop_game  }
            className={clsx(
              "px-4 py-2 rounded bg-green-500 hover:bg-gray text-white",
            )}
            >
            {hunt.status === 'opened' ? 'Lancer' : 'Stop'}
            </Button>
        </div>
      </main>
    </div>
  );
}
