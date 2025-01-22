import React from 'react';

const ProgressDashboard = ({ data }) => {
  return (
    <div className="text-gray-700">
      <h2 className="text-gray-700">Tableau de pourcentage d'avancement par équipe :</h2>
      <ul className="list-disc list-inside">
        {data.map((team, index) => (
          <li key={index} className="text-gray-700">
            <strong>{team.equipe}</strong>: {((team.indicesFaits / team.totalIndices) * 100).toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressDashboard;
