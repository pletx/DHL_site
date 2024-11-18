import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuestionReponse from '../../components/QuestionReponse';
import './Information.css';
const apiUrl = process.env.REACT_APP_API_URL;
const QuestionsReponses = () => {
  const [questionsReponses, setQuestionsReponses] = useState([]);  // Liste des questions-réponses
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Vérifier si l'utilisateur est connecté

  // Vérification de la connexion de l'utilisateur (par exemple avec un token dans localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);  // Utilisateur connecté si le token existe
    }
  }, []);

  useEffect(() => {
    fetchQuestionsReponses();
  }, []);  // Une seule fois lors du montage du composant

  const fetchQuestionsReponses = async () => {
    try {
      const response = await axios.get(`${ process.env.REACT_APP_API_URL}/api/question-reponse`);
      setQuestionsReponses(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des questions et réponses', error);
    }
  };

  const handleUpdate = (updatedItem) => {
    setQuestionsReponses((prevItems) =>
      prevItems.map((item) => (item._id === updatedItem._id ? updatedItem : item))
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${ process.env.REACT_APP_API_URL}/api/question-reponse/${id}`);
      setQuestionsReponses(questionsReponses.filter((qr) => qr._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la question-réponse', error);
    }
  };

  return (
    <div className="questions-reponses-page">
      {/* Formulaire d'ajout visible seulement si l'utilisateur est connecté */}
      {isLoggedIn && (
        <>
          <h1>Ajouter une nouvelle question-réponse</h1>
          <div className="add-form">
            <input
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Entrez la question"
            />
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Entrez la réponse"
            />
            <button
              onClick={async () => {
                try {
                  const response = await axios.post(`${ process.env.REACT_APP_API_URL}/api/question-reponse`, {
                    question: newQuestion,
                    answer: newAnswer,
                  });
                  setQuestionsReponses([...questionsReponses, response.data]);
                  setNewQuestion('');
                  setNewAnswer('');
                } catch (error) {
                  console.error('Erreur lors de l\'ajout de la question-réponse', error);
                }
              }}
            >
              Ajouter
            </button>
          </div>
        </>
      )}

      <h1>Liste des Questions et Réponses</h1>
      {questionsReponses.map((qr) => (
        <QuestionReponse
          key={qr._id}
          id={qr._id}  // Passer l'id à QuestionReponse
          question={qr.question}
          answer={qr.answer}
          onUpdate={handleUpdate}
          onDelete={handleDelete}  // Passer la fonction de suppression
          isLoggedIn={isLoggedIn}  // Passer l'état de connexion au composant enfant
        />
      ))}
    </div>
  );
};

export default QuestionsReponses;
