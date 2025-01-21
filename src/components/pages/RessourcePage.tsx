"use client";

import { useEffect, useState } from "react";

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
  const [unlockedChapters, setUnlockedChapters] = useState<number>(1); // Nombre de chapitres débloqués

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

  useEffect(() => {
    fetchStories();
  }, []);

  // Débloquer le chapitre suivant
  const unlockNextChapter = () => {
    if (unlockedChapters < (story?.chapters.length || 0)) {
      setUnlockedChapters(unlockedChapters + 1);
    }
  };

  if (loading) {
    return <p className="text-center text-lg font-semibold mt-6">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg font-semibold mt-6">Erreur : {error}</p>;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col p-6">
      <h1 className="text-3xl font-bold text-center text-black mb-6">Histoire de la Chasse au Trésor</h1>
      {/* Introduction */}
      <div className="mb-8 p-4 border border-gray-300 rounded-lg shadow-lg bg-gray-50">
        <h2 className="text-xl font-semibold text-black mb-2">Introduction</h2>
        <p className="text-black">{story?.introduction}</p>
      </div>

      {/* Chapitres */}
      {story?.chapters.map((chapter, index) => (
        <div
          key={index}
          className={`mb-8 p-4 border border-gray-300 rounded-lg shadow-lg ${
            index < unlockedChapters ? "bg-white" : "bg-gray-200"
          }`}
        >
          {index < unlockedChapters ? (
            <>
              <h2 className="text-xl font-semibold text-black mb-2">{chapter.title}</h2>
              <p className="text-black mb-2">{chapter.content}</p>
              <p className="text-black font-medium">Indice : {chapter.clue}</p>
              {index === unlockedChapters - 1 && (
                <button
                  onClick={unlockNextChapter}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
                >
                  Suivant
                </button>
              )}
            </>
          ) : (
            <p className="text-gray-500 italic">Chapitre verrouillé</p>
          )}
        </div>
      ))}
    </div>
  );
}