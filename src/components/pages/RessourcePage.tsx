"use client";

import { useEffect, useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";
import Link from "next/link";

// Types des chapitres et de l'histoire
interface Chapter {
  title: string;
  content: string;
  clue: string;
}

interface Story {
  introduction: string;
  chapters: Chapter[];
}

export default function RessourcePage() {
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les données depuis l'API
  const fetchStories = async () => {
    try {
      const response = await fetch("/api/story");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      const data: Story = await response.json();
      setStory(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Charger les données au montage
  useEffect(() => {
    fetchStories();
  }, []);

  if (loading) {
    return <p className="text-center text-lg font-semibold bg-greyBg mt-6">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg bg-greyBg font-semibold mt-6">Erreur : {error}</p>;
  }

  return (
    <div className="bg-greyBg min-h-screen flex flex-col p-6">
      <div className="absolute z-30 top-4 right-4">
        <Dropdown>
          <DropdownTrigger>
            <Button className="text-black bg-white rounded-md" variant="bordered">Menu</Button>
          </DropdownTrigger>
          <DropdownMenu className="text-black bg-white rounded-md" aria-label="Example with disabled actions" disabledKeys={["edit", "delete"]}>
            <DropdownItem key="new"><Link href="/playerrules">Règles</Link></DropdownItem>
            <DropdownItem key="copy"><Link href="/map">Carte</Link></DropdownItem>
            <DropdownItem key="HomePage"><Link href="/" className="text-red-500 underline">Déconnexion</Link></DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <h1 className="text-3xl font-bold text-center text-black mb-6">Histoire de la Chasse au Trésor</h1>

      {/* Introduction */}
      <div className="mb-8 p-4 border border-gray-300 rounded-lg shadow-lg bg-lightBlueBg">
        <h2 className="text-xl font-semibold text-black mb-2">Introduction</h2>
        <p className="text-black">{story?.introduction}</p>
      </div>

      {/* Chapitres */}
      {story?.chapters.map((chapter, index) => (
        <div
          key={index}
          className="mb-8 p-4 border border-gray-300 rounded-lg shadow-lg bg-lightBlueBg"
        >
          <h2 className="text-xl font-semibold text-black mb-2">{chapter.title}</h2>
          <p className="text-black mb-2">{chapter.content}</p>
          <p className="text-black font-medium">Indice : {chapter.clue}</p>
        </div>
      ))}
    </div>
  );
}
