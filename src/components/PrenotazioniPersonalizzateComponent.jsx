import { Container, Row, Col } from "react-bootstrap"
import PrenotazioneFormComponent from "./PrenotazioniFormComponent"
import ViaggiRandomComponent from "./ViaggiRandomComponent"
import { Compass, Star, ChatDots } from "react-bootstrap-icons"
import { Link } from "react-router-dom"

const PrenotazioniPersonalizzateComponent = () => {
  return (
    <Container fluid className=" mt-5 rounded-0">
      <Row className="mb-5 justify-content-center text-center">
        <Col lg={8} className="intro-section ">
          <h1 className="intro-title">
            Crea il tuo viaggio da sogno in Giappone
          </h1>
          <p className="intro-subtitle">
            Compila il modulo per richiedere un itinerario su misura. I nostri
            travel expert ti aiuteranno a creare un'esperienza indimenticabile,
            che unisca cultura, natura e modernità giapponese.
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col md={3} className="text-center">
          <Compass size={50} className="text-danger mb-3" />
          <h5>Itinerari su misura</h5>
          <p className="text-muted">
            Tu scegli la direzione, noi costruiamo il percorso perfetto per te.
          </p>
        </Col>
        <Col md={3} className="text-center">
          <Star size={50} className="text-danger mb-3" />
          <h5>Esperienze autentiche</h5>
          <p className="text-muted">
            Scopri il Giappone vero: templi nascosti, ryokan, onsen e cucina
            locale.
          </p>
        </Col>
        <Col md={3} className="text-center">
          <ChatDots size={50} className="text-danger mb-3" />
          <h5>Consulenza gratuita</h5>
          <p className="text-muted">
            Parla con noi senza impegno: ti guidiamo passo dopo passo.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col xs={12} className="d-flex flex-column align-items-center">
          <PrenotazioneFormComponent />
          <div className="text-center mt-4 ">
            <p className="titleSlogan">
              Non sei ancora sicuro o vuoi chiederci ulteriori informazioni?
            </p>
            <p className="lead ">
              Puoi contattarci tramite numero di telefono o compilando il form
              che trovi nella pagina{" "}
              <Link to={"/Contatti"} className=" text-danger fw-bold">
                CONTATTI
              </Link>{" "}
            </p>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <ViaggiRandomComponent quantità={8} />
        </Col>
      </Row>
    </Container>
  )
}

export default PrenotazioniPersonalizzateComponent
