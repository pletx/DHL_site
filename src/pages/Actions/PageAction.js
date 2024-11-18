import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ActionCard from '../../components/ActionCard';
import TractCard from '../../components/TractCard';
import Téléchargement from '../../components/Téléchargement';
import './PageAction.css';
import image1 from "../../assets/202407_Syndicalisation_Slide5.jpg";
import image2 from "../../assets/202407_Syndicalisation_Slide1.jpg";
import { AuthContext } from '../../AuthContext';  // Assurez-vous que le chemin du contexte est correct

// Placeholder pour initialiser les actions si nécessaire
const initialActions = [
  {
    title: "Action 1",
    text: "Lorem ipsum dolor sit amet...",
    image: image1,
  },
  // Ajoutez d'autres actions si besoin
];

// Placeholder pour initialiser les tracts
const initialTracts = [
  {
    title: "Tract 1",
    imageUrl: image1,
    pdfUrl: "url_du_pdf_1.pdf"
  },
  // Ajoutez d'autres tracts si besoin
];

const NosActions = () => {
  const { isLoggedIn } = useContext(AuthContext);  // Récupère l'état de connexion
  const [actions, setActions] = useState(initialActions);
  const [tracts, setTracts] = useState(initialTracts);
  const [newAction, setNewAction] = useState({ title: '', text: '', image: null });
  const [newTract, setNewTract] = useState({ title: '', image: null, pdf: null });
  const [editingAction, setEditingAction] = useState(null); // Pour gérer l'édition des actions
  const location = useLocation();

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/actions`);
        setActions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des actions:', error);
      }
    };

    const fetchTracts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tracts`);
        setTracts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tracts:', error);
      }
    };

    fetchActions();
    fetchTracts();
  }, []);

  const handleSubmitAction = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', newAction.title);
    formData.append('text', newAction.text);
    if (newAction.image) {
      formData.append('image', newAction.image);
    }

    try {
      const response = editingAction
        ? await axios.put(`${process.env.REACT_APP_API_URL}/api/actions/${editingAction._id}`, formData)
        : await axios.post(`${process.env.REACT_APP_API_URL}/api/actions`, formData);
      if (response.data) {
        setActions(prevActions => [...prevActions, response.data]);
        setNewAction({ title: '', text: '', image: null });
        setEditingAction(null);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou modification de l\'action:', error);
    }
  };

  const handleSubmitTract = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', newTract.title);
    if (newTract.image) {
      formData.append('image', newTract.image);
    }
    if (newTract.pdf) {
      formData.append('pdf', newTract.pdf);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/tracts`, formData);
      if (response.data) {
        setTracts(prevTracts => [...prevTracts, response.data]);
        setNewTract({ title: '', image: null, pdf: null });
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du tract:', error);
    }
  };

  const handleDeleteAction = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/actions/${id}`);
      setActions(actions.filter(action => action._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'action:', error);
    }
  };

  const handleDeleteTract = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/tracts/${id}`);
      setTracts(tracts.filter(tract => tract._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du tract:', error);
    }
  };

  const handleEditAction = (action) => {
    setNewAction({ title: action.title, text: action.text, image: null });
    setEditingAction(action);
  };

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
    handleHashChange();
  }, [location]);

  return (
    <div className="nos-actions">
      <section id="courrier-section">
        <h2>Courriers</h2>
        {actions.map((action) => (
          <ActionCard
            key={action._id}
            action={action}
            onDelete={handleDeleteAction}
            onEdit={handleEditAction}
          />
        ))}
      </section>

      <section id="tract-section">
        <h2>Tracts</h2>
        {tracts.map((tract) => (
          <TractCard
            key={tract._id}
            tract={tract}
            onDelete={handleDeleteTract}
            onEdit={handleEditAction}
          />
        ))}

        {/* Affichage du formulaire seulement si l'utilisateur est connecté */}
        {isLoggedIn && (
          <form onSubmit={handleSubmitTract}>
            <h3>Ajouter un tract</h3>
            <input
              type="text"
              placeholder="Titre"
              value={newTract.title}
              onChange={(e) => setNewTract({ ...newTract, title: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewTract({ ...newTract, image: e.target.files[0] })}
            />
            <button type="submit">Ajouter</button>
          </form>
        )}
      </section>

      <section id="telechargement-section">
        <h2>Téléchargements</h2>
        <Téléchargement />
      </section>
    </div>
  );
};

export default NosActions;
