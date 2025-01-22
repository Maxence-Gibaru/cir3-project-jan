
import React, { useState } from "react";
import FichierJson from "@/app/(root)/organisatorList/organisatorjson.json"

export default function teamBox(nomChasse: number, nomOrganisateur:string) {
  const [isActive, setIsActive] = useState(true);
  return (
    <>
      {isActive && (
    <div className="boutonEquipe m-3 py-1 px-1 rounded-2xl flex justify-between bg-darkBlueBg text-white w-11/12  hover:shadow-lg" key={nomOrganisateur}>
        <div className="py-2 pl-5">
          <h3 className="font-bold">Organisateur : {nomOrganisateur}</h3>
          <p className="font-bold">Chasse n°{nomChasse}</p>
          </div>
          <div>
        <button
          className="text-red-500 text-5xl hover:text-red-400 py-2 px-5"
          onClick={() => setIsActive(false)}
        >
          <img src="cross.svg" alt="Supprimer" className="h-10"/>
        </button>
      
    </div>
    </div>
    )}
      </>
  )
}




