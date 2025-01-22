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
        console.log("join", text);
        const response = await fetchApi("hunt/find", { method: "POST", body: { code: text } });

        console.log("response : ", response);
        if (response) {
            router.push(`/team?code=${encodeURIComponent(text)}`);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-between pt-20 px-4 md:px-16 lg:px-32">
            {/* Bouton en haut à droite */}
            <div className="absolute top-4 right-4">
                <Link href="/create" className="rounded-lg px-4 py-2 bg-brightLavender hover:bg-vibrantPlum">
                    Créer un event  
                </Link>
            </div>

            {/* Contenu principal */}
            <div className="flex flex-col justify-evenly items-center flex-grow px-6">
                {/* Section avec titre et logo */}
                <div className="flex flex-col md:flex-row items-center justify-start md:ml-60 w-full max-w-4xl">
                    <h2 className="text-2xl md:text-4xl font-bold text-midnightBlue text-center md:text-left">
                        Jouez à la chasse au trésor
                    </h2>
                    <Image
                        src="/logoO.png"
                        alt="Logo de One P'ISEN"
                        width={120}
                        height={120}
                        className="mx-auto md:ml-5 rounded-full"
                    />
                </div>

                {/* Section centrale pour le code d'accès */}
                <div className="flex flex-col items-center text-center mt-6">
                    <h3 className="text-xl md:text-2xl mb-2 text-midnightBlue">Code d'accès</h3>
                    <CodeArea
                        value={text}
                        onChange={handleChange}
                        classname="w-48 h-12 p-2 bg-oceanBlue border border-black rounded-lg"
                    />
                    <Button
                        className="mt-4 rounded-lg px-6 py-2 bg-oceanBlue hover:bg-blue-dark"
                        onPress={handleJoin}
                    >
                        Rejoindre
                    </Button>
                </div>

                {/* Texte descriptif */}
                <div className="mt-4 text-center text-sm md:text-base px-4 text-boldBlue max-w-3xl">
                    <p>
                        Bienvenue dans cette chasse au trésor. L'objectif est de trouver le trésor caché dans la ville.
                        Pour cela, aide toi des différents indices disposés tout au long du parcours. Chaque indice indique
                        la position de l'indice suivant, ils devront alors être trouvés dans l'ordre établi en scannant les
                        QRCode correspondants. Une fois tous les indices obtenus dans l'ordre, un indice final vous sera donné
                        afin d'indiquer l'emplacement du trésor. Rentrez le code d'accès fourni par votre organisateur afin
                        de rejoindre la partie et amusez-vous bien !
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full bg-oceanBlue text-center py-2 ">
                <p className="text-xs md:text-sm">
                    MATHIEU Paul - GIBARU Maxence - FATRAS Edgar - HU Lucas - LAMOUR Jeremy - DELRUE Cyprien - BOSSUT Siméon - THEPKAISONE Louis - LEGRAND Julien
                </p>
            </footer>
        </div>
    );
}
