"use client";

import HuntDetails from "@/components/ui/HuntDetails";
import HuntWelcome from "@/components/ui/HuntWelcome";
import { Position } from "@/definitions";
import { fetchApi } from "@/lib/api";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@heroui/react";
import L, { marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import { signOut} from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Input } from "@heroui/react"
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
  const [qrCode, setQrCode] = useState("")

  /* console.log("rerender"); */


  /* const {
    isOpen: isOpenSecond,
    onOpen: onOpenSecond,
    onOpenChange: onOpenChange
  } = useDisclosure(); */
  /* const {
    isOpen: isOpenthird,
    onOpen: onOpenthird,
    onClose: onClosethird,
  } = useDisclosure(); */

  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    onWelcomeOpen();
  }, [onWelcomeOpen])

/*   useEffect(() => {
    console.log("hintsRevealed", hintsRevealed)
    console.log(markers)
  }, [markers, hintsRevealed]) */

  /* const { data: session } = useSession(); */

/*   const handleMarkerClick = ({ markerData }: any) => {
    console.log("markerData :", markerData);
    setSelectedMarker(markerData);
    onDetailsOpen();
  }; */


  const handleQrCode = async () => {
    await fetchApi("guest/qr_code", { method: "GET", params: { lobby_code: lobbyCode, qr_code: qrCode } })
  }


  const handleChange = (e: any) => {
    setQrCode(e.target.value);
  }


  return (
    <div className="w-full text-black">
      <div className="absolute z-30 top-4 right-4">
        <Dropdown>
          <DropdownTrigger>
            <Button className="text-black bg-white rounded-md" variant="bordered">Menu</Button>
          </DropdownTrigger>
          <DropdownMenu className="text-black bg-white rounded-md" aria-label="Example with disabled actions" disabledKeys={["edit", "delete"]}>
            <DropdownItem key="new"><Link href="/ressources">Histoire</Link></DropdownItem>
            <DropdownItem key="copy"><Link href="/playerrules">Régles</Link></DropdownItem>
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

      </section >
      {/* Bouton sticky */}
      < div className="absolute z-30 bottom-4 right-4" >
        <Input
          className="bg-white rounded-full"
          value={qrCode}
          onChange={handleChange}

        />


        <Button className="bg-white" onPress={handleQrCode}>
          test
        </Button>
      </div >
    </div >
  );
}
