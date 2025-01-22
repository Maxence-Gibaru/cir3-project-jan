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
  
  export default function DefineHintModal({ maxClues }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [clues, setClues] = useState(Array(maxClues).fill("")); // Tableau des indices
    const [currentIndex, setCurrentIndex] = useState(0); // Index actuel
    const [currentClue, setCurrentClue] = useState(""); // Indice en cours de saisie
  
    const handleSaveClue = () => {
      if (currentClue.trim()) {
        const updatedClues = [...clues];
        updatedClues[currentIndex] = currentClue.trim();
        setClues(updatedClues); // Sauvegarde l'indice
        setCurrentClue(""); // Réinitialise la zone de saisie
  
        if (currentIndex < maxClues - 1) {
          setCurrentIndex(currentIndex + 1); // Passe à l'indice suivant
        }
  
        onOpenChange(); // Ferme le modal
      }
    };
  
    const handleReopen = () => {
      if (currentIndex < maxClues) {
        onOpen(); // Ouvre le modal
      } else {
        alert("Tous les indices ont été définis !");
      }
    };
  
    return (
      <>
        {/* Bouton pour ouvrir le modal */}
        <Button
          onPress={handleReopen}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Définir les indices
        </Button>
  
        {/* Modal */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className="bg-opacity-75 bg-gray-300 rounded-lg">
            {(onClose) => (
              <>
                <ModalHeader>
                  Définir l'indice {currentIndex + 1} / {maxClues}
                </ModalHeader>
                <ModalBody>
                  <div className="mb-4">
                    <Input
                      placeholder={`Saisissez l'indice ${currentIndex + 1}`}
                      value={currentClue}
                      onChange={(e) => setCurrentClue(e.target.value)}
                    />
                  </div>
                  {/* Liste des indices déjà définis */}
                  <ul className="list-disc ml-6">
                    {clues.map(
                      (clue, index) =>
                        clue && (
                          <li key={index}>
                            Indice {index + 1} : {clue}
                          </li>
                        )
                    )}
                  </ul>
                </ModalBody>
  
                <ModalFooter>
                  <Button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onPress={onClose}
                  >
                    Annuler
                  </Button>
                  <Button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onPress={handleSaveClue}
                    disabled={!currentClue.trim()}
                  >
                    Sauvegarder
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  