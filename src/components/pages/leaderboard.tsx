import React from 'react';
import { useEffect } from 'react';
const TeamProgressContainer = ({ hunt ,trouve, setTrouve}) => {
  useEffect(() => {
    if (hunt && hunt.teams && hunt.markers) {
      // Nombre total d'indices dans la partie
      const totalHints = hunt.markers.length;

      // Calculer la progression de chaque équipe
      const progress = hunt.teams.map((team,index) => {
        return {
          teamId: index + 1, // Identifiant de l'équipe
          teamGuests: team.guests.map((guest) => guest.name), // Les noms des joueurs
          foundHints: team.current_hint_index, // Indices trouvés par l'équipe
          totalHints: totalHints, // Nombre total d'indices
        };
      });
      console.log("Progression des équipes:", progress);
      setTrouve(progress);
    }
    }, [hunt, setTrouve]);

  return (
    <div className="text-gray-700">
      <h2 className="text-gray-700">Classement des équipes par progression :</h2>
      <ol className="list-decimal list-inside">
        {trouve.map((team, index) => (
          <li key={index} className="text-gray-700">
            <strong>Equipe {team.teamId} :</strong>
            <p>Indices obtenus : {team.foundHints}/{team.totalHints}</p> 
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TeamProgressContainer;
