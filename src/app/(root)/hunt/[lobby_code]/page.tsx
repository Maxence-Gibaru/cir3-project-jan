"use client";

import HuntMap from "@/components/layout/hunt/HuntMap";
import SelectTeam from "@/components/layout/hunt/SelectTeam";
import WaitStart from "@/components/layout/hunt/WaitStart";
import WinScreen from "@/components/layout/hunt/WinScreen";
import { fetchApi } from "@/lib/api";
import { useEffect, useState } from "react";

interface HuntData {
    id: string;
    name: string;
    teams: string[][];
    stories: string[];
    markers: { lat: number; lng: number }[]; // Corrected type for markers
    hintsRevealed: string[];
    max_guests: number;
    map: { lat: number; lng: number; zoom: number }; // Corrected type for map
}


export default function HuntPage({
    params
}: Readonly<{
    params: Promise<{
        lobby_code: string;
    }>;
}>) {
    const [lobbyCode, setLobbyCode] = useState<string | null>(null);
    const [pageStatus, setPageStatus] = useState("loading");
    const [huntData, setHuntData] = useState<HuntData | null>(null);


    useEffect(() => {
        params.then((resolvedParams) => {
            setLobbyCode(resolvedParams.lobby_code);
        });
    }, [params]);

    const fetchProgression = async (lobby_code: string | null) => {
        if (!lobby_code) return;
        const response = await fetchApi("guest/progression", {
            method: "GET", params: {
                lobby_code
            }
        });
        // Vérifier si le contenu des données a changé avant de mettre à jour
        if (JSON.stringify(response.data) !== JSON.stringify(huntData)) {
            console.log("Ancienne donnée : ", huntData)
            console.log("Données mises à jour :", response.data);
            setHuntData(response.data); // Met à jour uniquement si les données sont différentes
        }

        // Met à jour le statut de la page indépendamment de huntData
        if (response.progression !== pageStatus) {
            setPageStatus(response.progression);
        }
    }

    useEffect(() => {
        if (lobbyCode) {
            const interval = setInterval(() => {
                fetchProgression(lobbyCode)
            }, 2000)

            return () => clearInterval(interval);
        }
    }, [lobbyCode, fetchProgression])


    useEffect(() => {
        console.log("huntData a été mis à jour :", huntData);
    }, [huntData]);


    if (!huntData) {
        return <div>Chargement...</div>;
    }

    // Afficher la page en fonction du statut de l'utilisateur sur la chasse
    switch (pageStatus) {
        case "loading":
            return <div>Chargement...</div>;
        case "selection":
            return <SelectTeam
                huntId={huntData.id}
                name={huntData.name}
                maxGuests={huntData.maxGuests}
                teams={huntData.teams}
                goNext={() =>
                    fetchProgression(lobbyCode)
                }
            />;

        case "waiting":
            return <WaitStart
                huntId={huntData.id}
                name={huntData.name}
                introduction_story={huntData.stories[0]}
                goNext={() => {
                    fetchProgression(lobbyCode)
                }}
            />;

        case "hunting":
            return <HuntMap
                map={huntData.map}
                stories={huntData.stories}
                hintsRevealed={huntData.hintsRevealed}
                markers={huntData.markers}
                lobbyCode={lobbyCode || ""}
            />;

        case "win":
        case "lose":
            return <WinScreen team_time={null} treasure_position={null} team={null} />;

        default:
            return <div className="h-screen flex flex-col justify-center items-center">Erreur</div>;
    }
}