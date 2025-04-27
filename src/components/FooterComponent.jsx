import { Container, Row, Col } from "react-bootstrap"
import { Facebook, Instagram, TwitterX } from "react-bootstrap-icons"

const FooterComponent = () => {
  return (
    <footer className="footer pb-0">
      <Container fluid className="footer-container">
        <Row className="text-center text-md-start">
          <Col xs={12} md={6} lg={3} className="mb-4">
            <div className="footer-section">
              <h2>Tadaima Nihon</h2>
              <p>
                Agenzia di viaggi e blog dedicato al Giappone. La nostra
                missione è ispirarti a vivere esperienze autentiche e
                indimenticabili.
              </p>
              <p>
                <strong>P.IVA:</strong> 12345678901
              </p>
            </div>
          </Col>

          <Col xs={12} md={6} lg={3} className="mb-4">
            <div className="footer-section links">
              <h2>Link Utili</h2>
              <ul>
                <li>
                  <a href="/Viaggi">Viaggi</a>
                </li>
                <li>
                  <a href="/BlogPage">Blog</a>
                </li>
                <li>
                  <a href="/frasi-utili">Frasi Utili</a>
                </li>
                <li>
                  <a href="/contatti">Contattaci</a>
                </li>
                <li>
                  <a href="/privacy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/termini">Termini e Condizioni</a>
                </li>
              </ul>
            </div>
          </Col>

          <Col xs={12} md={6} lg={3} className="mb-4">
            <div className="footer-section contact">
              <h2>Contatti</h2>
              <p>Agenzia di viaggio TADAIMA NIHON</p>
              <p>
                <strong>Email:</strong> infotadaimanihon@gmail.com
              </p>
              <p>
                <strong>Telefono:</strong> +39 347 123 4567
              </p>
              <p>
                <strong>Indirizzo:</strong> Via del Giappone 88, 00100 Roma,
                Italia
              </p>
              <p>
                <strong>Orari ufficio:</strong>
                <br />
                Lunedì - Venerdì: 9:00 - 18:00
              </p>
              <p>
                <strong>Contatti telefonici:</strong>
                <br />
                Lunedì - Venerdì: 9:00 - 18:00
                <br />
                Sabato: 9:00 - 13:00
              </p>
            </div>
          </Col>

          <Col xs={12} md={6} lg={3} className="mb-4">
            <div className="footer-section social">
              <h2>Seguici</h2>
              <ul>
                <li className="d-flex align-items-center justify-content-center justify-content-md-start">
                  <Facebook className="text-danger" />
                  <a href="#" className="ms-2">
                    Facebook
                  </a>
                </li>
                <li className="d-flex align-items-center justify-content-center justify-content-md-start">
                  <Instagram className="text-danger" />
                  <a href="#" className="ms-2">
                    Instagram
                  </a>
                </li>
                <li className="d-flex align-items-center justify-content-center justify-content-md-start">
                  <TwitterX className="text-danger" />
                  <a href="#" className="ms-2">
                    Twitter X
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="footer-disclaimer text-center">
        <p>
          Questo sito non è affiliato ufficialmente con enti turistici
          giapponesi e non ha scopo di lucro, attualmente parte di un progetto.
          I contenuti sono frutto di esperienze personali e raccolte da fonti
          affidabili.
        </p>
      </div>

      <div className="footer-bottom">
        &copy; 2025 Tadaima Nihon. Tutti i diritti riservati.
      </div>
    </footer>
  )
}

export default FooterComponent
