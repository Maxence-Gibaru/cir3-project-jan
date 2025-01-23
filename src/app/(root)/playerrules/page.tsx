"use client";


import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import Link from "next/link";

export default function CenteredTextPage() {
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-greyBg px-4">
      <div className="absolute z-30 top-4 right-4">
        <Dropdown>
          <DropdownTrigger>
            <Button className="text-black bg-white rounded-md" variant="bordered">Menu</Button>
          </DropdownTrigger>
          <DropdownMenu className="text-black bg-white rounded-md" aria-label="Example with disabled actions" disabledKeys={["edit", "delete"]}>
            <DropdownItem key="new"><Link href="/ressources">Récapitulatif histoire</Link></DropdownItem>
            <DropdownItem key="copy"><Link href="/hunt/">Carte</Link></DropdownItem>
            <DropdownItem key="HomePage"><Link href="/" className="text-red-500 underline">Déconnexion</Link></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
          <h1 className="text-black text-3xl font-bold underline mb-6 text-center">
        Règles de la partie :
      </h1>
      <p className="text-black text-lg leading-relaxed text-center max-w-3xl">
        Bienvenue dans cette chasse au trésor. <br />
        L&apos;objectif est de trouver le trésor caché dans la ville. Pour cela, votre équipe devra trouver des indices les uns après les autres pour avancer et à la fin arriver au trésor. Amusez-vous bien !
      </p>
    </div>
  );
}