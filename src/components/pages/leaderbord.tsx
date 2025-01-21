import React from 'react';

const TeamProgressContainer = ({ data }) => {
  // Trier les équipes par le nombre d'indices obtenus (indicesFaits) dans l'ordre décroissant
  const sortedData = [...data].sort((a, b) => b.indicesFaits - a.indicesFaits);

  return (
    <div>
      <h2>Classement des équipes par progression :</h2>
      <ol>
        {sortedData.map((team, index) => (
          <li key={index}>
            <strong>{team.equipe}</strong> - Indices obtenus : {team.indicesFaits}/{team.totalIndices} (
            {((team.indicesFaits / team.totalIndices) * 100).toFixed(2)}%)
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TeamProgressContainer;
