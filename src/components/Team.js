import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import './Team.css';

const Team = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [teamMembers, setTeamMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: '', role: '', photo: null });
  const [editMember, setEditMember] = useState(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/team`);
        setTeamMembers(response.data);
      } catch (error) {
        console.error('Échec de la récupération des membres de l\'équipe :', error);
      }
    };

    fetchTeamMembers();
  }, []);

  const handleFileChange = (event) => {
    setNewMember({ ...newMember, photo: event.target.files[0] });
  };

  const handleEditFileChange = (event) => {
    setEditMember({ ...editMember, photo: event.target.files[0] });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditMember({ ...editMember, [name]: value });
  };

  const handleAddMember = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newMember.name);
      formData.append('role', newMember.role);
      if (newMember.photo) {
        formData.append('photo', newMember.photo);
      }

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/team`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setTeamMembers([...teamMembers, response.data]);
      setNewMember({ name: '', role: '', photo: null });
    } catch (error) {
      console.error('Échec de l\'ajout du membre de l\'équipe :', error);
    }
  };

  const handleEditMember = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editMember.name);
      formData.append('role', editMember.role);
      if (editMember.photo) {
        formData.append('photo', editMember.photo);
      }

      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/team/${editMember._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setTeamMembers(
        teamMembers.map((member) =>
          member._id === editMember._id ? response.data : member
        )
      );
      setEditMember(null);
    } catch (error) {
      console.error('Échec de la modification du membre de l\'équipe :', error);
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/team/${id}`);
      setTeamMembers(teamMembers.filter((member) => member._id !== id));
    } catch (error) {
      console.error('Échec de la suppression du membre de l\'équipe :', error);
    }
  };

  return (
    <div className="team-container">
      <h2>Équipe</h2>
      <div className="team-list">
        {teamMembers.map((member) => (
          <div className="team-member" key={member._id}>
            <img src={member.photoUrl} alt={member.name} className="team-photo" />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            {isLoggedIn && (
              <div>
                <button onClick={() => setEditMember(member)}>Modifier</button>
                <button onClick={() => handleDeleteMember(member._id)}>Supprimer</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isLoggedIn && (
        <div className="team-form">
          <h3>Ajouter un nouveau membre</h3>
          <input
            type="text"
            name="name"
            value={newMember.name}
            onChange={handleInputChange}
            placeholder="Nom"
          />
          <input
            type="text"
            name="role"
            value={newMember.role}
            onChange={handleInputChange}
            placeholder="Rôle"
          />
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleAddMember}>Ajouter membre</button>
        </div>
      )}

      {editMember && (
        <div className="team-form">
          <h3>Modifier le membre</h3>
          <input
            type="text"
            name="name"
            value={editMember.name}
            onChange={handleEditInputChange}
            placeholder="Nom"
          />
          <input
            type="text"
            name="role"
            value={editMember.role}
            onChange={handleEditInputChange}
            placeholder="Rôle"
          />
          <input type="file" onChange={handleEditFileChange} />
          <button onClick={handleEditMember}>Enregistrer les modifications</button>
          <button onClick={() => setEditMember(null)}>Annuler</button>
        </div>
      )}
    </div>
  );
};

export default Team;
