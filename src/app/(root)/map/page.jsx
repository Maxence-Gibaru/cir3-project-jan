"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import L from "leaflet";
import { useSession } from "next-auth/react";
import { fetchApi } from "@/lib/api";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";


const icon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Charge les composants de la carte uniquement côté client
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

export default function Map() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenSecondModal,
    onOpen: onOpenSecondModal,
    onClose: onCloseSecondModal,
  } = useDisclosure();
  const {
    isOpen: isOpenthirdModal,
    onOpen: onOpenthirdModal,
    onClose: onClosethirdModal,
  } = useDisclosure();

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);


  const { data: session } = useSession();

  if (session) {
    console.log(session);
  }

  const data1 = {
    map: [
      { lat: 51.50235101912438, lng: -0.13131603921719526, zoom: 13 },
    ],
    text: "Bienvenue dans cette aventure mystérieuse. Suivez les indices pour découvrir un trésor caché.",
    hint: "L'arrrdad dadazdaz dadadadaz",
  };

  const data2 = {
    position: { lat: 51.50235101912438, lng: -0.13131603921719526 },
    hint: "À l'entrée de la grotte, des symboles étranges pointent vers un passage secret derrière une cascade.",
    text: "Bienvenue dans cette aventure mystérieuse. Suivez les indices pour découvrir un trésor caché.",
    team_time: "1h 30min",
  };

  const handleMarkerClick = (markerData) => {
    setSelectedMarker(markerData);
    onOpen();
  };

  // Vérification de la première visite via localStorage
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      onOpenSecondModal();
      localStorage.setItem("hasVisited", "true");
    }
  }, [onOpenSecondModal]);

  // Ajoute un marqueur (simulation d'une récupération via API)
  useEffect(() => {
    const addMarker = async () => {
      await fetchApi("guest/markers", {
        method: "GET",
        params: { markersCount: markers.length }
      }).then((data) => setMarkers(data)).catch((err) => console.error(err), 5000);
      // const newMarker = await new Promise((resolve) =>
      //   setTimeout(() => resolve(data2), 500)
      // );
      // console.log(newMarker);
      // if (newMarker?.close) {
      //   console.log("Trésor trouvé");
      //   setSelectedMarker(newMarker);
      //   onOpenthirdModal();
      // } else {
      //   setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      // }
    };
    addMarker();
  }, [onOpenthirdModal]);

  return (
    <div className="w-full text-black">
      <div className="absolute z-30 top-4 right-4">
        <Dropdown>
          <DropdownTrigger>
            <Button className="text-black bg-white rounded-md" variant="bordered">Menu</Button>
          </DropdownTrigger>
          <DropdownMenu className="text-black bg-white rounded-md" aria-label="Example with disabled actions" disabledKeys={["edit", "delete"]}>
            <DropdownItem key="new"><Link href="/ressources">Récapitulatif histoire</Link></DropdownItem>
            <DropdownItem key="copy"><Link href="/playerrules">Régles</Link></DropdownItem>
            <DropdownItem key="HomePage"><Link href="/" className="text-red-500 underline">Déconnexion</Link></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <section className="h-screen bg-vibrantPlum flex relative">

        <div className="z-10 flex-grow">
          <MapContainer
            center={[data1.map[0].lat, data1.map[0].lng]}
            zoom={data1.map[0].zoom}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {markers.map((indice, index) => (
              <Marker
                icon={icon}
                key={index}
                position={[indice.position.lat, indice.position.lng]}
                eventHandlers={{
                  click: () => handleMarkerClick(indice),
                }}
              />
            ))}
          </MapContainer>
        </div>

        {/* Modal pour afficher les détails des indices */}
        <Modal isOpen={isOpen} onOpenChange={(isOpen) => !isOpen && onClose()}>
          <ModalContent className="bg-white p-6 rounded-lg text-black">
            <ModalHeader className="text-xl font-bold">Indice Details</ModalHeader>
            <ModalBody className="text-base">
              {selectedMarker && (
                <>
                  <strong>Indice</strong>
                  <p>{selectedMarker.hint}</p>
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                color="primary"
                onPress={onClose}
              >
                Fermer
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal pour la première visite */}
        <Modal
          isOpen={isOpenSecondModal}
          onOpenChange={(isOpen) => !isOpen && onCloseSecondModal()}
        >
          <ModalContent className="bg-white p-6 rounded-lg text-black">
            <ModalHeader className="text-xl font-bold">
              Bienvenue dans l'aventure
            </ModalHeader>
            <ModalBody className="text-base">
              <p>{data1.text}</p>
              <p>{data1.hint}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                color="primary"
                onPress={onCloseSecondModal}
              >
                Commencer l'aventure
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal pour la fin de l'aventure */}
        <Modal
          isOpen={isOpenthirdModal}
          onOpenChange={(isOpen) => !isOpen && onClosethirdModal()}
        >
          <ModalContent className="bg-white p-6 rounded-lg text-black">
            <ModalHeader className="text-xl font-bold">
              Vous avez trouvé le trésor
            </ModalHeader>
            <ModalBody className="text-base">
              {selectedMarker && <p>Temps de réalisation : {selectedMarker.team_time}</p>}
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                color="primary"
                onPress={onClosethirdModal}
              >
                Sortir de l'aventure
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </section>
      {/* Bouton sticky */}
      <div className="absolute z-30 bottom-4 right-4">
        <Link
          href="/qr-code"
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
        </Link>
      </div>
    </div>
  );
}
