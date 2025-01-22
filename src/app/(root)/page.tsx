"use client";

import Image from "next/image";
import { Button, Avatar, useDisclosure } from "@nextui-org/react"
import Link from "next/link"

import { useEffect, useState } from "react"
import LandingPage from "@/components/pages/LandingPage";
import { useSession, signIn } from "next-auth/react";





/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; */


export default function HomePage() {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [selectedCard, setSelectedCard] = useState(0);
    const [isImageLoaded, setIsImageLoaded] = useState(false);


    const { data: session, status } = useSession();

    const handleImageLoad = () => {
        setIsImageLoaded(true);  // L'image de fond a été chargée
    };

    useEffect(() => {
        console.log("session info", session)
        console.log("status: ", status)
    }, [session])


    useEffect(() => {
        if (status === "unauthenticated") {
            signIn("guest-credentials");
        }
    }, [status]);

    return (
        <>
            <LandingPage />
        </>
    );
}
