import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-row">
        {/* Logo + réseaux */}
        <div className="footer-brand">
          <img
            src="/static/media/CGT transport.3fa524beae51b295fe42.png"
            alt="Logo CGT Transport"
            className="footer-logo-img"
          />
          <div className="footer-social">
            <a
              href="https://www.facebook.com/CgtDhlExpressIntl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="social-link facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://chat.whatsapp.com/Bpp6yRJDqyL0ENFxmC23iq"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="social-link whatsapp"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <i className="fas fa-envelope footer-icon"></i>
          <a href="mailto:jujitsu.stephane@live.fr">jujitsu.stephane@live.fr</a>
        </div>

        {/* Liens légaux */}
        <div className="footer-legal-links">
          <Link to="/mentions-legales">Mentions légales</Link>
          <span className="footer-sep">|</span>
          <Link to="/mentions-legales#confidentialite">Confidentialité</Link>
          <span className="footer-sep">|</span>
          <Link to="/mentions-legales#cookies">Cookies</Link>
          <span className="footer-sep">|</span>
          <a
            href="/assets/Statuts cgt.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            Statuts CGT
          </a>
        </div>
      </div>

      {/* Barre du bas */}
      <div className="footer-bottom-bar">
        <p>© {new Date().getFullYear()} CGT DHL Express International — Tous droits réservés</p>
      </div>
    </footer>
  );
};

export default Footer;