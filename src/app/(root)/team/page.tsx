"use client";

import Image from "next/image";
import { Button, Avatar, useDisclosure } from "@nextui-org/react"
import Link from "next/link"
import TeamBox from "@/components/layout/team/teamBox"
import { useState } from "react"
import FichierJson from "@/app/(root)/team/teamjson.json"
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; */

export default function HomePage() {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [selectedCard, setSelectedCard] = useState(0);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const ListeEquipes = FichierJson.teams;

    // Correction de l'initialisation des équipes
    // Définition du type pour les équipes
  type EquipeType = {
    id: number;
    size: number;
  };

  // Déclaration de la variable Equipes comme un tableau d'EquipeType
  const Equipes: EquipeType[] = [];
    let compteur = 1;

    // Utilisation correcte de map pour construire les équipes
    ListeEquipes.forEach((Equipe) => {
        Equipes.push({ id: compteur, size: Equipe.guests.length });
        compteur += 1;
    });
    return (
        <div className="h-screen">
            <h1 className="flex justify-center h-1/6 text-4xl py-5 font-bold text-center bg-blue-100 items-center align-middle">Choix des équipes</h1>
            <div className="h-5/6 flex flex-col justify-evenly items-center font-serif border-solid border-2 bg-blue-200">
                {Equipes.map((Equipe) => (
                    TeamBox(Equipe.id, Equipe.size)
                ))}
                {TeamBox(compteur, 0)}
                {/* <button className="w-fit py-3 px-5 my-5 border-solid border-2 rounded-2xl border-blue-300 bg-blue-500 font-bold hover:shadow-lg">Créer une équipe</button> */}
            </div>
        </div>
    )
}
