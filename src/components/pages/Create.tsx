"use client";

import HuntModal from "@/components/ui/HuntModal";
import { Hunt } from "@/models/Hunt";
import { Button } from "@heroui/react";
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
    <div className="flex flex-col items-center justify-center h-screen bg-greyBg text-gray-700">
      <nav className="fixed w-full top-0 bg-white shadow-md z-10">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Link href="/">
            <img
              src="/logoO.png"
              alt="Logo de One P'ISEN"
              width={72}
              height={72}
              className="rounded-full"
            />
          </Link>
        </div>
      </nav>
      <div className="mt-10 w-3/4 max-w-lg text-lg">
      
        <Link
          href="/organizer/rules"
          className="m-3 py-5 px-1 rounded-2xl flex justify-evenly bg-darkBlueBg text-white w-11/12 h-1/8 hover:shadow-lg font-bold lg:max-w-xl"
        >
          Créer un nouvel événement
        </Link>
        

        {hunts.map(hunt => (
          <Button
            key={hunt._id}
            className="m-3 py-5 px-4 rounded-2xl flex justify-between bg-darkBlueBg text-white w-11/12 h-1/8 hover:shadow-lg font-bold lg:max-w-xl"
            onPress={() => openModal(hunt)}
          >
            {hunt.name}
            <img
              src={getStatusIcon(hunt.status)}
              alt="Indicateur"
              width={72}
              height={72}
              className="rounded-full"
            />
          </Button>
          
        ))}
        <HuntModal isOpen={isModalOpen} hunt={currentHunt} setHunt={setHunt} onNext={onNext} onClose={closeModal} />
      </div>
    </div>
  );
}

export default HuntButtons;
