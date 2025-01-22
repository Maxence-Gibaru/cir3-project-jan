"use client";
import Image from "next/image";

import { fetchApi } from "@/lib/api";
import { Button, Textarea, Card, CardHeader, CardBody, CardFooter, Divider, } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@heroui/input";
import Footer from "../layout/Footer";
import NavbarHeader from "../layout/NavbarHeader";
import { useSession } from "next-auth/react";

export default function LandingPage() {
    const [text, setText] = useState("");

    const handleChange = (e: any) => {
        setText(e.target.value);
    };

    const router = useRouter();

    const { data: session, update } = useSession();


    const [user, setUser] = useState({})
    useEffect(() => {
        if (session && session.user) {
            setUser(session.user)
            console.log(session.user)
        }
    }, [session])


    console.log(session);

    const handleJoin = async () => {
        console.log("join", text);
        const response = await fetchApi("hunt/find", { method: "POST", body: { code: text } });

        console.log("response : ", response);
        if (response) {

            const huntId = response.hunt._id;

            console.log("ID :", huntId);

            const updateSession = await update({ ...user, huntId: huntId })

            router.push(`/team?code=${encodeURIComponent(text)}`);
        }
    };

    return (
        <>
            <section className="relative h-screen  flex flex-col bg-greyBg ">
                {/* Barre supérieure */}
                <div className="h-[10vh]">
                    <NavbarHeader />
                </div>

                {/*                 <div className="flex items-center justify-between w-full bg-oceanBlue px-6 py-4 shadow-md">
                    <h1 className="text-xl font-bold text-midnightBlue">OnePisen</h1>
                    <Button
                        className="rounded-lg px-4 py-2 bg-white hover:bg-blue-dark"
                        onClick={() => console.log("Créer un event")}
                    >
                        Créer un event
                    </Button>
                </div> */}

                {/* Contenu principal */}
                <div className="flex flex-col items-center justify-evenly flex-grow mx-6">
                    {/* Section avec titre et logo */}


                    {/* Section centrale pour le code d'accès */}
                    <div className="flex flex-col items-center text-center justify-center items-center gap-20 py-20">
                        {/* <h3 className="text-xl md:text-2xl mb-2 text-midnightBlue">Code d'accès</h3>
 */}


                        <div className="bg-greyBg flex flex-row gap-5 bg-white rounded-full justfiy-center items-center shadow-md">
                            <Input
                                /* disableAutosize */
                                validationBehavior="native"
                                className="border-gray-500 rounded-full"
                                value={text}

                                onChange={handleChange}
                                placeholder="Enter code"
                            />
                            <Button
                                className="rounded-full bg-lightBlueBg uppercase font-bold tracking-[0.1rem]"
                                onPress={handleJoin}
                            >
                                Join
                            </Button>
                        </div>
                        <div className="bg-white rounded-full p-2 flex flex-col md:flex-row items-center justify-start md:ml-60 w-full max-w-4xl">
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




            </section >
            {/* Footer */}
            < Footer />
        </>
    );
}
