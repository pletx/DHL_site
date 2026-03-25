const Teammate = ({ name, role, image }) => {
  return (
    <div className="teammate-card">
      {image ? (
        <img src={image} alt={name} />
      ) : (
        <div className="teammate-photo-placeholder">
          <i className="fas fa-user"></i>
        </div>
      )}
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
};

export default Teammate;

