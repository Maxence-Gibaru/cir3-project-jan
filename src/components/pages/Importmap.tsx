// MapPage.jsx
"use client"
import React, { useState } from 'react'
import dynamic from "next/dynamic"
import { Dispatch, SetStateAction } from "react";
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter ,useDisclosure } from '@nextui-org/react'
// Import dynamique du composant Map pour éviter les erreurs SSR
const Map = dynamic(() => import("@/components/ui/Map"), { 
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full flex items-center justify-center bg-gray-100 rounded-lg">
      Chargement de la carte...
    </div>
  )
})
const MAX_MARKERS = 10 // Limite maximale de marqueurs
type Marker = {
  position: {
      lat: number;
      lng: number;
  };
hint: string;
}
interface ImportmapPageProps {
  markers: Marker[];
  setMarkers: Dispatch<SetStateAction<string>>;
  onNext: () => void; // Nouvelle prop
}
export default function Importmap({markers, setMarkers, onNext}:ImportmapPageProps){
 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [markerText, setMarkerText] = useState('')
  const [currentPosition, setCurrentPosition] = useState(null)


  const addMarker = (position) => {
    if (markers.length >= MAX_MARKERS) {
      alert(`Vous ne pouvez pas ajouter plus de ${MAX_MARKERS} indices.`)
      return
    }else{
    setCurrentPosition(position)
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
      setMarkers(prev => [...prev, {
        position: currentPosition,
        text: markerText.trim()
      }])
      onClose()
      setMarkerText('')
    }
  }
  const removeMarker = (index) => {
    setMarkers(prev => prev.filter((_, i) => i !== index))
  }
  
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="p-4 bg-gray-100 rounded">
      <h3 className="text-lg font-bold mb-2">
          Indices sur la carte : {markers.length}/{MAX_MARKERS}
        </h3>
      </div>
      <div className="z-10">
      <Map className="z-10"
        markers={markers} 
        onMarkerAdd={addMarker}
        onMarkerRemove={removeMarker}
      />
      </div>
       {markers.length > 0 && (
        <Button 
          color="primary"   
          onPress={onNext}      
        >
          Enregistrer les indices ({markers.length})
        </Button>
      )}
  <div className='z-30'>
  <Modal className="z-30" isOpen={isOpen} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <ModalContent className="bg-white p-6 rounded-lg text-black">
          {(onClose) => (
            <>
              <ModalHeader>Ajouter un indice ({markers.length + 1}/{MAX_MARKERS})</ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Entrez votre indice ici"
                  value={markerText}
                  onChange={(e) => setMarkerText(e.target.value)}
                  autoFocus
                />
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
