import React from 'react';

const TeamProgressContainer = ({ data }) => {
  const sortedData = [...data].sort((a, b) => b.indicesFaits - a.indicesFaits);

  return (
    <div className="text-gray-700">
      <h2 className="text-gray-700">Classement des équipes par progression :</h2>
      <ol className="list-decimal list-inside">
        {sortedData.map((team, index) => (
          <li key={index} className="text-gray-700">
            <strong>{team.equipe}</strong> - Indices obtenus : {team.indicesFaits}/{team.totalIndices}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TeamProgressContainer;
