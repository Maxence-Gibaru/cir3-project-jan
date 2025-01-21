import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";

export default function Menu() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button className="text-white bg-boldBlue rounded">Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu className="text-white bg-boldBlue rounded">
        <DropdownItem key="HomePage">Page d'accueil</DropdownItem>
        <DropdownItem key="TeamPage">Page d'équipe</DropdownItem>
        <DropdownItem key="ValidationPage">Validation</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
