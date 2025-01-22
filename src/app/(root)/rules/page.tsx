"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CenteredTextPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-greyBg px-4">
      <h1 className="text-gray-700 text-3xl font-bold underline mb-6 text-center">
        Règles et fonctionnement de l'organisation de partie :
      </h1>

      <p className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl">
        Bienvenue dans cette chasse au trésor. <br />
        L'objectif est de trouver le trésor caché dans la ville. Pour cela, aide-toi des différents indices disposés tout au long du parcours. Chaque groupe commence la partie à un indice différent, et chaque indice indique la position de l'indice suivant. Ils devront alors être trouvés dans l'ordre établi en scannant les QRCode correspondants. Une fois tous les indices obtenus dans l'ordre, un indice final vous sera donné afin d'indiquer l'emplacement du trésor. <br /><br />
        En tant qu'organisateur, vous pouvez créer un nouvel événement. Vous pourrez permettre à vos amis de rejoindre la partie en leur partageant le code d'accès. De plus, définissez un scénario pour personnaliser votre partie, importez votre carte, et définissez le nombre d'équipes. <br /><br />
        Au cours de celle-ci et à la fin, vous pourrez consulter les statistiques des différentes équipes et le classement. Amusez-vous bien !
      </p>

      <Link
        href="/ressourcesCreation"
        className="mt-8 px-6 py-3 bg-gray-700 text-white text-lg font-semibold rounded-lg hover:bg-black transition-all duration-200"
      >
        Suivant
      </Link>
    </div>
  );
}
