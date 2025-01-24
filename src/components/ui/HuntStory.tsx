
"use client";


import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/react";
import { useEffect } from "react";



export default function HuntStory({ isOpen, onOpenChange, stories }) {


    useEffect(() => {
        console.log(stories)
    }, [stories])

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
                            <ModalHeader className="text-xl font-bold"><h1 className="text-3xl font-bold text-center text-black mb-6">Histoire de la Chasse au Trésor</h1></ModalHeader>
                            <ModalBody className="text-base">
                            <div className="mb-8 p-4 border border-gray-300 rounded-lg shadow-lg bg-lightBlueBg">
                                    <h2 className="text-xl font-semibold text-black mb-2">Introduction</h2>
                                   {stories.map((story: string) => {
                                        <>
                                            <p className="text-black">
                                                {story}
                                            </p>
                                        </>
                                    }) }
                                </div>

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




