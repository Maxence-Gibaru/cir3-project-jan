import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import Link from "next/link";

export default function PlayerMenu() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="text-white bg-darkBlueBg font-bold rounded">Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu className="text-white bg-darkBlueBg rounded">
        <DropdownItem key="Ressource"><Link href="/ressources" className="text-white-500 underline">page des ressources</Link></DropdownItem>
        <DropdownItem key="playerrules"><Link href="/playerrules" className="text-white-500 underline">Règles</Link></DropdownItem>
        <DropdownItem key="HomePage"><Link href="/" className="text-red-500 underline">Déconnexion</Link></DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
