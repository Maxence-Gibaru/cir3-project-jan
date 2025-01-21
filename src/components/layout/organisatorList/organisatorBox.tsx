
import React from "react"

export default function teamBox(nomChasse: number, nomOrganisateur:string) {
  //const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="boutonEquipe m-3 py-1 px-3 border-solid border-2 rounded-2xl border-blue-400 bg-blue-400 hover:shadow-lg flex justify-between" key={nomOrganisateur}>
        <div className="p-2">
          <h3 className="font-bold">Organisateur : {nomOrganisateur}</h3>
          <p className="font-bold">Chasse n°{nomChasse}</p>
          </div>
        <button className="text-red-500 text-5xl hover:text-red-400 pl-5 pr-2" key={nomChasse}><img  src="cross.svg" className="max-h-14"></img></button>
    </div>
  )

}


