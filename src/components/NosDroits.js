import React from 'react';
import ActionCard from '../../components/ActionCard';
import TractCard from '../../components/TractCard';
import './NosActions.css';
import image1 from "../../assets/logo-cgt.jpg";

const actions = [
  {
    title: "Action 1",
    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
    image: image1
  }
  // Ajoutez d'autres actions ici
];

const tracts = [
  {
    title: "Tract 1",
    image: image1,
    pdfLink: "/path/to/tract1.pdf"
  },
  {
    title: "Tract 2",
    image: image1,
    pdfLink: "/path/to/tract2.pdf"
  },
  // Ajoutez d'autres tracts ici
];

const NosActions = () => {
  return (
    <div className="nos-actions">
      <section id="actions">
        <h2>Nos Actions</h2>
        {actions.map((action, index) => (
          <ActionCard 
            key={index}
            title={action.title}
            text={action.text}
            image={action.image}
          />
        ))}
      </section>
      <section id="tracts">
        <h2>Nos Tracts</h2>
        {tracts.map((tract, index) => (
          <TractCard 
            key={index}
            title={tract.title}
            image={tract.image}
            pdfLink={tract.pdfLink}
          />
        ))}
      </section>
    </div>
  );
};

export default NosActions;
