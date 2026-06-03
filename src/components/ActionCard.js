import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import api from '../api';
import './ActionCard.css'; // Assurez-vous que le fichier CSS est bien importé

const ActionCards = (props) => {
  const { action, onDelete, onEdit } = props || {};
  const { isLoggedIn } = useContext(AuthContext);
  const [actionCards, setActionCards] = useState([]);
  const [newActionCard, setNewActionCard] = useState({ title: '', text: '', image: null });
  const [editActionCard, setEditActionCard] = useState(null);
  const [isOpenLocal, setIsOpenLocal] = useState(false);

  useEffect(() => {
    // Only fetch full list when component is used without an `action` prop
    if (action) return;
    const fetchActionCards = async () => {
      try {
        const response = await api.get('/api/actioncards');
        setActionCards(response.data);
      } catch (error) {
        console.error('Échec de la récupération des actions :', error);
      }
    };

    fetchActionCards();
  }, [action]);

  const handleFileChange = (event) => {
    setNewActionCard({ ...newActionCard, image: event.target.files[0] });
  };

  const handleEditFileChange = (event) => {
    setEditActionCard({ ...editActionCard, image: event.target.files[0] });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewActionCard({ ...newActionCard, [name]: value });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditActionCard({ ...editActionCard, [name]: value });
  };

  const handleAddActionCard = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newActionCard.title);
      formData.append('text', newActionCard.text);
      if (newActionCard.image) {
        formData.append('image', newActionCard.image);
      }

      const response = await api.post('/api/actioncards', formData);

      setActionCards([...actionCards, response.data]);
      setNewActionCard({ title: '', text: '', image: null });
    } catch (error) {
      console.error('Échec de l\'ajout de l\'action :', error);
    }
  };

  const handleEditActionCard = async () => {
    try {
      const formData = new FormData();
      formData.append('title', editActionCard.title);
      formData.append('text', editActionCard.text);
      if (editActionCard.image) {
        formData.append('image', editActionCard.image);
      }

      const response = await api.put(`/api/actioncards/${editActionCard._id}`, formData);

      setActionCards(
        actionCards.map((card) =>
          card._id === editActionCard._id ? response.data : card
        )
      );
      setEditActionCard(null);
    } catch (error) {
      console.error('Échec de la modification de l\'action :', error);
    }
  };

  const handleDeleteActionCard = async (id) => {
    try {
      await api.delete(`/api/actioncards/${id}`);
      setActionCards(actionCards.filter((card) => card._id !== id));
    } catch (error) {
      console.error('Échec de la suppression de l\'action :', error);
    }
  };

  const toggleCard = (id) => {
    if (action) {
      setIsOpenLocal(v => !v);
      return;
    }
    setActionCards(prevCards =>
      prevCards.map(card =>
        card._id === id ? { ...card, isOpen: !card.isOpen } : card
      )
    );
  };

  // If an `action` prop is provided, render a single card (used by PageAction mapping)
  if (action) {
    return (
      <div className={`action-member ${isOpenLocal ? 'active' : ''}`} onClick={() => toggleCard(action._id)}>
        <img src={action.imageUrl} alt={action.title} />
        <h3>{action.title}</h3>
        {isOpenLocal && <p>{action.text}</p>}
        {isLoggedIn && (
          <div>
            <button onClick={(e) => { e.stopPropagation(); onEdit && onEdit(action); }}>Modifier</button>
            <button onClick={(e) => { e.stopPropagation(); onDelete && onDelete(action._id); }}>Supprimer</button>
          </div>
        )}
      </div>
    );
  }

  // Otherwise render the full list + admin form
  return (
    <div className="action-container">
      <div className="action-list">
        {actionCards.map((card) => (
          <div
            className={`action-member ${card.isOpen ? 'active' : ''}`}
            key={card._id}
            onClick={() => toggleCard(card._id)}
          >
            <img src={card.imageUrl} alt={card.title} />
            <h3>{card.title}</h3>
            {card.isOpen && <p>{card.text}</p>}
            {isLoggedIn && (
              <div>
                <button onClick={() => setEditActionCard(card)}>Modifier</button>
                <button onClick={() => handleDeleteActionCard(card._id)}>Supprimer</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isLoggedIn && (
        <div className="action-form">
          <h3>Ajouter une nouvelle action</h3>
          <input
            type="text"
            name="title"
            value={newActionCard.title}
            onChange={handleInputChange}
            placeholder="Titre"
          />
          <textarea
            name="text"
            value={newActionCard.text}
            onChange={handleInputChange}
            placeholder="Texte"
          />
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleAddActionCard}>Ajouter action</button>
        </div>
      )}

      {editActionCard && (
        <div className="action-form">
          <h3>Modifier l'action</h3>
          <input
            type="text"
            name="title"
            value={editActionCard.title}
            onChange={handleEditInputChange}
            placeholder="Titre"
          />
          <textarea
            name="text"
            value={editActionCard.text}
            onChange={handleEditInputChange}
            placeholder="Texte"
          />
          <input type="file" onChange={handleEditFileChange} />
          <button onClick={handleEditActionCard}>Enregistrer les modifications</button>
          <button onClick={() => setEditActionCard(null)}>Annuler</button>
        </div>
      )}
    </div>
  );
};

export default ActionCards;
