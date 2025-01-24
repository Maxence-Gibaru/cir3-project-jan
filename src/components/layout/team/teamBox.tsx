import { fetchApi } from "@/lib/api";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@heroui/react";

interface TeamBoxData {
    huntId: string;
    index: number;
    guests: string[];
    maxGuests: number;
}

export default function TeamBox({ huntId, index, guests, maxGuests, goNext }: TeamBoxData & { goNext: () => void }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleTeamJoin = async () => {
        const response = await fetchApi("guest/join_team", { method: "PUT", body: { huntId, teamIndex: index } })

        if (response) {
            if (response.isValid) goNext();
        }
    }

    return (
        <>
            <Card className="min-w-[400px] bg-[#146AFF1A] rounded-lg" >
                <CardHeader className="text-xl font-bold flex flex-col justify-center items-center">
                    <h1>Equipe n°{index + 1}</h1>
                </CardHeader>
                <Divider />
                <CardBody>
                    {guests.map((guest, index) => (
                        <p key={index}>{guest}</p>
                    ))}
                    <Button
                        className="text-5xl m-3 py-1 px-3 border-2 rounded-2xl bg-darkBlueBg text-white w-11/12 h-1/8 hover:shadow-lg uppercase font-bold"
                        onPress={onOpen}
                    >
                        Rejoindre
                    </Button>
                </CardBody>
                <Divider />
                <CardFooter>
                    <p>Nombre de joueurs : {guests.length} / {maxGuests}</p>
                </CardFooter>
            </Card >
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="bg-white">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Attention !</ModalHeader>
                            <ModalBody>
                                <p>
                                    Vous avez sélectionné l&apos;équipe n°{index + 1}, êtes-vous sûr ?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Non
                                </Button>
                                <Button color="primary" onPress={() => {
                                    handleTeamJoin()
                                    onClose()
                                }}>
                                    Oui
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};