"use client";

import HuntModal from "@/components/ui/HuntModal";
import { fetchApi } from "@/lib/api";
import { Hunt } from "@/models/Hunt";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function HuntButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHunt, setCurrentHunt] = useState<Hunt | null>(null);
  const [hunts, setHunts] = useState<Hunt[]>([]);

  const router = useRouter();


  useEffect(() => {
    fetchApi("hunt/find")
      .then((data) => setHunts(data))
      .catch((err) => console.error(err));
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
    <div className="flex flex-col items-center mt-14">
      <Link href="/rules"
        className="w-64 rounded-lg px-4 py-8 bg-[#03045E] text-white text-lg hover:bg-[#023E8A] mt-8"
      >
        Créer un nouvel événement
      </Link>

      {hunts.map(hunt => (
        <Button
          key={hunt._id}
          className="w-64 rounded-lg px-4 py-8 bg-[#03045E] text-white text-lg hover:bg-[#023E8A] mt-8"
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
