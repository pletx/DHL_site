import React from 'react';
import Teammate from './Teammate';
import './Team.css';

const Team = () => {
  const teammates = [
    { name: 'John Doe', role: 'Président', image: '/path/to/image1.jpg' },
    { name: 'Jane Smith', role: 'Vice-Présidente', image: '/path/to/image2.jpg' },
    { name: 'Alice Johnson', role: 'Secrétaire', image: '/path/to/image3.jpg' },
    // Ajoutez plus de membres ici
  ];

  return (
    <div className="team">
      <h2>Notre Équipe</h2>
      <div className="team-cards">
        {teammates.map((teammate, index) => (
          <Teammate 
            key={index}
            name={teammate.name}
            role={teammate.role}
            image={teammate.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Team;
