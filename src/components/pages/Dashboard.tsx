"use client";

import TeamProgressContainer from "@/components/pages/leaderboard";
import ProgressDashboard from "@/components/pages/pourcent";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Creation_qrcode from "@/components/ui/Creation_qrcode";
import { Hunt } from "@/models/Hunt";
import { fetchApi } from "@/lib/api";
import clsx from 'clsx';
import { useRouter } from "next/navigation";
import Link from "next/link";
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

  const Router = useRouter();
  const [teamData, setTeamData] = useState(initialTeams);

  const [startTime, setStartTime] = useState('00:00:00');
  const [start, setStart] = useState(false);
  const[trouve,setTrouve] = useState([]);

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

  useEffect(() => {
    if (start === true) {
      const fetchHunts = async () => {
        await fetchApi("organizer/hunt", { method: "GET", params: { huntId: hunt._id } })
          .then((data) => {
            setHunt(data);           
          })
          .catch((err) => console.error(err)); 
      };
  
      fetchHunts(); // Exécution immédiate
  
      // Définir un intervalle qui s'exécute toutes les 5 secondes
      const intervalId = setInterval(fetchHunts, 5000);
  
      // Nettoyer l'intervalle lors du démontage du composant
      return () => clearInterval(intervalId);
    }
  }, [start]); // Dépendance ajoutée pour réagir aux changements de 'start'

  useEffect(() => {
    let interval;
  
    console.log("Status:", hunt.status);
  
    if (hunt.status === 'started') {
      // Convertir le temps de départ en millisecondes depuis le début de la partie
      const startTimeInMs = new Date(hunt.started_at).getTime();
  
      interval = setInterval(() => {
        const now = new Date().getTime();
        const elapsedTime = Math.floor((now - startTimeInMs) / 1000);
  
        // Convertir en heures, minutes, secondes
        const hours = Math.floor(elapsedTime / 3600);
        const minutes = Math.floor((elapsedTime % 3600) / 60);
        const seconds = elapsedTime % 60;
  
        // Formater avec zéros de padding
        const formattedTime = `${hours.toString().padStart(2, '0')}:${
          minutes.toString().padStart(2, '0')
        }:${seconds.toString().padStart(2, '0')}`;
        setStartTime(formattedTime); // Mettre à jour le state
      }, 1000);
    } else {
      setStartTime('00:00:00'); // Réinitialiser le compteur si le statut n'est pas 'started'
    }
  
    // Nettoyage de l'intervalle
    return () => {
      //console.log("Cleaning interval...");
      clearInterval(interval);
    };
  }, [hunt.status, hunt.started_at]);
  
  

  const stop_game = async () => {
        await fetchApi("organizer/stop", {
          method: "PUT",
          body: { huntId: hunt._id },
        }).then(() =>{
         console.log("good_stop");
         hunt.status = 'ended';
         setStart(false);
         setHunt(hunt);
         }
      ).catch((err) => console.error(err));
      }

    const start_game = async () => {
      await fetchApi("organizer/start", {
        method: "PUT",
        body: { huntId: hunt._id },
      }).then(() =>{
        console.log("good_start");
        hunt.status = 'started';
        setHunt(hunt);

        setStart(true);
        }
    ).catch((err) => console.error(err));
    }

    const reset_game = async () => {
      await fetchApi("organizer/reset", {
        method: "PUT",
        body: { huntId: hunt._id },
      }).then(() =>{
        console.log("good_reset");
        setHunt(hunt);
        window.location.reload();
        }
    ).catch((err) => console.error(err));
    }


  return (
    <div className="flex flex-col h-screen text-dark">
      {/* Header */}
      <header className="bg-white p-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold text-gray-700">Dashboard</h1>
        <Link href="/">
          <Image
            src="/logoO.png"
            alt="Logo de One P'ISEN"
            width={50}
            height={50}
            className="absolute mx-auto top-4 right-4 rounded-full"
          />
        </Link>
      </header>

      {/* Contenu principal*/}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Temps écoulé */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Temps écoulé</h2>
            <p>{startTime}</p>
          </div>

          {/* Classement */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Classement</h2>
            <TeamProgressContainer hunt={hunt} trouve={trouve} setTrouve={setTrouve} />
          </div>

          {/* Pourcentage */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Pourcentage</h2>
            <ProgressDashboard data={teamData} trouve={trouve} setTrouve={setTrouve}/>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 mt-8 justify-center md:flex-row">
          <Creation_qrcode hunt={hunt} />

          <Button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(hunt.code);
                alert("Code copié dans le presse-papiers !");
              } catch (err) {
                console.error("Erreur lors de la copie :", err);
              }
            }}
            className="bg-darkBlueBg text-white px-6 py-3 rounded-lg hover:bg-blueBg w-full md:w-auto"
          >
            Code : {hunt.code}
          </Button>

          <button
            onClick={() => window.location.reload()}
            className="bg-darkBlueBg text-white px-4 py-2 rounded-lg hover:bg-blueBg w-full md:w-auto"
          >
            Retour à la liste
          </button>

          <Button
            onPress={
              hunt.status === 'opened'
                ? start_game
                : hunt.status === 'started'
                ? stop_game
                : reset_game
            }
            className={clsx(
              "px-4 py-2 rounded text-white w-full md:w-auto",
              hunt.status === 'opened'
                ? "bg-green hover:bg-green-600"
                : hunt.status === 'started'
                ? "bg-yellow hover:bg-yellow-600"
                : "bg-red hover:bg-red-600"
            )}
          >
            {hunt.status === 'opened'
              ? 'Lancer'
              : hunt.status === 'started'
              ? 'Arrêter la chasse'
              : 'Reset la chasse'}
          </Button>
        </div>
      </main>
    </div>
  );
}
