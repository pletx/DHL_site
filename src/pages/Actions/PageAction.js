import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import api, { getApiErrorMessage } from '../../api';
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

  // Ajoutez d'autres tracts si besoin
];

const NosActions = () => {
  const { isLoggedIn } = useContext(AuthContext);  // Récupère l'état de connexion
  const [actions, setActions] = useState(initialActions);
  const [tracts, setTracts] = useState(initialTracts);
  const [newAction, setNewAction] = useState({ title: '', text: '', image: null });
  const [errorMessage, setErrorMessage] = useState('');
  const [newTract, setNewTract] = useState({ title: '', image: null, pdf: null });
  const [editingAction, setEditingAction] = useState(null); // Pour gérer l'édition des actions
  const location = useLocation();

  useEffect(() => {
    const fetchActions = async () => {
      try {
        const response = await api.get('/api/actioncards');
        setActions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des actions:', error);
      }
    };

    const fetchTracts = async () => {
      try {
        const response = await api.get('/api/tracts');
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
        ? await api.put(`/api/actioncards/${editingAction._id}`, formData)
        : await api.post('/api/actioncards', formData);
      if (response.data) {
        if (editingAction) {
          setActions(prevActions =>
            prevActions.map(action =>
              action._id === response.data._id ? response.data : action
            )
          );
        } else {
          setActions(prevActions => [...prevActions, response.data]);
        }
        setNewAction({ title: '', text: '', image: null });
        setEditingAction(null);
        setErrorMessage('');
      }
    } catch (error) {
      const message = getApiErrorMessage(error);
      setErrorMessage(message);
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
      const response = await api.post('/api/tracts', formData);
      if (response.data) {
        setTracts(prevTracts => [...prevTracts, response.data]);
        setNewTract({ title: '', image: null, pdf: null });
        setErrorMessage('');
      }
    } catch (error) {
      const message = getApiErrorMessage(error);
      setErrorMessage(message);
      console.error('Erreur lors de l\'ajout du tract:', error);
    }
  };

  const handleDeleteAction = async (id) => {
    try {
      const token = localStorage.getItem('token');
      console.debug('Deleting action', id, 'token=', token);
      if (!token) {
        const msg = 'Vous devez être connecté pour supprimer une action. Veuillez vous reconnecter.';
        setErrorMessage(msg);
        console.warn('Delete aborted: no token');
        return;
      }
      await api.delete(`/api/actioncards/${id}`, {
        headers: token ? { 'x-auth-token': token } : {},
      });
      setActions(actions.filter(action => action._id !== id));
      setErrorMessage('');
    } catch (error) {
      const message = getApiErrorMessage(error);
      setErrorMessage(message);
      console.error('Erreur lors de la suppression de l\'action:', error);
    }
  };

  const handleDeleteTract = async (id) => {
    try {
      const token = localStorage.getItem('token');
      console.debug('Deleting tract', id, 'token=', token);
      if (!token) {
        const msg = 'Vous devez être connecté pour supprimer un tract. Veuillez vous reconnecter.';
        setErrorMessage(msg);
        console.warn('Delete aborted: no token');
        return;
      }
      await api.delete(`/api/tracts/${id}`, {
        headers: token ? { 'x-auth-token': token } : {},
      });
      setTracts(tracts.filter(tract => tract._id !== id));
      setErrorMessage('');
    } catch (error) {
      const message = getApiErrorMessage(error);
      setErrorMessage(message);
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
      <h2>Nos Actions</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <section id="telechargement-section">
       
      <h2>Courriers</h2>
        <Téléchargement type="courrier" />
      </section>
      <section id="tract-section">
        <h2>Tracts</h2>
        {tracts.map((tract) => (
          <TractCard
            key={tract._id}
            tract={tract}
            onDelete={handleDeleteTract}
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
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setNewTract({ ...newTract, pdf: e.target.files[0] })}
            />
            <button type="submit">Ajouter</button>
          </form>
        )}
      </section>
      <section id="courrier-section">
        <h2>Photo</h2>
        {actions.map((action) => (
          <ActionCard
            key={action._id}
            action={action}
            onDelete={handleDeleteAction}
            onEdit={handleEditAction}
          />
        ))}
      </section>

      

      
    </div>
  );
};

export default NosActions;
