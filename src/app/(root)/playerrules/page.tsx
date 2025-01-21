"use client";

import { useRouter } from "next/navigation";
import PlayerMenu from "@/components/layout/playermenu/Playermenu";

export default function CenteredTextPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white px-4">
        <div className="">
            <PlayerMenu />
        </div>
          <h1 className="text-[#03045E] text-3xl font-bold underline mb-6 text-center">
        Règles de la partie :
      </h1>
      <p className="text-[#03045E] text-lg leading-relaxed text-center max-w-3xl">
        Bienvenue dans cette chasse au trésor. <br />
        L'objectif est de trouver le trésor caché dans la ville. Pour cela, votre équipe devra trouver des indices les uns après les autres pour avancer et à la fin arriver au trésor. Amusez-vous bien !
      </p>
    </div>
  );
}