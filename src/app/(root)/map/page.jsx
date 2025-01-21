"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import L from "leaflet";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

// Corrige les icônes Leaflet
if (typeof window !== "undefined") {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  });
}

// Charge les composants de la carte uniquement côté client
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });


export default function Map() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenSecondModal, onOpen: onOpenSecondModal, onClose: onCloseSecondModal } = useDisclosure();
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  const handleMarkerClick = (markerData) => {
    setSelectedMarker(markerData);
    onOpen();
  };
  // Vérification de la première visite via localStorage
  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");

    if (!hasVisited) {
      onOpenSecondModal(); // Ouvre la modale si c'est la première visite
      localStorage.setItem("hasVisited", "true"); // Marque que l'utilisateur a visité la page
    }
  }, [onOpen]);

  const data1 = {
    Map: [{ lat: 51.50235101912438, lng: -0.13131603921719526, zoom: 13 }],Intro:[{text:"Bienvenue dans cette aventure mystérieuse. Suivez les indices pour découvrir un trésor caché."},{next_hint:"L'arrrdad dadazdaz dadadadaz"}]};

  const data2 = {Indices: [
    {
      id: 1, // Ajout d'un identifiant unique
      position: { lat: 51.50235101912438, lng: -0.13131603921719526 },
      texte:
        "Vous trouvez un parchemin ancien dans une bibliothèque abandonnée. Les mots gravés dessus parlent d'une clé cachée au pied d'un grand chêne.",
      direction: "nord-est",
    },
    {
      id: 2, // Ajout d'un identifiant unique
      position: { lat: 51.49306161734833, lng: -0.08307100250404045 },
      texte:
        "Sous le grand chêne, une boîte contient une carte indiquant un chemin menant à une grotte mystique.",
      direction: "sud",
    },
    {
      id: 3, // Ajout d'un identifiant unique
      position: { lat: 51.489003583408994, lng: -0.08787833712314398 },
      texte:
        "À l'entrée de la grotte, des symboles étranges pointent vers un passage secret derrière une cascade.",
      direction: "ouest",
    },
    {
      id: 4, // Ajout d'un identifiant unique
      position: { lat: 51.49380911051812, lng: -0.14127408949962117 },
      texte:
        "Derrière la cascade, vous trouvez une porte scellée avec une inscription demandant une offrande d'eau pure.",
      direction: "est",
    },
    {
      id: 5, // Ajout d'un identifiant unique
      position: { lat: 51.48793561970478, lng: -0.09045369495479516 },
      texte:
        "En offrant l'eau pure, la porte s'ouvre, révélant un trésor oublié depuis des siècles.",
      direction: "nord",
    },
  ]};
  return (
    <div className="w-full text-white">
      <section className="h-screen bg-vibrantPlum flex relative">
        {/* Carte Leaflet */}
        <div className="z-10 flex-grow">
          <MapContainer
            center={[data1.Map[0].lat, data1.Map[0].lng]}
            zoom={data1.Map[0].zoom}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Ajoute des marqueurs pour chaque indice */}
            {data2.Indices.map((indice, index) => (
              <Marker
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
            {onClose && (
              <>
                <ModalHeader className="text-xl font-bold">Indice Details</ModalHeader>
                <ModalBody className="text-base">
                  {selectedMarker && (
                    <>
                      <strong>Indice {selectedMarker.id}</strong>
                      <p>{selectedMarker.texte}</p>
                      <p>
                        <em>Direction: {selectedMarker.direction}</em>
                      </p>
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
              </>
            )}
          </ModalContent>
        </Modal>
        <Modal isOpen={isOpenSecondModal} onOpenChange={(isOpen) => !isOpen && onCloseSecondModal()}>
            <ModalContent className="bg-white p-6 rounded-lg text-black">
              <ModalHeader className="text-xl font-bold">Bienvenue dans l'aventure</ModalHeader>
              <ModalBody className="text-base">
                <p>{data1.Intro[0].text}</p>
                <p>{data1.Intro[1].next_hint}</p>
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
      </section>
    </div>
  );
}
