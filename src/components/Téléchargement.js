// Téléchargement.js
import React from 'react';
import './Téléchargement.css';

const fichiersParTheme = {
  "Accords et Négociations": [
    "Accord signé CSEC CSEE Dialogue Social 2024.pdf",
    "Négociation accord d.docx R1 Mai 2024.pdf",
    "R2 Accord Nego interessement (1).pdf",
  ],
  "Communications CGT": [
    "Communication_CGT_congés_payés_24_avril_2024.pdf",
    "COM CGT PSE LYON (1).pdf",
    "Communication CGT Elections 2024 (1).pdf",
    "Communication CGT PSE LYS GTW du 15 07 2024.pdf",
  ],
  "Fiches Techniques Temps de Travail": [
    "Dhl-FT-01-TempsTravailRegimeStandart-MAJ-22juin06.pdf",
    "Dhl-FT-02-TempsTravail-CS.pdf",
    "Dhl-FT-04-Cycles.pdf",
    "Dhl-FT-06-TempsTravail-4ou4_5-Jours.pdf",
    "Dhl-FT-31-TempsTravail-Roulants.pdf",
  ],
  "Primes et Indemnités": [
    "Dhl-FT-12-PrimeReactivite.pdf",
    "Dhl-FT-18-CongesPayes.pdf",
    "Dhl-FT-19-CongeAnciennete.pdf",
    "Dhl-FT-38-PrimePresence.pdf",
    "Dhl-FT-39-PrimePerformanceNonCadre.pdf",
  ],
  "Congés et Événements": [
    "Dhl-FT-23-CongesEvenementsFamiliaux.pdf",
    "Dhl-FT-25-JoursPonts.pdf",
    "Dhl-FT-26-Rachat-Jours-RTT.pdf",
  ],
};

const Téléchargement = () => {
  return (
    <div className="telechargement-container">
      {Object.keys(fichiersParTheme).map((theme, index) => (
        <div key={index} className="theme-section">
          <h3 className="theme-title">{theme}</h3>
          <div className="theme-files">
            {fichiersParTheme[theme].map((fichier, fileIndex) => (
              <a
                key={fileIndex}
                href={`${process.env.PUBLIC_URL}/download/${fichier}`}
                download
                className="telechargement-link"
              >
                Télécharger {fichier}
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Téléchargement;
