import { Container } from "react-bootstrap"
import {
  Facebook,
  Instagram,
  Twitter,
  TwitterX,
  X,
} from "react-bootstrap-icons"

const FooterComponent = () => {
  return (
    <footer className=" pb-0">
      <Container fluid className="footer-container">
        <div className="footer-section">
          <h2>Tadaima Nihon</h2>
          <p>
            Un blog dedicato ai viaggi, alle esperienze e alle avventure. Scopri
            storie uniche e ispirati per il tuo prossimo viaggio.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Link Utili</h2>
          <ul>
            <li>
              <a href="/viaggi">Viaggi</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/contatti">Contatti</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>
        <div className="footer-section social">
          <h2>Seguici</h2>
          <ul>
            <li className="d-flex align-items-center">
              <Facebook className=" text-danger" />
              <a href="#" className=" ms-1">
                Facebook
              </a>
            </li>
            <li className="d-flex align-items-center">
              <Instagram className=" text-danger" />
              <a href="#" className=" ms-1">
                Instagram
              </a>
            </li>
            <li className="d-flex align-items-center">
              <TwitterX className=" text-danger" />
              <a href="#" className=" ms-1">
                Twitter X
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="footer-bottom">
        &copy; 2025 Tadaima Nihon. Tutti i diritti riservati.
      </div>
    </footer>
  )
}

export default FooterComponent
