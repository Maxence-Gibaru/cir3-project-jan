import { Team } from '@/models/Team';
import React from 'react';
import HuntButtons from './Create';

const TeamMembers = ({ teams, maxGuests  }) => {
  return (
    <div className="text-gray-700">
      <h2 className="text-gray-700">Tableau de pourcentage d&apos;avancement par équipe :</h2>
      <ul className="list-disc list-inside">
        {teams.map((team: Team, index) => (
          <li key={index} className="text-gray-700">
            <strong>Equipe N°{index + 1} :</strong>
            <p>Nombre de personnes par équipes : {team.guests.length} / {maxGuests}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMembers;
