"use client";

import ButtonComponent from "@/components/pages/Button";

const events = [
    { id: 1, name: "Event 1", link: "ouais"},
    { id: 2, name: "Event 2", link: "ouais" },
    { id: 3, name: "Event 3", link:"ouais" },
    { id: 4, name: "Event 3", link:"ouais" },
    { id: 5, name: "Event 3", link:"ouais" },
    { id: 6, name: "Event 3", link:"ouais" },
    { id: 7, name: "Event 3", link:"ouais" },
  ];

function EventButtons() {
  return (
    <div className="flex flex-col items-center mt-14">
      <ButtonComponent
        name="Créer un nouvel événement"
        classname="w-64 rounded-lg px-4 py-8 bg-[#03045E] text-white text-lg hover:bg-[#023E8A] mt-8"
        link="/createevent"
      />
    
      {events.map(event => (
        <ButtonComponent
          key={event.id}
          name={event.name}
          classname="w-64 rounded-lg px-4 py-8 bg-[#03045E] text-white text-lg hover:bg-[#023E8A] mt-8"
          link={event.link}
        />
      ))}
    </div>
  );
}

export default EventButtons;
