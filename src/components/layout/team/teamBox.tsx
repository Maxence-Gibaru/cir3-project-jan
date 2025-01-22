import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider
} from "@heroui/react";

import { useEffect } from "react";

import { useSession } from "next-auth/react";
import { fetchApi } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface TeamBoxProps {
  nomEquipe: number;
  nombreJoueurs: number;
}

const TeamBox: React.FC<TeamBoxProps> = ({ nomEquipe, nombreJoueurs, maxGuests }) => {
  const searchParams = useSearchParams();
  const [huntData, setHuntData] = useState({})
  const code = searchParams.get("code");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();
  const [teamJoined, setTeamJoined] = useState({
    teamIndex: nomEquipe,
    guestId: session?.user?.id
  })

  const router = useRouter();

  const handleTeamJoin = async () => {
    const response = await fetchApi("guest/join_team", { method: "PUT", body: { code: code, teamIndex: teamJoined.teamIndex, guestId: teamJoined.guestId } })

    if (response) {
      router.push('/map')
    }
  }




  return (
    <>
      <Card className="min-w-[400px] bg-[#146AFF1A] rounded-lg" >
        <CardHeader className="text-xl font-bold flex flex-col justify-center items-center">
          <h1>Equipe n°{nomEquipe}</h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <Button
            className="text-5xl m-3 py-1 px-3 border-2 rounded-2xl bg-darkBlueBg text-white w-11/12 h-1/8 hover:shadow-lg uppercase font-bold"
            onPress={onOpen}
          >
            Rejoindre

          </Button>
        </CardBody>
        <Divider />
        <CardFooter>
          <p>Nombre de joueurs : {nombreJoueurs} / {maxGuests}</p>
        </CardFooter>
      </Card >
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-white">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Attention !</ModalHeader>
              <ModalBody>
                <p>
                  Vous avez sélectionné l'équipe n°{nomEquipe}, êtes-vous sûr ?
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

export default TeamBox;
