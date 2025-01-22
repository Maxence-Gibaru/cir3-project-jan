
import React, { useState } from "react";
import FichierJson from "@/app/(root)/organisatorList/organisatorjson.json"

export default function teamBox(nomChasse: number, nomOrganisateur:string) {
  const [isActive, setIsActive] = useState(true);
  return (
    <>
      {isActive && (
    <div className="boutonEquipe m-3 py-1 px-3 border-solid border-2 rounded-2xl border-blue-400  hover:shadow-lg flex justify-between bg-lightBlueBg" key={nomOrganisateur}>
        <div className="p-2">
          <h3 className="font-bold">Organisateur : {nomOrganisateur}</h3>
          <p className="font-bold">Chasse n°{nomChasse}</p>
          </div>
          <div>
        <button
          className="text-red-500 text-5xl hover:text-red-400 pl-5 pr-2"
          onClick={() => setIsActive(false)}
        >
          <img src="cross.svg" alt="Supprimer" className="max-h-14"/>
        </button>
      
    </div>
    </div>
    )}
      </>
  )
}




