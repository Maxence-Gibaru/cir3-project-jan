"use client";

import { useState } from "react";
import ButtonComponent from "@/components/pages/Button";
import CodeArea from "@/components/pages/TextArea";
import ModalApp from "../ui/Modal";

export default function RessourcesCreationPage() {
  const [title, setTitle] = useState(""); // État pour le titre
  const [intro, setIntro] = useState(""); // État pour l'introduction
  const [chapters, setChapters] = useState([{ id: 1, text: "" }]); // Liste des chapitres

  // Ajouter un nouveau chapitre
  const addChapter = () => {
    const newId = chapters.length > 0 ? chapters[chapters.length - 1].id + 1 : 1;
    setChapters([...chapters, { id: newId, text: "" }]);
    console.log(chapters)
  };

  // Supprimer un chapitre
  const removeChapter = (id) => {
    setChapters(chapters.filter((chapter) => chapter.id !== id));
    console.log(chapters)
  };

  // Mettre à jour le texte d'un chapitre
  const updateChapter = (id, newText) => {
    setChapters(
      chapters.map((chapter) =>
        chapter.id === id ? { ...chapter, text: newText } : chapter
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center gap-6 py-8 px-4">
        {/* Bouton pour ouvrir le modal en haut à droite */}
      <div className="absolute top-4 right-4">
        <ModalApp />
      </div>    
      {/* Titre principal */}
      <h1 className="text-3xl font-bold text-center">Créer l'histoire de la chasse au trésor</h1>

      {/* Zone de saisie pour le titre */}
      <div className="w-full max-w-md flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-center">Nom de l'histoire :</h2>
        <CodeArea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          classname="w-full h-20 resize-none border border-white rounded-md p-2 bg-white overflow-y-auto overflow-x-hidden break-words"
        />
      </div>

      {/* Zone de saisie pour l'introduction */}
      <div className="w-full max-w-md flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-center">Introduction :</h2>
        <CodeArea
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          classname="w-full h-20 resize-none border border-white rounded-md p-2 bg-white overflow-y-auto overflow-x-hidden break-words"
        />
      </div>

      {/* Liste des chapitres */}
      <div className="w-full max-w-md flex flex-col items-center">
  <h2 className="text-xl font-semibold mb-4 text-center">Chapitres :</h2>
  {chapters.map((chapter) => (
   <div
   key={chapter.id}
   className="mb-4 border p-4 rounded-lg bg-white shadow-md w-full"
 >
   <h3 className="text-lg font-medium mb-2 text-center">
     Chapitre {chapter.id} :
   </h3>
   <CodeArea
     value={chapter.text}
     onChange={(e) => updateChapter(chapter.id, e.target.value)}
     classname="w-full h-20 resize-none border border-gray-400 rounded-md p-2 bg-gray-200 overflow-y-auto overflow-x-hidden break-words"
   />
   <div className="w-full flex justify-center mt-8">
     <ButtonComponent
       name="Supprimer"
       classname="bg-red-500 text-white px-4 py-2 rounded"
       link={null}
       onPress={() => removeChapter(chapter.id)}
     />
   </div>
 </div>


 
  
  ))}
</div>


      {/* Bouton pour ajouter un chapitre */}
      <div className="w-full max-w-md flex justify-center">
        <ButtonComponent
          name="Ajouter un chapitre"
          classname="bg-blue-500 text-white px-4 py-2 rounded"
          link={null}
          onPress={addChapter}
        />
      </div>

      {/* Bouton de validation */}
      <div className="w-full max-w-md flex justify-center mt-8">
        <ButtonComponent
          name="Valider"
          classname="bg-green-500 text-white px-6 py-3 rounded"
          link="/confirmation"
          onPress={null}
        />
      </div>
    </div>
  );
}
