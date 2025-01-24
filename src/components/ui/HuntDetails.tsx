// @ts-nocheck
"use client";


import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";



export default function HuntDetails({ isOpen, onOpenChange, hintsRevealed, selectedMarker, stories }) {

/*     useEffect(() => {
        console.log(selectedMarker);
    }, [selectedMarker]) */

    /* console.log("selectedMarker", hintsRevealed) */
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

                                        <strong>Histoire</strong>
                                        <p>{stories[selectedMarker]}</p>
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
