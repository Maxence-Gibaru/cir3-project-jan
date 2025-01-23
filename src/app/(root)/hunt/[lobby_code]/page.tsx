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
    const [pageStatus, setPageStatus] = useState("hunting");
    const [huntInit, setHuntInit] = useState<HuntInit | null>(null);
    const [firstHint, setFirstHint] = useState<string | null>(null);

    useEffect(() => {
        params.then((resolvedParams) => {
            setLobbyCode(resolvedParams.lobby_code);
        });
    }, [params]);

    useEffect(() => {
        const response = fetchApi("guest/progression", { method: "GET", params: { lobby_code: lobbyCode } })
    })


    useEffect(() => {
        if (lobbyCode) {
            fetchApi("guest/join_lobby", { method: "GET", params: { lobby_code: lobbyCode } })
                .then((data) => {
                    if (data) {
                        setHuntInit(data.huntInit);
                        /* setPageStatus("selection"); */
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setPageStatus("error");
                });

            /*
            fetchApi("guest/progression", { method: "GET", params: { lobby_code: lobbyCode } })
                .then((data) => {
                    console.log(data);
                    setPageStatus(data.progression);
                })
                .catch((error) => {
                    console.error(error);
                    setPageStatus("error");
                });
            */
        }
    }, [lobbyCode]);

    if (!huntInit) {
        return <div>Chargement...</div>;
    }

    // Afficher la page en fonction du statut de l'utilisateur sur la chasse
    switch (pageStatus) {
        case "loading":
            return <div>Chargement...</div>;
        case "selection":
            return <SelectTeam
                huntId={huntInit.id}
                name={huntInit.name}
                maxGuests={huntInit.max_guests}
                teams={huntInit.teams}
                goNext={() => setPageStatus("waiting")}
            />;

        case "waiting":
            return <WaitStart
                huntId={huntInit.id}
                name={huntInit.name}
                introduction_story={huntInit.introduction_story}
                goNext={(firstHint: string) => {
                    setFirstHint(firstHint);
                    setPageStatus("hunting")
                }}
            />;

        case "hunting":
            const first_hint = "coucou";
            if (first_hint) {
                return <HuntMap
                    map={huntInit.map}
                    introduction_story={huntInit.introduction_story}
                    first_hint={first_hint}
                />;
            }

        case "win":
            return <WinScreen team_time={null} treasure_position={null} team={null} />;

        default:
            return <div className="h-screen flex flex-col justify-center items-center">Erreur</div>;
    }
}