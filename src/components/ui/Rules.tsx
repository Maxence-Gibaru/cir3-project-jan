// @ts-nocheck
"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
interface RulesProps {
  isOpen: boolean;
  onOpenChange: () => void;
  lobbyCode: string;
}
export default function Rules({isOpen, onOpenChange}: RulesProps) {

  return (
    <>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
    <ModalContent className="bg-white rounded-lg">
        {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1"> Règles de la partie :</ModalHeader>
                <ModalBody>
      <p className="text-black text-lg leading-relaxed text-center max-w-3xl">
        Bienvenue dans cette chasse au trésor. <br />
        L&apos;objectif est de trouver le trésor caché dans la ville. Pour cela, votre équipe devra trouver des indices les uns après les autres pour avancer et à la fin arriver au trésor. Amusez-vous bien !
          </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="bg-red rounded-lg " variant="light" onPress={onClose}>
                            Fermer
                        </Button>
                    
                    </ModalFooter>
                </>
            )}
        </ModalContent>
    </Modal>
</>
  );
}