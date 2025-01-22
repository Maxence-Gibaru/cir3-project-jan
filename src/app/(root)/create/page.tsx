"use client";

import HuntModal from "@/components/ui/HuntModal";
import { fetchApi } from "@/lib/api";
import { Hunt } from "@/models/Hunt";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function HuntButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHunt, setCurrentHunt] = useState<Hunt | null>(null);
  const [hunts, setHunts] = useState<Hunt[]>([]);

  const router = useRouter();


  useEffect(() => {
    fetchApi("organizer/find").then((data) => setHunts(data)).catch((err) => console.error(err));
  }, []);


  const openModal = (hunt: Hunt) => {
    setCurrentHunt(hunt);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentHunt(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-greyBg text-gray-700">
        <Link href="/rules"
        className=" m-3 py-5 px-1 rounded-2xl flex justify-center bg-darkBlueBg text-white w-11/12 h-1/8 hover:shadow-lg font-bold "
        >
          Créer un nouvel événement
        </Link>
      
      {hunts.map(hunt => (
        <Button
          key={hunt._id}
          className="m-3 py-5 px-1 rounded-2xl flex justify-center bg-darkBlueBg text-white w-11/12 h-1/8 hover:shadow-lg font-bold"
          onPress={() => openModal(hunt)}
        >
          {hunt.name}
        </Button>
      ))}
      <HuntModal isOpen={isModalOpen} hunt={currentHunt} onClose={closeModal} />
    </div>
  );
}

export default HuntButtons;
