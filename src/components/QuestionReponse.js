import React, { useState } from 'react';
import axios from 'axios';
import './QuestionReponse.css';
const apiUrl = process.env.REACT_APP_API_URL;
const QuestionReponse = ({ question, answer, id, onDelete, isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);  // Pour afficher ou cacher la réponse
  const [isEditing, setIsEditing] = useState(false);  // Pour savoir si le composant est en mode édition
  const [newQuestion, setNewQuestion] = useState(question);  // Pour la modification de la question
  const [newAnswer, setNewAnswer] = useState(answer);  // Pour la modification de la réponse

  // Toggle pour afficher ou masquer la réponse
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Passer en mode édition
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Sauvegarder les modifications (mise à jour de la question et de la réponse)
  const handleSave = async () => {
    try {
      // Effectuer la mise à jour sur le serveur
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/question-reponse/${id}`, {
        question: newQuestion,
        answer: newAnswer,
      });

      // Mettre à jour l'affichage avec la nouvelle question et réponse
      setIsEditing(false);  // Quitter le mode édition
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la question-réponse', error);
    }
  };

  // Gérer la suppression de la question-réponse
  const handleDelete = async () => {
    try {
      await axios.delete(`${apiUrl}/api/question-reponse/${id}`);
      onDelete(id); // Appeler la fonction de suppression dans le parent pour supprimer la question de la liste
    } catch (error) {
      console.error('Erreur lors de la suppression de la question-réponse', error);
    }
  };

  return (
    <div className="question-reponse">
      {/* Affichage de la question avec un toggle pour afficher la réponse */}
      <h3 onClick={toggleOpen} className="question">
        {newQuestion}
      </h3>

      {/* Affichage de la réponse si l'état isOpen est true */}
      {isOpen && !isEditing && <p className="answer">{newAnswer}</p>}

      {/* Si le composant est en mode édition, afficher les champs de saisie */}
      {isEditing && (
        <div className="edit-form">
          <input
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Modifier la question"
          />
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Modifier la réponse"
          />
          <button onClick={handleSave}>Sauvegarder</button>
        </div>
      )}

      {/* Affichage des boutons Modifier et Supprimer uniquement si pas en mode édition et si l'utilisateur est connecté */}
      {!isEditing && isLoggedIn && (
        <div className="actions">
          <button onClick={handleEdit}>Modifier</button>
          <button onClick={handleDelete}>Supprimer</button>
        </div>
      )}
    </div>
  );
};

export default QuestionReponse;
