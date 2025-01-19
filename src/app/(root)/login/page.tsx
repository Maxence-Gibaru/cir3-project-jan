"use client";

import Image from "next/image";
import { Button, Avatar, useDisclosure } from "@nextui-org/react"
import Link from "next/link"
import LoginPage from "@/components/pages/LoginPage"
import { useState } from "react"

/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; */


export default function HomePage() {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [selectedCard, setSelectedCard] = useState(0);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setIsImageLoaded(true);  // L'image de fond a été chargée
    };




    return (
        <>

            <LoginPage />
        </>
    );
}
