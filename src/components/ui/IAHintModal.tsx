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

export default function IAModalHintApp({onIaResponse }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [userPrompt, setUserPrompt] = useState(""); // Stocke le prompt
    const [output, setOutput] = useState("");


    const handleSendPrompt = async () => {
      let fullPrompt = `Tu es un scénariste pour des chasses au trésor et j'aimerais que tu m'aides pour un indice pour ce rendre a cette endroit.`;
      fullPrompt += `\n${userPrompt}`;
      fullPrompt += "\nEn français. Réponse avec une phrase courte.";
  
      console.log("Prompt envoyé :", fullPrompt);
  
      const options = {
        method: "POST",
        body: fullPrompt,
      };
  
      const response = await fetchApi("generate", options);
      const data = await response.output;
  
      setOutput(data);
      console.log("Réponse de l'IA :", data);
  
      onIaResponse(data); // Mettre à jour avec la réponse de l'IA
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
                    width={30} 
                    height={30}
                    className="mx-auto"
                  />
              </Button>
              <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-white rounded-lg border border-gray-200 shadow-md">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Demandez à l'IA
              </ModalHeader>
              <ModalBody>    
                {/* Zone de saisie pour le prompt */}
                <div className="mb-4 bg-gray-100 rounded-2xl border border-gray-400 shadow-xl">
                  <Input
                    placeholder="Entrez l'endroit de l'indice"
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
