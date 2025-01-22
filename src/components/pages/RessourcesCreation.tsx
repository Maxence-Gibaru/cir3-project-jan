"use client";

import CodeArea from "@/components/pages/TextArea";
import { Button } from "@heroui/react";

import ModalApp from "../ui/Modal";
import { Dispatch, SetStateAction } from "react";
import IAModalApp from "../ui/IAModal";


interface RessourcesCreationPageProps {
  title: string;
  intro: string;
  chapters: string[];
  setTitle: Dispatch<SetStateAction<string>>;
  setIntro: Dispatch<SetStateAction<string>>;
  setChapters: Dispatch<SetStateAction<string[]>>;
  onNext: () => void; // Nouvelle prop
}

export default function RessourcesCreationPage({ chapters, title, intro, setChapters, setIntro, setTitle, onNext }: RessourcesCreationPageProps) {


  // Ajouter un nouveau chapitre
  const addChapter = () => {
    setChapters([...chapters, ""]);
  };


  // Supprimer un chapitre
  const removeChapter = (index: number) => {
    setChapters(chapters.filter((_, i) => i !== index));
  };

  // Mettre à jour le texte d'un chapitre
  const updateChapter = (index: number, newText: string) => {
    const newChapters = [...chapters];
    newChapters[index] = newText;
    setChapters(newChapters);
  };


  // Mettre à jour la section ciblée avec la réponse de l'IA
  const handleIaResponse = (section, response) => {
    if (section === "title") {
      setTitle(response);
    } else if (section === "intro") {
      setIntro(response);
    } else if (section.startsWith("chapter")) {
      const chapterIndex = parseInt(section.split("-")[1], 10); // Correspond à l'index
      updateChapter(chapterIndex, response); // Met à jour le chapitre
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center gap-6 py-8 px-4">
      {/* Bouton pour ouvrir le modal en haut à droite */}
      <div className="absolute top-4 right-4">
        <IAModalApp
          chapters={chapters}
          onIaResponse={handleIaResponse}
        />
      </div>

      {/* Titre principal */}
      <h1 className="text-3xl font-bold text-center">
        Créer l'histoire de la chasse au trésor
      </h1>

      <div className="w-full max-w-md flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Nom de l'histoire :
        </h2>
        <CodeArea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          classname="w-full h-20 resize-none border border-white rounded-md p-2 bg-white overflow-y-auto overflow-x-hidden break-words"
        />
      </div>

      <div className="w-full max-w-md flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Introduction :
        </h2>
        <CodeArea
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          classname="w-full h-20 resize-none border border-white rounded-md p-2 bg-white overflow-y-auto overflow-x-hidden break-words"
        />
      </div>

      <div className="w-full max-w-md flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4 text-center">Chapitres :</h2>
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="mb-4 border p-4 rounded-lg bg-white shadow-md w-full"
          >
            <h3 className="text-lg font-medium mb-2 text-center">
              Chapitre {index + 1} :
            </h3>
            <CodeArea
              value={chapter}
              onChange={(e) => updateChapter(index, e.target.value)}
              classname="w-full h-20 resize-none border border-gray-400 rounded-md p-2 bg-gray-200 overflow-y-auto overflow-x-hidden break-words"
            />
            <div className="w-full flex justify-center mt-8">
              <Button

                className="bg-red-500 text-white px-4 py-2 rounded"
                onPress={() => removeChapter(index)}
              >Supprimer</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-md flex justify-center">
        <Button
          className="bg-black text-white px-6 py-3 rounded"
          onPress={addChapter}>Ajouter un chapitre</Button>
      </div>

      <div className="w-full max-w-md flex justify-center mt-8">
        <Button onPress={onNext} className="bg-green-500 text-white px-6 py-3 rounded">
          Valider
        </Button>
      </div>
    </div>
  );
}
