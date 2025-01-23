"use client";

import { Hunt } from "@/models/Hunt";
import { Button } from "@heroui/react";
import { fetchApi } from "@/lib/api";
import clsx from 'clsx';


export default function HuntModal({ isOpen, hunt, onNext, onClose } : { isOpen: boolean, hunt: Hunt | null, onClose: () => void }) {
  if (!isOpen || !hunt) return null; // Ne pas afficher si le modal est fermé ou aucun événement n'est sélectionné

  const start_game = async () => {

        await fetchApi("organizer/open", {
          method: "PUT",
          body: { huntId: hunt._id },
        }).then(() =>{
         console.log("good_open");
         onNext();}
      ).catch((err) => console.error(err));
      }
 
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          Voulez-vous lancer l'événement : {hunt.name} ?
        </h2>
        <div className="flex justify-between">
          {/* Bouton Lancer */}
          <Button 
          onPress={hunt.status === 'closed' ? start_game : onNext}
          className={clsx(
            "px-4 py-2 rounded bg-green-500 hover:bg-gray text-white",
          )}
          >
          {hunt.status === 'closed' ? 'Ouvrir' : 'Dashboard'}
          </Button>

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
