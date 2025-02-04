"use client";
import React, { useState } from 'react';
import Create from '@/components/pages/Create';
import Dashboard from '@/components/pages/Dashboard';
import { useEffect } from 'react';
import { Hunt } from '@/models/Hunt';
import { fetchApi } from '@/lib/api';   

export default function Home() {
const [currentComponent, setCurrentComponent] = useState(1);
const [hunts, setHunts] = useState<Hunt[]>([]);
const [hunt, setHunt] = useState<Hunt>();

  
  useEffect(() => {
    const createHunt = async () => {
      await fetchApi("organizer/hunt", {method: "GET"})
        .then((data) => {setHunts(data);
          console.log(data);
        })
        .catch((err) => console.error(err));
    };
    
    createHunt();
  }, []);


  if (!hunt && currentComponent == 2) {
    return <div>Loading...</div>;
  }

  const renderComponent = () => {
    switch(currentComponent) {
      case 1:
        return <Create hunts={hunts} setHunts={setHunts} hunt={hunt} setHunt={setHunt} onNext={() => setCurrentComponent(2)} />;
      case 2:
        return <Dashboard hunt={hunt} setHunt={setHunt} />;
      default:
        return <Create hunts={hunts} setHunts={setHunts} hunt={hunt} setHunt={setHunt} onNext={() => setCurrentComponent(2)} />;
    }
  };

  return (
    <div>
      {renderComponent()}
    </div>
  );
}