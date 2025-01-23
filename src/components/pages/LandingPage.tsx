"use client";

import { fetchApi } from "@/lib/api";
import { Input } from "@heroui/input";
import { Button, Card, CardBody } from "@heroui/react";
import { useDisclosure } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Footer from "../layout/Footer";
import NavbarHeader from "../layout/NavbarHeader";
import LoginModal from "../ui/LoginModal";

export default function LandingPage() {
    const [lobbyCode, setLobbyCode] = useState("");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleChange = (e: any) => {
        setLobbyCode(e.target.value);
    };

    const router = useRouter();

    const { data: session, update, status } = useSession();


    const [user, setUser] = useState({})
    useEffect(() => {
        if (session && session.user) {
            setUser(session.user)
            console.log(session.user)
        }
    }, [session])


    useEffect(() => {
        if (status === "unauthenticated") {

            onOpen();
        }
    }, [session])

    const handleJoin = async () => {
        const response = await fetchApi("guest/join_lobby", { method: "GET", params: { lobby_code: lobbyCode } });

        if (response) {
            if (response.huntInit) router.push(`/hunt/${lobbyCode}`);

            // TODO : Gérer les erreurs
        }
    };

    return (
        <>
            <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
            <section >
                <div className="relative h-screen  flex flex-col bg-greyBg ">
                    {/* Barre supérieure */}
                    <div className="h-[10vh]">
                        <NavbarHeader status={status} />
                    </div>

                    {/* Contenu principal */}
                    <div className="flex flex-col items-center justify-evenly flex-grow mx-6">
                        {/* Section avec titre et logo */}

                        {/* Section centrale pour le code d'accès */}
                        <div className="flex flex-col items-center text-center justify-center items-center gap-20 py-20">
                            <div className="bg-greyBg border border-gray-300 flex flex-row gap-5 bg-white rounded-full justfiy-center items-center shadow-md">
                                <Input
                                    validationBehavior="native"
                                    className=" rounded-full"
                                    value={lobbyCode}
                                    onChange={handleChange}
                                    placeholder="Enter code"
                                />
                                <Button
                                    className="rounded-full bg-darkBlueBg text-white uppercase font-bold tracking-[0.1rem]"
                                    onPress={handleJoin}
                                >
                                    Join
                                </Button>
                            </div>
                            <div className="bg-white rounded-full p-2 flex flex-col md:flex-row items-center justify-start w-full max-w-4xl">
                                <h2 className="text-xl md:text-4xl text-center  uppercase tracking-[0.2rem] font-bold">
                                    Jouez à la chasse au trésor
                                </h2>
                            </div>
                        </div>

                        {/* Texte descriptif */}
                        {/* <div className="mt-4 text-sm md:text-base px-4 max-w-3xl"> */}
                        <Card className="">
                            <CardBody className="flex flex-col gap-5 p-0 text-gray-700 bg-[#146AFF1A] p-5 rounded-xl">
                                <p className="font-bold text-xl">
                                    Bienvenue dans cette chasse au trésor.
                                </p>

                                <p>
                                    L'objectif est de trouver le trésor caché dans la ville. Pour cela, aide toi des différents indices disposés tout au long du parcours.
                                    Chaque indice indique la position de l'indice suivant, ils devront alors être trouvés dans l'ordre établi en scannant les
                                    QRCode correspondants.
                                </p>

                                <p>
                                    Une fois tous les indices obtenus dans l'ordre, un indice final vous sera donné
                                    afin d'indiquer l'emplacement du trésor. Rentrez le code d'accès fourni par votre organisateur afin
                                    de rejoindre la partie et <span className="font-bold">amusez-vous bien !</span>
                                </p>
                            </CardBody>
                        </Card>
                        {/* </div> */}
                    </div>
                </div>
                < Footer />
            </section >
            {/* Footer */}
        </>
    );
}
