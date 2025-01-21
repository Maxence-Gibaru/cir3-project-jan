"use client";

import React from "react";
import ButtonComponent from "@/components/pages/Button";

export default function EventModal({ isOpen, event, onClose }) {
  if (!isOpen || !event) return null; // Ne pas afficher si le modal est fermé ou aucun événement n'est sélectionné

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          Voulez-vous lancer l'événement : {event.name} ?
        </h2>
        <div className="flex justify-between">
          {/* Bouton Lancer */}
          <ButtonComponent
            name="Lancer"
            classname="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            link={event.link} // Redirection vers la page de l'événement
            onPress={null}
          />
          {/* Bouton Annuler */}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}
