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

export default function IAModalApp({ chapters, onIaResponse }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [userPrompt, setUserPrompt] = useState(""); // Stocke le prompt
  const [targetSection, setTargetSection] = useState("title"); // Section ciblée



  const handleSendPrompt = async () => {

    const response = fetchApi("generate", { method: "POST", body: userPrompt })

    const simulatedResponse = response.output;

    onIaResponse(targetSection, simulatedResponse); // Envoie la réponse à la section sélectionnée
    setUserPrompt(""); // Réinitialise la saisie
    onOpenChange(); // Ferme le modal
  };

  return (
    <>
      <Button
        onPress={onOpen}
        style={{
          backgroundColor: "#3B82F6",
          color: "white",
          borderRadius: "0.5rem",
        }}
      >
        Aide IA
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-opacity-75 bg-gray-300 rounded-lg">
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
                    className="block font-bold mb-2"
                  >
                    Section ciblée :
                  </label>
                  <select
                    id="section-select"
                    value={targetSection}
                    onChange={(e) => setTargetSection(e.target.value)}
                    className="w-full p-2 border border-gray-400 rounded-md bg-white"
                  >
                    <option value="title">Titre</option>
                    <option value="intro">Introduction</option>
                    {chapters.map((chapter) => (
                      <option key={chapter.id} value={`chapter-${chapter.id}`}>
                        Chapitre {chapter.id}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Zone de saisie pour le prompt */}
                <div className="mb-4">
                  <Input
                    placeholder="Entrez votre demande ou sujet..."
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-red-500 rounded-lg"
                  variant="light"
                  onPress={onClose}
                >
                  Annuler
                </Button>
                <Button
                  className="bg-green-500 rounded-lg"
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
