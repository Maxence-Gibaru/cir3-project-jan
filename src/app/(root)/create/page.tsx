"use client";

import ButtonComponent from "@/components/pages/Button";
import EventModal from "@/components/ui/EventModal";
import { useState } from "react";

const events = [
    { id: 1, name: "Event 1", link: "ouais"},
    { id: 2, name: "Event 2", link: "event2" },
    { id: 3, name: "Event 3", link:"event3" },
    { id: 4, name: "Event 3", link:"ouais" },
    { id: 5, name: "Event 3", link:"ouais" },
    { id: 6, name: "Event 3", link:"ouais" },
    { id: 7, name: "Event 3", link:"ouais" },
  ];

function EventButtons() {
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour le modal
  const [currentEvent, setCurrentEvent] = useState(null); // Événement actuellement sélectionné

  // Ouvrir le modal pour un événement spécifique
  const openModal = (event) => {
    setCurrentEvent(event);
    setIsModalOpen(true);
  };

  // Fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
  };
  return (
    <div className="flex flex-col items-center mt-14">
      <ButtonComponent
        name="Créer un nouvel événement"
        classname="w-64 rounded-lg px-4 py-8 bg-[#03045E] text-white text-lg hover:bg-[#023E8A] mt-8"
        link="/createevent"
        onPress={null}
      />
    
      {events.map(event => (
        <ButtonComponent
          key={event.id}
          name={event.name}
          classname="w-64 rounded-lg px-4 py-8 bg-[#03045E] text-white text-lg hover:bg-[#023E8A] mt-8"
          link={null}
          onPress={()=> openModal(event)}
        />
      ))}
       <EventModal isOpen={isModalOpen} event={currentEvent} onClose={closeModal} />
    </div>
  );
}

export default EventButtons;
