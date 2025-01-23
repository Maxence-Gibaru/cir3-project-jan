"use client";

import HuntModal from "@/components/ui/HuntModal";
import { Hunt } from "@/models/Hunt";
import { Button } from "@heroui/react";
import Link from "next/link";
import {  useState } from "react";

interface FirstComponentProps {
  onNext: () => void;
  hunts: Hunt[];
  setHunts: (hunts: Hunt[]) => void;
  hunt: Hunt;
  setHunt: (hunts: Hunt) => void;
}

function HuntButtons({hunts,setHunts,hunt,setHunt,onNext}: FirstComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHunt, setCurrentHunt] = useState<Hunt | null>(null);


  const openModal = (hunt: Hunt) => {
    setCurrentHunt(hunt);
    setHunt(hunt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentHunt(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-greyBg text-gray-700">
        <Link href="/rules"
        className=" m-3 py-5 px-1 rounded-2xl flex justify-center bg-darkBlueBg text-white w-11/12 h-1/8 hover:shadow-lg font-bold lg:max-w-xl"
        >
          Créer un nouvel événement
        </Link>
      
      {hunts.map(hunt => (
        <Button
          key={hunt._id}
          className="m-3 py-5 px-1 rounded-2xl flex justify-center bg-darkBlueBg text-white w-11/12 h-1/8 hover:shadow-lg font-bold lg:max-w-xl"
          onPress={() => openModal(hunt)}
        >
          {hunt.name}
        </Button>
      ))}
      <HuntModal isOpen={isModalOpen} hunt={currentHunt} onNext={onNext} onClose={closeModal} />
    </div>
  );
}

export default HuntButtons;
