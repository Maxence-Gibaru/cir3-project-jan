
import React from "react"
import TeamPopup from "@/components/layout/team/teampopup"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function teamBox(nomEquipe: number, nombreJoueurs: number) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button className="boutonEquipe m-3 py-1 px-3 border-solid border-2 rounded-2xl border-blue-400 bg-blue-400 hover:shadow-lg" key={nomEquipe} onPress={onOpen}>
        <h3 className="font-bold">Equipe n°{nomEquipe}</h3>
        <p>Nombre de joueurs : {nombreJoueurs}</p>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-white">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Attention !</ModalHeader>
              <ModalBody>
                <p>
                  Vous avez sélectionné l'équipe n°{nomEquipe}, êtes vous sûr?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Non
                </Button>
                <Button color="primary" onPress={onClose}>
                  Oui
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )

}


