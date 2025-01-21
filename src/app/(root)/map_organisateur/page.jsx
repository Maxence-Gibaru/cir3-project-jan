"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import L from "leaflet";
import { useMap } from 'react-leaflet/hooks'
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
 
  const [selectedMarker, setSelectedMarker] = React.useState(null);
 
  function MyComponent() {
    const map = useMap()
    console.log('map center:', map.getCenter())
    return null
  }

  return (
    <div className="w-full text-white">
      <section className="h-screen bg-vibrantPlum flex relative">
        {/* Carte Leaflet */}
        <div className="z-10 flex-grow">
          <MapContainer
            center={[48.0, 3.0]}
            zoom={6}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MyComponent />
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
      </section>
    </div>
  );
}
