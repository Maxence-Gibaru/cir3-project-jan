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
  }}>Open Modal</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className="bg-opacity-75 bg-gray-300 rounded-lg">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                    risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                    quam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non
                    risus hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                    quam.
                  </p>
                  <p>
                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit dolor
                    adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
                    officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                    nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                    deserunt nostrud ad veniam.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button className="bg-red-500 rounded-lg " variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button className="bg-green-500 rounded-lg" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  