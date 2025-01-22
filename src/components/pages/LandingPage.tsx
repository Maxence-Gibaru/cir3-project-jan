"use client";
import Image from "next/image";

import { fetchApi } from "@/lib/api";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CodeArea from "./TextArea";
import Link from "next/link";

export default function LandingPage() {
    const [text, setText] = useState("");

    const handleChange = (e: any) => {
        setText(e.target.value);
    };

    const router = useRouter();

    const handleJoin = async () => {
        console.log("join", text)
        const response = await fetchApi("hunt/find", { method: "POST", body: { code: text } })

        console.log("response : ", response)
        if (response) {
            router.push(`/team?code=${encodeURIComponent(text)}`);
        }
    }

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-between pt-20 px-4 md:px-16 lg:px-32">
            {/* Bouton en haut à droite */}
            <div className="absolute top-4 right-4">
                <Link href="/create" className="rounded-lg px-4 py-2 bg-brightLavender hover:bg-vibrantPlum">
                    Créer un event  
                </Link>
            </div>

            {/* Gros titre centré */}
            <h1 className="text-3xl md:text-5xl font-bold text-center mt-12 mb-8 text-midnightBlue">
                One P&apos;ISEN
            </h1>

            {/* Logo sous le titre */}
            <div className="mb-1">
                <Image
                    src="/logoO.png" // Chemin de votre logo
                    alt="Logo de One P'ISEN"
                    width={100} // Ajustez la largeur
                    height={100} // Ajustez la hauteur
                    className="mx-auto"
                />
            </div>

            {/* Section centrale */}
            <div className="flex flex-col items-center text-center w-full md:w-2/3 lg:w-1/2 mt-16 md:mt-8">
                <h1 className="text-2xl md:text-3xl mb-6 text-midnightBlue">Code d'accès</h1>
                <CodeArea value={text} onChange={handleChange} classname="w-50 h-13 resize-none p-2 overflow-y-auto overflow-x-hidden break-words bg-gray-200 border border-gray-400" />
                <div className="mt-4">
                    <Button className="rounded-lg px-6 py-3 bg-brightLavender hover:bg-vibrantPlum" onPress={handleJoin}>Rejoindre</Button>;

                </div>
            </div>

            {/* Description */}
            <div className="mt-12 text-center text-lg px-6 text-boldBlue md:w-3/4 lg:w-1/2">
                <p>
                    Bienvenue dans cette chasse au trésor. L'objectif est de trouver le trésor caché dans la ville.
                    Pour cela, aide toi des différents indices disposés tout au long du parcours. Chaque indice indique
                    la position de l'indice suivant, ils devront alors être trouvés dans l'ordre établi en scannant les
                    QRCode correspondants. Une fois tous les indices obtenus dans l'ordre, un indice final vous sera donné
                    afin d'indiquer l'emplacement du trésor. Rentrez le code d'accès fourni par votre organisateur afin
                    de rejoindre la partie et amusez-vous bien !
                </p>
            </div>
        </div >
    );
}
