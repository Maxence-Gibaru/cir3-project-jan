// @ts-nocheck

"use client";

import CodeArea from "@/components/pages/TextArea";
import { Button } from "@heroui/react";
import { useState } from "react";
import IAModalApp from "../ui/IAModal";

interface RessourcesCreationPageProps {
  title: string;
  chapters: string[];
  setTitle: Dispatch<SetStateAction<string>>;
  setChapters: Dispatch<SetStateAction<string[]>>;
  onNext: () => void; // Nouvelle prop
}

export default function RessourcesCreationPage({ chapters, title, setChapters, setTitle, onNext }: RessourcesCreationPageProps) {
  const [notification, setNotification] = useState(""); // État pour la notification

  // Vérifier si tous les champs sont remplis
  const validateFields = () => {
    if (!title.trim()) {
      setNotification("Le titre doit être rempli.");
      return false;
    }
    if (!chapters[0].trim()) {
      setNotification("L'introduction doit être remplie.");
      return false;
    }
    for (let i = 1; i < chapters.length; i++) {
      if (!chapters[i].trim()) {
        setNotification(`Le chapitre ${i} doit être rempli.`);
        return false;
      }
    }
    setNotification(""); // Réinitialiser la notification
    return true;
  };

  // Gérer la validation lors de la pression sur le bouton
  const handleNext = () => {
    if (validateFields()) {
      onNext();
    }
  };

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
      updateChapter(0, response);
    } else if (section.startsWith("chapter")) {
      const chapterIndex = parseInt(section.split("-")[1], 10); // Correspond à l'index
      updateChapter(chapterIndex, response); // Met à jour le chapitre
    }
  };
  
  // Fermer la notification
  const closeNotification = () => {
    setNotification("");
  };

  return (
    <div className="min-h-screen bg-greyBg flex flex-col items-center gap-6 py-8 px-4">
      {/* Titre principal */}
      <h1 className="text-3xl font-bold text-center">
        Créer l&apos;histoire de la chasse au trésor
      </h1>

      <div className="w-1/2 max-w-sm flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Nom de l&apos;histoire :
        </h2>
        <CodeArea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          classname="border border-gray-300 flex flex-row gap-5 bg-white rounded-3xl justify-center items-center shadow-md"
        />
      </div>

      <div className="w-1/2 max-w-sm flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-2 text-center">
          Introduction :
        </h2>
        <CodeArea
          value={chapters[0]}
          onChange={(e) => updateChapter(0, e.target.value)}
          classname="border border-gray-300 flex flex-row gap-5 bg-white rounded-3xl justify-center items-center shadow-md"
        />
      </div>

      <div className="w-full max-w-md flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4 text-center">Chapitres :</h2>
        {chapters.slice(1).map((chapter, index) => (
          <div
            key={index}
            className="mb-4 border border-gray-200 p-4 rounded-2xl bg-white shadow-md w-full "
          >
            <h3 className="text-lg font-medium mb-2 text-center">
              Chapitre {index + 1} :
            </h3>
            <CodeArea
              value={chapter}
              onChange={(e) => updateChapter(index + 1, e.target.value)}
              classname="w-full resize-none border border-gray-400 rounded-2xl p-2 bg-gray-100 overflow-y-auto overflow-x-hidden break-words shadow-xl"
            />
            <div className="w-full flex justify-center mt-8">
              <Button
                className="bg-red text-white px-4 py-2 rounded hover:bg-red-300"
                onPress={() => removeChapter(index)}
              >
                Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-md flex justify-center">
        <Button
          className="bg-darkBlueBg text-white rounded-2xl px-6 py-3 shadow-xl hover:bg-darkBlueHoverBg"
          onPress={addChapter}
        >
          Ajouter un chapitre
        </Button>
      </div>

      {/* Bouton pour ouvrir le modal en haut à droite */}
      <div className="fixed bottom-4 right-4 z-50">
        <IAModalApp
          title={title}
          chapters={chapters}
          onIaResponse={handleIaResponse}
        />
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 bg-red text-white p-4 rounded-md shadow-md z-50">
          <div className="flex justify-between items-center">
            <span>{notification}</span>
            <Button className="ml-4 text-white" onPress={closeNotification}>
              &#x2715;
            </Button>
          </div>
        </div>
      )}

      <div className="w-full max-w-md flex justify-center mt-8">
        <Button onPress={handleNext} className="bg-blueBg text-white px-6 py-3 rounded-2xl shadow-xl hover:bg-blueHoverBg">
          Valider
        </Button>
      </div>
    </div>
  );
}
