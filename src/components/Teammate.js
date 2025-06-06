const Teammate = ({ name, role, image }) => {
  return (
    <div className="teammate-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
};

export default Teammate;

