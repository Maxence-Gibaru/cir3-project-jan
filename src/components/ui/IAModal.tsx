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

export default function IAModalApp({ chapters, onIaResponse}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userPrompt, setUserPrompt] = useState(""); // Stocke le prompt
  const [targetSection, setTargetSection] = useState("title"); // Section ciblée
  const [output, setOutput] = useState("");


  const options = {
    method: "POST",
    body: userPrompt
  }

  const handleSendPrompt = async () => {
    options.body = options.body.concat(" En francais. Réponse de maximum 100 mots");

    console.log(options.body);
    
    const response = await fetchApi('generate', options)
    
    const data = await response.output;

    setOutput(data);

    console.log("Ia response", output);

    onIaResponse(targetSection, data); // Envoie la réponse à la section sélectionnée
    setUserPrompt(""); // Réinitialise la saisie
    onOpenChange(); // Ferme le modal
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="text-white rounded-xl bg-darkBlueBg hover:bg-darkBlueHoverBg"
        
      >
        Aide IA
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-white rounded-lg border border-gray-200 shadow-md">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Demandez à l'IA
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
                    {chapters.map((_, index) => (
                      <option key={index} value={`chapter-${index}`}>
                      Chapitre {index + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Zone de saisie pour le prompt */}
                <div className="mb-4 bg-gray-100 rounded-2xl border border-gray-400 shadow-xl">
                  <Input
                    placeholder="Entrez votre demande ou sujet..."
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
