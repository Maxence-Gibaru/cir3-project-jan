"use client";

import { Hunt } from "@/models/Hunt";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { fetchApi } from "@/lib/api";
import clsx from 'clsx';


export default function HuntDetails({ isOpen, onOpenChange, hintsRevealed, selectedMarker }) {

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="bg-white p-6 rounded-lg text-black">
                    {(onClose) => (
                        <>
                            <ModalHeader className="text-xl font-bold">Indice Details</ModalHeader>
                            <ModalBody className="text-base">
                                {selectedMarker && (
                                    <>
                                        <strong>Indice</strong>
                                        <p>{hintsRevealed[selectedMarker]}</p>
                                    </>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    color="primary"
                                    onPress={onClose}
                                >
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
