
// @ts-nocheck

"use client";

import HuntModal from "@/components/ui/HuntModal";
import { Hunt } from "@/models/Hunt";
import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface FirstComponentProps {
  onNext: () => void;
  hunts: Hunt[];
  setHunts: (hunts: Hunt[]) => void;
  hunt: Hunt;
  setHunt: (hunts: Hunt) => void;
}

function HuntButtons({ hunts, setHunts, hunt, setHunt, onNext }: FirstComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHunt, setCurrentHunt] = useState<Hunt | null>(null);

  const openModal = (hunt: Hunt) => {
    setCurrentHunt(hunt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentHunt(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "closed":
        return "/cercles/cercleGris.svg";
      case "opened":
        return "/cercles/cercleVert.svg";
      case "started":
        return "/cercles/cercleJaune.svg";
      default:
        return "/cercles/cercleRouge.svg";
    }
  };

  return (
    <div className="min-h-screen bg-greyBg text-gray-700 w-screen">
      <nav className="flex w-full top-0 bg-white shadow-md z-10">
        <div className="container mx-auto p-4 flex justify-between items-center ">
          <Link href="/">
            <Image
              src="/logoO.png"
              alt="Logo de One P'ISEN"
              width={72}
              height={72}
              className="rounded-full"
            />
          </Link>
        </div>
      </nav>
      <div className="text-lg flex flex-col items-center justify-center">
        <div className="flex justify-center text-center w-1/2">
          <Link
            href="/organizer/rules"
            className="m-3 py-5 px-1 rounded-2xl bg-darkBlueBg text-white w-4/5 h-1/8 hover:shadow-lg font-bold lg:max-w-sm"
          >
            Créer un nouvel événement
          </Link>
        </div>
        
        <div className="flex flex-row flew-wrap w-full justify-evenly flex-wrap">
          {hunts.map((hunt) => (
            <Card className="min-w-[300px] bg-[#146AFF1A] rounded-lg m-2" key={hunt._id}>
              <CardHeader className="text-xl font-bold flex flex-row justify-center items-center pb-0">
                  <h1>{hunt.name}</h1>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-row justify-evenly flex-nowrap items-center">
                  <Button
                      key={hunt._id}
                      className="text-lg px-4  border-2 rounded-2xl bg-darkBlueBg text-white w-6/12 h-3/5 hover:shadow-lg uppercase font-bold items-center"
                      onPress={() => openModal(hunt)}
                  >
                      Accéder
                  </Button>
                    <img
                      src={getStatusIcon(hunt.status)}
                      alt="Indicateur"
                      width={72}
                      height={72}
                      className="rounded-full "
                    />
              </CardBody>
              <Divider />
          </Card >
            
          ))}
        </div>
        <HuntModal isOpen={isModalOpen} hunt={currentHunt} setHunt={setHunt} onNext={onNext} onClose={closeModal} />
      </div>
    </div>
  );
}

export default HuntButtons;
