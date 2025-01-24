"use client";


/* import FichierJson from "@/app/(root)/organisatorList/organisatorjson.json" */
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; */

export default function HomePage() {


    /* const Listeparties = FichierJson.organisateur; */
    return (
        <div className="h-screen bg-greyBg text-black text-gray-700">
            <h1 className="flex justify-center h-1/6 text-4xl py-5 font-bold text-center items-center align-middle ">Liste des organisateurs</h1>
            <div className="h-5/6 flex flex-col justify-evenly items-center font-serif xl:flex-row xl:justify-evenly xl:flex-wrap ">
                {/* {Listeparties.map((organisateur) => (
                    OrganisatorBox(organisateur.numeroPartie, organisateur.name)
                ))} */}

                {/* <button className="w-fit py-3 px-5 my-5 border-solid border-2 rounded-2xl border-blue-300 bg-blue-500 font-bold hover:shadow-lg">Créer une équipe</button> */}
            </div>
        </div>
    )
}
