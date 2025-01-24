"use client";


import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";

export default function HuntWelcome({ isOpen, onOpenChange, hintsRevealed, stories }) {

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent className="bg-white p-6 rounded-lg text-black">
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-xl font-bold">
                                Bienvenue dans l&apos;aventure
                            </ModalHeader>
                            <ModalBody className="text-base">
                                <p>{stories[0]}</p>
                                <p>{hintsRevealed[0]}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    color="primary"
                                    onPress={onClose}
                                >
                                    Commencer l&apos;aventure
                                </Button>
                            </ModalFooter>
                        </>)}
                </ModalContent>
            </Modal>
        </>
    );
}
