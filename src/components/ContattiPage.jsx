import { Container, Row, Col } from "react-bootstrap"
import ContattoForm from "./ContattoForm"
import { ChatDots } from "react-bootstrap-icons"

const ContattiPage = () => {
  return (
    <Container fluid className=" bg-white w-100 pb-5 bg-contattaci-header">
      <div className="overlay-contatti">
        <Row className="text-center">
          <Col xs={12} className=" my-4 bg-white bg-opacity-75">
            <h2 className=" colorTextContatti display-5 fw-bold pt-2 mb-0">
              Contattaci
              <ChatDots className=" text-black-50 mx-2 pb-3 mb-3" />
            </h2>
            <p className=" fs-5 text-dark fw-semibold">
              Hai domande o vuoi organizzare un viaggio personalizzato in
              Giappone? Scrivici!
            </p>
          </Col>
        </Row>
        <Row>
          <Col
            xs={12}
            lg={5}
            className=" text-white text-center fw-bold fs-4 informazioniContatto pt-3 ms-lg-5"
          >
            <p className=" fs-2 fw-bolder text-uppercase mt-5">
              Informazioni di contatto
            </p>
            <p> Agenzia di viaggio TADAIMA NIHON </p>
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
              <strong>Orari di apertura ufficio:</strong>
              <br />
              Lunedì - Venerdì: 9:00 - 18:00
            </p>
            <p>
              <strong>Orari di contatto telefonico:</strong>
              <br />
              Lunedì - Venerdì: 9:00 - 18:00
              <br />
              Sabato: 9:00 - 13:00
            </p>
          </Col>
          <Col xs={12} lg={6} className=" pe-3 pe-lg-5 mt-5 mt-lg-0">
            <ContattoForm />
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default ContattiPage
