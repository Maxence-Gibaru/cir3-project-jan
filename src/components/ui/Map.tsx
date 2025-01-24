// Map.jsx
"use client"
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { Button } from '@nextui-org/react'
import 'leaflet/dist/leaflet.css'
import clsx from 'clsx'
// Configuration de l'icône des marqueurs
const icon = L.icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// Composant pour gérer les clics sur la carte
const MapClickHandler = ({ onMarkerAdd }) => {
  useMapEvents({
    click: (e) => {
      onMarkerAdd([e.latlng.lat, e.latlng.lng])
    },
  })
  return null
}

const Map = ({ markers, onMarkerAdd, onMarkerRemove }) => {
  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden border border-gray-200">
      <MapContainer
        center={[46.603354, 1.888334]}
        zoom={6}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {markers.map((marker, index) => (
          <Marker 
            key={index} 
            position={marker.position}
            icon={icon}
          >
            <Popup>
              <div className="p-2">
                <h2 className={clsx({ "font-bold text-green-500": marker.istreasure === true})}>
                {marker.istreasure === true ? 'Position trésor' : `Indice ${index}`}
              </h2>
                <p className="text-black mb-2">{marker.hint}</p>
                <Button 
                  
                  size="sm" 
                  onPress={() => onMarkerRemove(index)}
                  className="w-full bg-red"
                >
                  Supprimer
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapClickHandler onMarkerAdd={onMarkerAdd} />
      </MapContainer>
    </div>
  )
}

export default Map