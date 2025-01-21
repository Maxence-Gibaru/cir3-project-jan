"use client";

import { useState } from "react";
import ButtonComponent from "@/components/pages/Button";
import CodeArea from "@/components/pages/TextArea";

export default function RessourcesCreationPage() {
  const [title, setTitle] = useState(""); // État pour le titre
  const [intro, setIntro] = useState(""); // État pour l'introduction
  const [chapters, setChapters] = useState([{ id: 1, text: "" }]); // Liste des chapitres

  // Ajouter un nouveau chapitre
  const addChapter = () => {
    const newId = chapters.length > 0 ? chapters[chapters.length - 1].id + 1 : 1;
    setChapters([...chapters, { id: newId, text: "" }]);
  };

  // Supprimer un chapitre
  const removeChapter = (id) => {
    setChapters(chapters.filter((chapter) => chapter.id !== id));
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
      {/* Titre principal */}
      <h1 className="text-3xl font-bold text-center">Créer votre ressource</h1>

      {/* Zone de saisie pour le titre */}
      <div className="w-full max-w-md flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-center">Titre :</h2>
        <CodeArea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Zone de saisie pour l'introduction */}
      <div className="w-full max-w-md flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-center">Introduction :</h2>
        <CodeArea
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          className="w-full"
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
    <div className="w-full">
      <CodeArea
        value={chapter.text}
        onChange={(e) => updateChapter(chapter.id, e.target.value)}
        className="w-full h-32 resize-none border rounded-md p-2 overflow-hidden"
      />
    </div>
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
