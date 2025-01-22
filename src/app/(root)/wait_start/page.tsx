"use client";
import NavbarHeader from "@/components/layout/NavbarHeader";
import Modal from "@/components/ui/InfoModal";
import "./wait.css";
import { Spinner } from "@heroui/react";
import { useState, useEffect } from "react";
import { fetchApi } from "@/lib/api";
import router from "next/router";
import { checkCustomRoutes } from "next/dist/lib/load-custom-routes";

export default function Page() {

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


    const ckeck_start = async () => {

        await fetchApi("/api/guest/check_is_started", {
            method: "GET",
        }).then((data) => {

            if (data.isStarted) {
                alert("La chasse au trésor a commencé !");
                router.push('map');
            }
        }
        ).catch((errorMessage: string) => {
            setError(errorMessage);
        });
    };

    useEffect(() => {
        const intervalStart = setInterval(() => {
            ckeck_start();
        }, 5000);

        return () => clearInterval(intervalStart);
    }, []);



    return (
        <div className="flex flex-col bg-greyBg h-screen">

            <NavbarHeader />
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