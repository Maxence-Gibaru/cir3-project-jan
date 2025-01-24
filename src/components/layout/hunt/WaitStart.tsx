"use client";
import Modal from "@/components/ui/InfoModal";
import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import "./wait.css";


interface WaitStartData {
    huntId: string;
    name: string;
    introduction_story: string;
}

export default function WaitStart({ huntId, name, introduction_story, goNext }: WaitStartData & { goNext: (_: string) => void }) {
    const [dots, setDots] = useState(""); // État pour les points
    const [error, setError] = useState(""); // État pour les erreurs

    useEffect(() => {
        // Cycle les points : "", ".", "..", "..."
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 1000); // 1 seconde entre chaque frame

        // Nettoyage de l'intervalle pour éviter les fuites de mémoire
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col bg-greyBg h-screen">

            <div className="flex-grow flex flex-col justify-center items-center">
                {/* Texte avec animation des points */}
                <p className="text-3xl my-5">
                    {/* Conteneur avec largeur fixe */}
                    <span
                        className="inline-block pl-5 pb-4"
                        style={{ width: "20ch" }}
                    >
                        En Attente du Départ{dots}
                    </span>
                </p>
                <div className="mb-24">
                    <Modal />
                </div>
                <div className="spinner my-5"></div>

                <div className="flex gap-4">
                    <Spinner color="default" />
                </div>
            </div>
        </div>
    );
}