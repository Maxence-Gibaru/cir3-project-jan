// MapPage.jsx
"use client"
import React, { useState } from 'react'
import dynamic from "next/dynamic"
import { Dispatch, SetStateAction } from "react";
import { Input, Button, Modal, Checkbox, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'
// Import dynamique du composant Map pour éviter les erreurs SSR
const Map = dynamic(() => import("@/components/ui/Map"), {
    ssr: false,
    loading: () => (
        <div className="h-[600px] w-full flex items-center justify-center bg-gray-100 rounded-lg">
            Chargement de la carte...
        </div>
    )
})

type Marker = {
    position: {
        lat: number;
        lng: number;
    };
    hint: string;
}
interface ImportmapPageProps {
    chapters: string[];
    markers: Marker[];
    setMarkers: Dispatch<SetStateAction<string>>;
    onNext: () => void; // Nouvelle prop
}
export default function Importmap({ chapters, markers, setMarkers, onNext }: ImportmapPageProps) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [markerText, setMarkerText] = useState('')
    const [currentPosition, setCurrentPosition] = useState({})
    const [currentTrésor, setCurrentTrésor] = useState(); // Nouvelle state pour le trésor

    const MAX_MARKERS=chapters.length;

    const addMarker = (position) => {
        if (markers.length >= MAX_MARKERS) {
            alert(`Vous ne pouvez pas ajouter plus de ${MAX_MARKERS} indices.`)
            return
        } else {
            const newPosition = { lat: position[0], lng: position[1] }

            setCurrentPosition(newPosition)
            setMarkerText('')
            onOpen();
        }
    }
    const handleAddMarker = () => {
        if (markerText.trim() !== '') {
            if (markers.length >= MAX_MARKERS) {
                alert(`Limite de ${MAX_MARKERS} indices atteinte.`)
                return
            }
            if(currentTrésor==true){
                //ajouter au première élément du tableau
                setMarkers(prev => [{
                    position: currentPosition,
                    hint: markerText.trim()
                },...prev])
            }
            else{
                setMarkers(prev => [...prev, {
                    position: currentPosition,
                    hint: markerText.trim()
                }])
            }
            onClose()
            setMarkerText('')
        }
    }
    const removeMarker = (index) => {
        setMarkers(prev => prev.filter((_, i) => i !== index))
    }

    return (
      <div className="flex flex-col bg-greyBg min-h-screen">
          <div className="absolute top-4 right-4 z-20 bg-primary text-white rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-bold text-center">
              Indices sur la carte : {markers.length}/{MAX_MARKERS}
            </h3>
          </div>
            <div className="z-10">
                <Map className="z-10 h-full w-full bg-gray-100"
                    markers={markers}
                    onMarkerAdd={addMarker}
                    onMarkerRemove={removeMarker}
                />
            </div>
            <div className='z-20 absolute bottom-4 right-4'>
            {markers.length > 0 && (
                <Button
                    color="primary"
                    onPress={onNext}
                    className="rounded-lg shadow-lg hover:bg-secondary text-white"
                >
                    Enregistrer les indices ({markers.length})
                </Button>
            )}
            </div>
            <div className='z-30'>
                <Modal className="z-30" isOpen={isOpen} onOpenChange={(isOpen) => !isOpen && onClose()}>
                    <ModalContent className="bg-white p-6 rounded-lg text-black">
                        {(onClose) => (
                            <>
                                <ModalHeader>Ajouter un indice ({markers.length + 1}/{MAX_MARKERS})</ModalHeader>
                                <ModalBody>
                                    <h2>Donner un texte qui permet de découvrir la position de l'indice</h2>
                                    <Input
                                        placeholder="Entrez votre indice ici"
                                        value={markerText}
                                        onChange={(e) => setMarkerText(e.target.value)}
                                        autoFocus
                                    />
                                    <Checkbox onChange={(e) => setCurrentTrésor(e.target.checked)}>Ceci est la position du trésor</Checkbox>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Annuler
                                    </Button>
                                    <Button color="primary" onPress={handleAddMarker}>
                                        Ajouter
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    )
}
