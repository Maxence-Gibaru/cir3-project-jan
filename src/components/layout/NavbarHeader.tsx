'use client';

import {
    Avatar,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button
} from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function NavbarHeader({ status, onOpen }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (status === "authenticated") {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false)
        }
    }, [status])

    const { data: session } = useSession();

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

            {/*             <NavbarContent className="absolute top-4 left-4">
                <Menu />
            </NavbarContent> */}
            {/* Centrer le contenu dans la Navbar */}
            <NavbarContent justify='center' className="hidden sm:flex gap-4">
                <NavbarItem>
                    <div className="text-gray-700 text-2xl font-bold">
                        ONEPISEN
                    </div>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify='end'>
                {isAuthenticated ? (
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
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">
                                    {user?.name}
                                </p>
                            </DropdownItem>
                            <DropdownItem key="divider" />
                            {/*    <DropdownItem key="settings">
                                <Link
                                    href={{
                                        pathname: `/profile`,

                                    }}
                                >
                                    My Profile
                                </Link>
                            </DropdownItem> */}
                            {session?.user?.role === "organizer" ?
                                (
                                    <>
                                        <DropdownItem key="settings">
                                            <Link
                                                href={{
                                                    pathname: `/organizer/events`,

                                                }}
                                            >
                                                Consulter mes évènements
                                            </Link>
                                        </DropdownItem>
                                    </>
                                ) : (<></>)}

                            {/* <DropdownItem key="team_settings">My Settings</DropdownItem>
              <DropdownItem key="configurations">
                Configurations Face ID
              </DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
                            <DropdownItem onPress={() => {
                                signOut()

                            }} key="logout" color="danger">

                                Log Out

                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                ) : (
                    <Button onPress={() => {
                        onOpen()
                    }}
                        className="text-gray-700 font-medium bg-customPurple400 font-poppins border border-customPurple400 px-4 py-2 rounded-xl ">
                        Connexion
                    </Button>)
                }
            </NavbarContent>
        </Navbar>
    );
}
