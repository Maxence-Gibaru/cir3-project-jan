import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@heroui/react";
  
  export default function ModalApp() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
    return (
      <>
        <Button onPress={onOpen}   style={{
    backgroundColor: "#3B82F6", // Bleu (équivalent à bg-blue-500)
    color: "white", // Couleur du texte
    borderRadius: "0.5rem", // Arrondi des coins (équivalent à rounded-lg)
  }}>Informations</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className=" bg-gray-300 rounded-lg ">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Informations</ModalHeader>
                <ModalBody>
                  <p>
                    <br />
                    <strong>Bienvenue à l’aventure !</strong> <br /><br />
                    Aujourd’hui, la ville devient votre terrain de jeu. Parmi ses rues animées, ses ruelles secrètes et ses monuments chargés d’histoire, un trésor perdu attend d’être découvert.
                  </p>
                  <p>
                  Chaque indice vous guidera vers le suivant, vous faisant explorer des lieux emblématiques, mais aussi des coins cachés que vous n’avez peut-être jamais remarqués. Soyez attentifs, faites preuve de logique et d’un peu d’audace pour déchiffrer les énigmes. 
                  </p>
                  <p>
                  Formez votre équipe, ouvrez grands les yeux et préparez-vous à percer le mystère… À vous de jouer et bonne chasse au trésor !
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button className="bg-red rounded-lg " variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  