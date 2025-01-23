import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import LoginForm from "../forms/LoginForm";
import RegisterForm from "../forms/RegisterForm";

export default function ModalApp({ isOpen, onOpenChange }: any) {

    const [mode, setMode] = useState("guest"); // "guest", "login", "register"

    const handleGuest = () => {
        /* if (status === "unauthenticated") { */
        signIn("guest-credentials");
        /* } */
    };


    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
                <ModalContent className=" bg-white rounded-lg">
                    {(onClose) => (
                        <>
                            <ModalHeader>
                                {mode === "guest" && "Rejoindre en tant qu'invité"}
                                {mode === "login" && "Connexion"}
                                {mode === "register" && "Inscription"}
                            </ModalHeader>
                            <ModalBody>
                                {mode === "guest" && (
                                    <p>Vous pouvez rejoindre la chasse au trésor en tant qu'invité ou vous connecter pour organiser votre propre chasse.</p>
                                )}
                                {mode === "login" && <LoginForm onClose={onClose} />}
                                {mode === "register" && <RegisterForm onClose={onClose} />}
                            </ModalBody>
                            <ModalFooter>
                                {mode === "guest" && (
                                    <>
                                        <Button onPress={() => setMode("login")} className="bg-darkBlueBg rounded-lg text-white">Se connecter</Button>
                                        <Button onPress={() => setMode("register")} variant="flat">S'inscrire</Button>
                                        <Button onPress={() => {

                                            handleGuest();
                                            onClose();
                                        }} color="success">Continuer en invité</Button>
                                    </>
                                )}
                                {(mode === "login" || mode === "register") && (
                                    <Button onPress={() => setMode("guest")} variant="flat">Retour</Button>
                                )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );

}
