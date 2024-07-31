import React from 'react';
import DroitCard from '../../components/DroitCard';
import './PageDroits.css';
import image1 from "../../assets/202407_Syndicalisation_Slide1.jpg";
import image2 from "../../assets/202407_Syndicalisation_Slide2.jpg";

const droits = [
  {
    title: "Droit 1",
    text: "Description du droit 1 ",
    image: image1,
  },
  {
    title: "Droit 2",
    text: "Description du droit 2...",
    image: image2,
  },
  // Ajoutez d'autres droits ici
];

const NosDroits = () => {
  return (
    <div className="nos-droits">
      {droits.map((droit, index) => (
        <DroitCard
          key={index}
          title={droit.title}
          text={droit.text}
          image={droit.image}
          isImageRight={index % 2 === 1} // Alternance des images
        />
      ))}
    </div>
  );
};

export default NosDroits;
