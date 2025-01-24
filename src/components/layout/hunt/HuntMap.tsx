// @ts-nocheck
"use client";

import HuntDetails from "@/components/ui/HuntDetails";
import HuntStory from "@/components/ui/HuntStory";
import HuntWelcome from "@/components/ui/HuntWelcome";
import Qrcode from "@/components/ui/Qrcode";
import Rules from "@/components/ui/Rules";
import { Position } from "@/definitions";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { signOut } from "next-auth/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const icon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

interface HuntMapData {
  map: { lat: number; lng: number; zoom: number };
  stories: string[];
  hintsRevealed: string[];
  markers: Position[];
  lobbyCode: string;
}

export default function HuntMap({ map, stories, hintsRevealed, markers, lobbyCode }: HuntMapData) {
  const { isOpen: isWelcomeOpen, onOpen: onWelcomeOpen, onOpenChange: onWelcomeOpenChange } = useDisclosure();
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onOpenChange: onDetailsOpenChange } = useDisclosure();
  const { isOpen: isscanQcode, onOpen: onscanQcode, onOpenChange: scanQcodeChange } = useDisclosure();
  const { isOpen: isRules, onOpen: onRules, onOpenChange: scanRules } = useDisclosure();
  const { isOpen: isStoryOpen, onOpen: onStoryOpen, onOpenChange: onStoryOpenChange } = useDisclosure();

  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    onWelcomeOpen();
  }, [onWelcomeOpen])

  return (
    
    <div className="w-full text-black">
      <div className="absolute z-30 top-4 right-4">
        <Dropdown>
          <DropdownTrigger>
            <Button className="text-black bg-white rounded-md" variant="bordered">Menu</Button>
          </DropdownTrigger>
          <DropdownMenu className="text-black bg-white rounded-md" aria-label="Example with disabled actions" disabledKeys={["edit", "delete"]}>
            <DropdownItem key="copy"onPress={onRules}> Régles</DropdownItem>
            <DropdownItem key="new" onPress={onStoryOpen}>Histoire</DropdownItem>
            <DropdownItem key="HomePage" onPress={() => {
              signOut()
            }}>Déconnexion</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <section className="h-screen bg-vibrantPlum flex relative">
        <div className="z-10 flex-grow">
          <MapContainer
            center={[map.lat, map.lng]}
            zoom={map.zoom}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            {markers.map((position, index) => {
              if (index !== 0) {
                console.log("index : ", index);
                return <Marker
                  icon={icon}
                  key={index}
                  position={[position.lat, position.lng]}
                  eventHandlers={{
                    click: () => {
                      setSelectedMarker(index)
                      onDetailsOpen()
                    }
                  }}
                />
              }
            })}

          </MapContainer>
        </div>

        {/* Modal des Détails */}
        <HuntDetails
          isOpen={isDetailsOpen}
          onOpenChange={onDetailsOpenChange}
          hintsRevealed={hintsRevealed}
          selectedMarker={selectedMarker}
        />

        {/* Modal de Bienvenue */}
        <HuntWelcome
          isOpen={isWelcomeOpen}
          onOpenChange={onWelcomeOpenChange}
          hintsRevealed={hintsRevealed}
          stories={stories}
        />

        <Rules
          isOpen={isRules}
          onOpenChange={scanRules}
        />

        <HuntStory
          isOpen={isStoryOpen}
          onOpenChange={onStoryOpenChange}
          stories={stories}
        />

        <Qrcode
          isOpen={isscanQcode}
          onOpenChange={scanQcodeChange}
          lobbyCode={lobbyCode}
        />

     
      {/* Bouton sticky */}
      <div className="absolute z-30 bottom-4 right-4">
      <Button
        onPress={onscanQcode}
        className="bg-white text-vibrantPlum w-16 h-16 flex items-center justify-center p-4 rounded-full shadow-lg hover:bg-gray-200 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-6 h-6"
          fill="black"
        >
          <path d="M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48L0 80zM64 96l0 64 64 0 0-64L64 96zM0 336c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96zm64 16l0 64 64 0 0-64-64 0zM304 32l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm80 64l-64 0 0 64 64 0 0-64zM256 304c0-8.8 7.2-16 16-16l64 0c8.8 0 16 7.2 16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s7.2-16 16-16s16 7.2 16 16l0 96c0 8.8-7.2 16-16 16l-64 0c-8.8 0-16-7.2-16-16s-7.2-16-16-16s-16 7.2-16 16l0 64c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-160zM368 480a16 16 0 1 1 0-32 16 16 0 1 1 0 32zm64 0a16 16 0 1 1 0-32 16 16 0 1 1 0 32z" />
        </svg>
      </Button>
      </div>
      </section >
    </div>

  );
}