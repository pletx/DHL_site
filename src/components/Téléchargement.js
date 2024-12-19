import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Téléchargement.css';
const Téléchargement = () => {
  const [pdfs, setPdfs] = useState([]);
  const [newPdf, setNewPdf] = useState({ title: '', file: null });
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // État de la connexion de l'utilisateur
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    // Vérifiez si l'utilisateur est connecté, par exemple avec un token dans le localStorage
    const token = localStorage.getItem('token');  // Exemple d'utilisation du localStorage
    if (token) {
      setIsLoggedIn(true);  // Si le token existe, on considère que l'utilisateur est connecté
    }

    const fetchPdfs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/pdfs`);
        setPdfs(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des PDFs:', error);
      }
    };
    fetchPdfs();
  }, []);

  const handleAddPdf = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', newPdf.title);
    formData.append('pdf', newPdf.file);

    try {
      const response = await axios.post(`${apiUrl}/api/pdfs`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPdfs([...pdfs, response.data]);
      setNewPdf({ title: '', file: null });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du PDF:', error);
    }
  };

  const handleDeletePdf = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/pdfs/${id}`);
      setPdfs(pdfs.filter(pdf => pdf._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression du PDF:', error);
    }
  };

  const getDownloadLink = (pdfUrl) => {
    return `${pdfUrl.replace('/upload/', '/upload/fl_attachment/')}`;
  };

  return (
    <div className="pdf-container">
  
  {isLoggedIn && (
    <form className="form-container" onSubmit={handleAddPdf}>
      <input
        type="text"
        className="form-input-text"
        placeholder="Titre du PDF"
        value={newPdf.title}
        onChange={(e) => setNewPdf({ ...newPdf, title: e.target.value })}
      />
      <input
        type="file"
        className="form-input-file"
        accept=".pdf"
        onChange={(e) => setNewPdf({ ...newPdf, file: e.target.files[0] })}
      />
      <button className="form-button" type="submit">Ajouter</button>
    </form>
  )}

  <ul className="pdf-list">
    {pdfs.map(pdf => (
      <li key={pdf._id} className="pdf-item">
        <p>
          {pdf.title}
        </p>
        <button className="pdf-button-download" onClick={() => window.open(getDownloadLink(pdf.pdfUrl), '_blank')}>Télécharger</button>
        {isLoggedIn && (
          <>
            <button className="pdf-button-delete" onClick={() => handleDeletePdf(pdf._id)}>Supprimer</button>
          </>
        )}
      </li>
    ))}
  </ul>
</div>
  )
};

export default Téléchargement;
