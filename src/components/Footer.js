import "./Footer.css"
const Footer = ( ) => {
  return ( 
  
<footer>
  <div className="container">
    <div className="footer-content">
      <div className="footer-up">
        <div className="footer-logo">
          <img src="/static/media/CGT transport.3fa524beae51b295fe42.png" alt="Logo CGT" />
        </div>

        <div className="footer-text">
          <p>Email: jujitsu.stephane@live.fr</p>
          <p>
            <a 
              href="/assets/Statuts cgt.pdf" 
              download 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Mentions légales
            </a>
          </p>
        </div>

        <div className="social-icons">
          <a href="https://www.facebook.com/CgtDhlExpressIntl" target="_blank" className="facebook" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://chat.whatsapp.com/Bpp6yRJDqyL0ENFxmC23iq" target="_blank" className="whatsapp" rel="noopener noreferrer">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Tous droits réservés
      </div>
    </div>
  </div>
</footer>

  )
}
export default Footer;