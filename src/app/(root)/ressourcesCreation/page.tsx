"use client";

import RessourcesCreationPage from "@/components/pages/RessourcesCreation";
import Importmap from "@/components/pages/Importmap";
import { useState } from "react";

export default function HomePage() {
    const [title, setTitle] = useState(""); // État pour le titre
    const [intro, setIntro] = useState(""); // État pour l'introduction
    const [chapters, setChapters] = useState<string[]>([]); // Liste des chapitres
    const [markers, setMarkers] = useState([])  
    const [index, setIndex] = useState<number>(0); // Index du chapitre actuel
    const renderStep = () => {
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
                        <h1>Étape 3</h1>
                    </div>
                );
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