import React from 'react';

const ProgressDashboard = ({ data }) => {
  return (
    <div>
      <h2>Tableau de pourcentage d'avancement par équipe :</h2>
      <ul>
        {data.map((team, index) => (
          <li key={index}>
            <strong>{team.equipe}</strong>: {((team.indicesFaits / team.totalIndices) * 100).toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressDashboard;
