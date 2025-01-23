"use client";

import HuntMap from "@/components/layout/hunt/HuntMap";
import SelectTeam from "@/components/layout/hunt/SelectTeam";
import WaitStart from "@/components/layout/hunt/WaitStart";
import WinScreen from "@/components/layout/hunt/WinScreen";
import { fetchApi } from "@/lib/api";
import { useEffect, useState } from "react";

export default function HuntPage({
    params
}: Readonly<{
    params: Promise<{
        lobby_code: string;
    }>;
}>) {
    const [lobbyCode, setLobbyCode] = useState<string | null>(null);
    const [pageStatus, setPageStatus] = useState("loading");
    const [huntData, setHuntData] = useState<any>(null);

    useEffect(() => {
        params.then((resolvedParams) => {
            setLobbyCode(resolvedParams.lobby_code);
        });
    }, [params]);

    const fetchProgression = async (lobby_code: string | null) => {
        if (!lobby_code) return;
        const response = await fetchApi("guest/progression", { method: "GET", params: {
            lobby_code
        }});
        setPageStatus(response.progression);
        setHuntData(response.data);
    }

    useEffect(() => {
        if (lobbyCode) {
            const interval = setInterval(() => {
                fetchProgression(lobbyCode)
            }, 2000)
    
            return () => clearInterval(interval);
        }
    }, [lobbyCode])


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
                maxGuests={huntData.max_guests}
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
            />;

        case "win":
        case "lose":
            return <WinScreen team_time={null} treasure_position={null} team={null} />;

        default:
            return <div className="h-screen flex flex-col justify-center items-center">Erreur</div>;
    }
}