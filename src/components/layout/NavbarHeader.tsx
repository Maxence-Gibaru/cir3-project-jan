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
import { useState } from "react";
import { useRouter } from "next/navigation"
import Menu from "./menu/Menu";

export default function NavbarHeader() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const user = {
        firstName: "Maxence",
        lastName: "GIBARU"
    }

    return (
        <Navbar
            className="fixed bg-white bg-opacity-80 backdrop-blur-md shadow-md py-3 h-[10vh]"
            shouldHideOnScroll
            isBordered
            isBlurred
        >
            <NavbarBrand>
                <Link href="/">
                    <div className="relative h-20 w-20">
                        {/* Logo */}
                        {/* <Image
                            alt="Logo"
                            className="relative h-20 w-20 object-cover"
                            src={require("@/assets/logo-nobg.png")}
                        /> */}
                    </div>
                </Link>
            </NavbarBrand>
            
            <NavbarContent className="absolute top-4 left-4">
                            <Menu />
            </NavbarContent>
            {/* Centrer le contenu dans la Navbar */}
            <NavbarContent justify='center' className="hidden sm:flex gap-4">
                <NavbarItem>
                    <Link href="/about" className="text-gray-700 text-lg">
                        About Us
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link href="/services" className="text-gray-700 text-lg">
                        Services
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link href="/contact" className="text-gray-700 text-lg">
                        Contact
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link href="/blog" className="text-gray-700 text-lg">
                        Blog
                    </Link>
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
                                color="secondary"
                                name={user.firstName + " " + user.lastName}
                                size="sm"

                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2">
                                <p className="font-semibold">Signed in as</p>
                                <p className="font-semibold">
                                    {user.firstName} {user.lastName}
                                </p>
                            </DropdownItem>
                            <DropdownItem key="divider" />
                            <DropdownItem key="settings">
                                <Link
                                    href={{
                                        pathname: `/profile`,

                                    }}
                                >
                                    My Profile
                                </Link>
                            </DropdownItem>

                            {/* <DropdownItem key="team_settings">My Settings</DropdownItem>
              <DropdownItem key="configurations">
                Configurations Face ID
              </DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
                            <DropdownItem onPress={() => {
                                /* handleLogout(); */
                            }} key="logout" color="danger">

                                Log Out

                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                ) : (
                    <Button onPress={() => {
                        router.push("/sign-in");
                    }}
                        className="text-white font-medium bg-customPurple400 font-poppins border border-customPurple400 px-4 py-2 rounded-xl ">
                        Connexion
                    </Button>)
                }
            </NavbarContent>
        </Navbar>
    );
}
