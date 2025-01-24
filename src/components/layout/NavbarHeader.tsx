// @ts-nocheck

'use client';

import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/react";

import { Skeleton } from "@heroui/react";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NavbarHeader({ status, onOpen }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // État pour le chargement

    const router = useRouter();

    const { data: session } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            setIsAuthenticated(true);
            setTimeout(() => setIsLoading(false), 500); // Simuler un temps de chargement
        } else {
            setIsAuthenticated(false);
            setIsLoading(false);
        }
    }, [status]);

    const user = session?.user;
    return (
        <Navbar
            className="bg-white bg-opacity-80 h-[10vh] md:h-20"
            shouldHideOnScroll
            isBordered
            isBlurred
        >
            <NavbarBrand>
                <Link href="/">
                    <div className="relative">
                        {/* Logo */}
                        <Image
                            src="/logoO.png"
                            alt="Logo de One P'ISEN"
                            width={72}
                            height={72}
                            className="mx-auto rounded-full"
                        />
                    </div>
                </Link>
            </NavbarBrand>

            <NavbarContent justify="center" className="hidden sm:flex gap-4">
                <NavbarItem>
                    <div className="text-gray-700 text-2xl font-bold">ONEPISEN</div>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                {isAuthenticated ? (
                    isLoading ? ( // Si en train de charger, afficher le Skeleton
                        <Skeleton 
                            className="rounded-full"
                            width={40}
                            height={40} // Taille de l'avatar simulé
                            animation="pulse" 
                        />
                    ) : (
                        <Dropdown className="bg-white">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="primary"
                                    name={user?.name}
                                    size="sm"
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Connecté en tant que</p>
                                    <p className="font-semibold">{user?.name || "organisateur"}</p>
                                </DropdownItem>
                                <DropdownItem key="divider" />
                                {session?.user?.role === "organizer" ? (
                                    <>
                                        <DropdownItem onPress={() => {
                                            router.push(`/organizer/events`)
                                        }} key="settings">
                                
                                                Consulter mes évènements
                                            
                                        </DropdownItem>
                                    </>
                                ) : null}
                                <DropdownItem
                                    onPress={() => {
                                        signOut();
                                    }}
                                    key="logout"
                                    color="danger"
                                >
                                    Déconnexion
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )
                ) : (
                    <Button
                        onPress={() => {
                            onOpen();
                        }}
                        className="text-gray-700 font-medium bg-customPurple400 font-poppins border border-customPurple400 px-4 py-2 rounded-xl"
                    >
                        Connexion
                    </Button>
                )}
            </NavbarContent>
        </Navbar>
    );
}
