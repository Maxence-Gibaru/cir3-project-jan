import React, { useState, useEffect } from 'react';

const ElapsedTime = ({ startTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const startTimestamp = new Date(startTime).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      setElapsedTime(now - startTimestamp);
    }, 1000);

    return () => clearInterval(interval); 
  }, [startTime]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-gray-700">
      <p className="text-gray-700 ">Temps depuis le début de la partie :</p>
      <p className="text-gray-700 text-base">{formatTime(elapsedTime)}</p>
    </div>
  );
};

export default ElapsedTime;
