import SezioneViaggiComponent from "./SezioneViaggiComponent"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "react-bootstrap"
import { Link } from "react-router-dom"

const HomePageComponent = () => {
  return (
    <>
      <div className="hero-section text-white text-center d-flex align-items-center justify-content-center">
        <div className="overlay"></div>

        <div className="content">
          <h1 className="VerticalJP">ただいま日本！</h1>
          <h2 className="display-3 fw-bold">Esplora il Giappone con noi</h2>
          <p className="lead">Viaggi su misura per ogni spirito</p>
          <div className="mt-4 buttonsHero">
            <Link
              to="/Viaggi"
              className="btn btn-outline-light fw-semibold me-3"
            >
              Scopri di più
            </Link>
            <Link
              to="/ViaggiPersonalizzati"
              className="btn btn-outline-light fw-semibold"
            >
              Personalizza il tuo viaggio
            </Link>
          </div>
        </div>
      </div>

      <Container className=" text-center mt-5">
        <Row>
          <div className=" d-flex justify-content-center align-items-center">
            <h2 className=" pt-2 pb-3 titleSlogan">
              Silenzio, armonia, bellezza. <br />
              <span className=" text-decoration-underline">Giappone</span>
            </h2>{" "}
          </div>

          <Col className="">
            <p className=" fst-italic fs-4 mt-2 mb-4">
              Potrai scoprire meravigliose città e conoscere una cultura dalle
              radici profonde, immergendoti in paesaggi, esperienze
              accattivanti, divertenti e anche spirituali.
            </p>
          </Col>
        </Row>
      </Container>
      <Container fluid className="p-0">
        <p className=" backgroundSlogan text-center fs-4 fw-semibold py-2">
          In gruppo o da soli potrete scegliere tra diversi itinerari o
          richiederne uno personalizzato!
        </p>

        <Row className=" flex-md-wrap flex-lg-nowrap justify-content-md-center align-items-md-center w-100 ps-4">
          <Col md={6} lg={4} className=" text-center p-3">
            <Card className=" shadow backgroundCard">
              <img
                src="https://www.itcattaneo.it/wp-content/uploads/2021/05/Visitare-il-Giappone.jpg"
                className="card-img-top h-50 "
                alt="Viaggi di Gruppo"
              />
              <CardBody className="">
                <CardTitle className="RedTitles">Viaggi di Gruppo</CardTitle>
                <CardText className=" py-lg-2 py-xl-4 px-xl-2">
                  Unisciti ad altri appassionati per un'avventura guidata in
                  Giappone.
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md={6} lg={4} className="text-center p-3">
            <Card className=" shadow backgroundCard">
              <img
                src="https://www.viaggidelgenio.it/wp-content/uploads/2023/09/2-1.jpg"
                className="card-img-top h-50 "
                alt="Viaggi Autonomi"
              />
              <CardBody className="card-body">
                <CardTitle className="card-title  RedTitles">
                  Viaggi in Autonomia
                </CardTitle>
                <CardText className="card-text  py-lg-2 py-xl-4 px-xl-2">
                  Itinerari suggeriti per esplorare in libertà, con il nostro
                  supporto.
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col md={6} lg={4} className="text-center p-3">
            <Card className=" shadow backgroundCard">
              <img
                src="https://travel.thewom.it/content/uploads/sites/4/2025/02/Motivi-per-visitare-il-giappone-704x528.jpg"
                className="card-img-top h-50 "
                alt="Viaggi Personalizzati"
              />
              <CardBody className="card-body">
                <CardTitle className="card-title  RedTitles">
                  Viaggi Personalizzati
                </CardTitle>
                <CardText className="card-text py-lg-2 py-xl-4 px-xl-2">
                  Costruiamo insieme il tuo viaggio ideale, su misura per te.
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <div className=" bordo mt-3 d-flex flex-column justify-content-center align-items-center">
        <h2 class="titleProposte">🎌LE NOSTRE PROPOSTE🎌</h2>
        <p class="subtitleProposte">
          I nostri itinerari pensati per ogni tipo di viaggiatore.
        </p>
        <SezioneViaggiComponent />
      </div>
      <section class="prenota-cta">
        <div class="cta-wrapper text-white d-flex flex-column align-items-center">
          <h3>
            Il Giappone ti aspetta: <br />
            scegli la tua prossima avventura!
          </h3>
          <p>
            Esplora le nostre proposte di viaggio in gruppo, in autonomia o
            personalizzate e inizia a pianificare l’esperienza perfetta per te.
          </p>
          <Link
            to={"/Viaggi"}
            className="btn prenota-btn d-flex flex-column justify-content-center align-items-center"
          >
            <span>PRENOTA ORA</span>
          </Link>
        </div>
      </section>
    </>
  )
}

export default HomePageComponent
