"use client";

import HuntMap from "@/components/layout/hunt/HuntMap";
import SelectTeam from "@/components/layout/hunt/SelectTeam";
import WaitStart from "@/components/layout/hunt/WaitStart";
import WinScreen from "@/components/layout/hunt/WinScreen";
import { HuntInit } from "@/definitions";
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
    const [huntData, setHuntData] = useState(null);


    useEffect(() => {
        params.then((resolvedParams) => {
            setLobbyCode(resolvedParams.lobby_code);
        });
    }, [params]);



    const fetchProgression = async () => {
        const response = await fetchApi("guest/progression", { method: "GET", params: { lobby_code: lobbyCode } })
        setPageStatus(response.progression)
        setHuntData(response.data);
    }


    useEffect(() => {
        fetchProgression()
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
                    fetchProgression()
                }
            />;

        case "waiting":
            return <WaitStart
                huntId={huntData.id}
                name={huntData.name}
                introduction_story={huntData.introduction_story}
                goNext={() => {
                    fetchProgression()

                }}
            />;

        case "hunting":
            const first_hint = "coucou";
            if (first_hint) {
                return <HuntMap
                    map={huntData.map}
                    introduction_story={huntData.introduction_story}
                    first_hint={first_hint}
                />;
            }

        case "win":
            return <WinScreen team_time={null} treasure_position={null} team={null} />;

        default:
            return <div className="h-screen flex flex-col justify-center items-center">Erreur</div>;
    }
}