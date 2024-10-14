import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ActionCard from '../../components/ActionCard';
import TractCard from '../../components/TractCard'; // Assuming TractCard is already created similarly
import Téléchargement from '../../components/Téléchargement'; // Importing the Téléchargement component
import './PageAction.css';
import image1 from "../../assets/202407_Syndicalisation_Slide5.jpg";
import image2 from "../../assets/202407_Syndicalisation_Slide1.jpg";

const actions = [
  {
    title: "Action 1",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: image1
  },
  {
    title: "Action 2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: image2
  },
  {
    title: "Action 3",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: image1
  },
  {
    title: "Action 4",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: image2
  },
  // Ajoutez d'autres actions ici
];

const tracts = [
  {
    title: "Tract 1",
    image: image1,
    pdfLink: "url_du_pdf_1.pdf"
  },
  {
    title: "Tract 2",
    image: image2,
    pdfLink: "url_du_pdf_2.pdf"
  },
  // Ajoutez d'autres tracts ici
];

const downloads = [
  {
    title: "Document 1",
    pdfLink: "url_du_pdf_1.pdf"
  },
  {
    title: "Document 2",
    pdfLink: "url_du_pdf_2.pdf"
  },
  // Ajoutez d'autres documents ici
];

const NosActions = () => {
  const location = useLocation();

  useEffect(() => {
    const handleHashChange = () => {
      const { hash } = window.location;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    handleHashChange(); // To handle the initial load or hash changes
  }, [location]);

  return (
    <div className="nos-actions">
      <section id="courrier-section">
        <h2>Courriers</h2>
        {actions.map((action, index) => (
          <ActionCard 
            key={index}
            title={action.title}
            text={action.text}
            image={action.image}
          />
        ))}
      </section>
      <section id="tract-section">
        <h2>Tracts</h2>
        {tracts.map((tract, index) => (
          <TractCard 
            key={index}
            title={tract.title}
            image={tract.image}
            pdfLink={tract.pdfLink}
          />
        ))}
      </section>
      <section id="telechargement-section">
        <h2>Téléchargements</h2>
        <Téléchargement />
      </section>
    </div>
  );
};

export default NosActions;
