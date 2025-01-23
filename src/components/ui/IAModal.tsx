import { fetchApi } from "@/lib/api";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import Image from "next/image";

export default function IAModalApp({ title, chapters, onIaResponse }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userPrompt, setUserPrompt] = useState(""); // Stocke le prompt
  const [targetSection, setTargetSection] = useState("title"); // Section ciblée
  /* const [output, setOutput] = useState(""); */

  const handleSendPrompt = async () => {
    // Construire le contenu complet à inclure dans le prompt
    let fullPrompt = "Tu es un scénariste pour des chasses au trésor";

    if (targetSection === "title") {
      fullPrompt += `\nJ'aimerai que tu m'aides pour trouver un titre et donne moi que le titre`;
    } else if (targetSection === "intro") {
      fullPrompt += `\nJ'aimerai que tu m'aides pour trouver une intro  et donne moi que l'intro`;
    } else if (targetSection.startsWith("chapter")) {
      const chapterIndex = parseInt(targetSection.split("-")[1], 10);
      fullPrompt += `\nJ'aimerai que tu m'aides pour écrire le chapitre ${chapterIndex} et donne moi que le texte`;
    }

    if (title) {
      fullPrompt += `\n Voici le titre actuel : ${title}`;
    }

    if (chapters[0]) {
      fullPrompt += `\n Voici l'introduction actuelle : ${chapters[0]}`;
    }

    chapters.slice(1).forEach((chapter, index) => {
      if (chapter) {
        fullPrompt += `\n Voici le chapitre ${index + 1} : ${chapter}`;
      }
    });



    // Ajouter une demande contextuelle pour l'IA
    fullPrompt += " En français. Réponse de maximum 100 mots.\n";

    fullPrompt += userPrompt;

    console.log("Prompt envoyé :", fullPrompt);

    const options = {
      method: "POST",
      body: fullPrompt,
    };

    // Appeler l'API
    const response = await fetchApi("generate", options);
    const data = await response.output;

    /* setOutput(data); */

    console.log("Réponse de l'IA :", data);

    onIaResponse(targetSection, data); // Mettre à jour la section cible avec la réponse
    setUserPrompt(""); // Réinitialiser l'entrée utilisateur
    onOpenChange(); // Fermer le modal
  };


  return (
    <>
      <Button
        onPress={onOpen}
        className="text-white rounded-xl bg-darkBlueBg hover:bg-darkBlueHoverBg"

      >
        <Image
          src="/IA.png"
          alt="Aide IA"
          width={50}
          height={30}
          className="mx-auto"
        />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-white rounded-lg border border-gray-200 shadow-md">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Demandez à l&apos;IA
              </ModalHeader>
              <ModalBody>
                {/* Sélection de la section */}
                <div className="mb-4">
                  <label
                    htmlFor="section-select"
                    className="block mb-2"
                  >
                    Section ciblée :
                  </label>
                  <select
                    id="section-select"
                    value={targetSection}
                    onChange={(e) => setTargetSection(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded-2xl bg-gray-100 shadow-xl"
                  >
                    <option value="title">Titre</option>
                    <option value="intro">Introduction</option>
                    {chapters.slice(1).map((_, index) => (
                      <option key={index} value={`chapter-${index + 1}`}>
                        Chapitre {index + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Zone de saisie pour le prompt */}
                <div className="mb-4 bg-gray-100 rounded-2xl border border-gray-400 shadow-xl">
                  <Input
                    placeholder="Entrez des mots clés ou thème...."
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-red-500 rounded-lg hover:bg-red-300"
                  variant="light"
                  onPress={onClose}
                >
                  Annuler
                </Button>
                <Button
                  className="bg-green-500 rounded-lg hover:bg-green-300"
                  onPress={handleSendPrompt}
                  disabled={!userPrompt.trim()}
                >
                  Envoyer
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
