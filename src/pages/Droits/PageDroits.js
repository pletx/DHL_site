import React from 'react';
import DroitCard from '../../components/DroitCard';
import './PageDroits.css';
import image1 from "../../assets/202407_Syndicalisation_Slide1.jpg";
import image2 from "../../assets/202407_Syndicalisation_Slide2.jpg";
import image3 from "../../assets/202407_Syndicalisation_Slide3.jpg";
import image4 from "../../assets/202407_Syndicalisation_Slide4.jpg";
import image5 from "../../assets/202407_Syndicalisation_Slide5.jpg";
import image6 from "../../assets/202407_Syndicalisation_Slide6.jpg";
import image7 from "../../assets/202407_Syndicalisation_Slide7.jpg";
import image8 from "../../assets/202407_Syndicalisation_Slide8.jpg";
import image9 from "../../assets/202407_Syndicalisation_Slide9.jpg";
const droits = [
  {
    title: "Droit 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: image1,
  },
  {
    title: "Droit 2",
    text: "Description du droit 2...",
    image: image2,
  },
  
  {
    title: "Droit 3",
    text: "Description du droit 3...",
    image: image3,
  },
  
  {
    title: "Droit 4",
    text: "Description du droit 4...",
    image: image4,
  },
  
  {
    title: "Droit 5",
    text: "Description du droit 5...",
    image: image5,
  },
  
  {
    title: "Droit 6",
    text: "Description du droit 6...",
    image: image6,
  },
  
  {
    title: "Droit 7",
    text: "Description du droit 7...",
    image: image7,
  },
  {
    title: "Droit 8",
    text: "Description du droit 8...",
    image: image8,
  },
  {
    title: "Droit 9",
    text: "Description du droit 9...",
    image: image9,
  },
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
