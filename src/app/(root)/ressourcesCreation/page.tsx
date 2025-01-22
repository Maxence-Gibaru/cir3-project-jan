"use client";

import RessourcesCreationPage from "@/components/pages/RessourcesCreation";
import Importmap from "@/components/pages/Importmap";
import Teamnumber from "@/components/pages/Teamnumber";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { fetchApi } from "@/lib/api";
import { map } from "zod";

export default function HomePage() {
    //Page ressourcesCreation.tsx
    const [title, setTitle] = useState(""); // État pour le titre
    const [intro, setIntro] = useState(""); // État pour l'introduction
    const [chapters, setChapters] = useState<string[]>([]); // Liste des chapitres
    //Page importmap.tsx
    const [markers, setMarkers] = useState([])


    // Page teamnumber.tsx
    const [numTeams, setNumTeams] = useState(1);
    const [playersPerTeam, setPlayersPerTeam] = useState(1);
    const [index, setIndex] = useState<number>(0); // Index du chapitre actuel
    const [error, setError] = useState("");
    // Créer l'objet JSON avec toutes les données
    const gameData = {
        name: title,
        //intro: intro,
        stories: chapters,
        markers: markers,
        max_guests:playersPerTeam,
        max_teams: numTeams,
        map: {
            lat: 46.603354,
            lng: 1.888334,
            zoom: 6
        }
    };
    const router = useRouter();
    const renderStep = async () => {
        switch (index) {
            case 0:
                return (
                    <RessourcesCreationPage
                        title={title}
                        intro={intro}
                        setTitle={setTitle}
                        setIntro={setIntro}
                        chapters={chapters}
                        setChapters={setChapters}
                        onNext={() => setIndex(1)} // Ajouter un prop pour passer à l'étape suivante
                    />
                );
            case 1:
                return (
                    <Importmap
                        markers={markers}
                        setMarkers={setMarkers}
                        onNext={() => setIndex(2)}
                    />
                );
            case 2:
                return (
                    <div>
                        <Teamnumber Numberindice={markers.length} numTeams={numTeams}
                            setNumTeams={setNumTeams} playersPerTeam={playersPerTeam}
                            setPlayersPerTeam={setPlayersPerTeam}
                            onNext={() => setIndex(3)} />
                    </div>
                );
            case 3:
                await fetchApi("organizer/create", {
                    method: "POST",
                    body: gameData,
                }).then(() => {
                    alert("Chasse au trésor créée avec succès !");
                    router.push('/create');
                }
                ).catch((errorMessage: string) => {
                    setError(errorMessage);
                });
            default:
                return <div>Étape non reconnue</div>;
        }
    };
    return (
        <>
            <div className="">
                {renderStep()}
            </div>
        </>
    );
}