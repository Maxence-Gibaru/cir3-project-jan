import React from 'react';

const ProgressDashboard = ({ hunt ,trouve, setTrouve }) => {
  return (
    <div className="text-gray-700">
      <h2 className="text-gray-700">Tableau de pourcentage d'avancement par équipe :</h2>
      <ul className="list-disc list-inside">
        {trouve.map((team, index) => (
          <li key={index} className="text-gray-700">
            <strong>Equipe {team.teamId} :</strong>
            <p>Pourcentage : {team.foundHints/team.totalHints*100} %{}</p> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressDashboard;
