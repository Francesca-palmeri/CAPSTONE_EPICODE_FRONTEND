import SezioneViaggiComponent from "./SezioneViaggiComponent"
import { Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const HomePageComponent = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section text-white text-center d-flex align-items-center justify-content-center">
        <div className="overlay"></div>

        <div className="content">
          <h1 className="VerticalJP">ただいま日本！</h1>
          <h2 className="display-3 fw-bold">Esplora il Giappone con noi</h2>
          <p className="lead">Viaggi su misura per ogni spirito</p>
          <div className="mt-4">
            <Link to="/Viaggi" className="btn btn-outline-light me-3">
              Scopri di più
            </Link>
            <Link
              to="/PrenotazioniPersonalizzate"
              className="btn btn-outline-light"
            >
              Personalizza il tuo viaggio
            </Link>
          </div>
        </div>
      </div>

      <Container className=" text-center my-5">
        <Row>
          <h2 className=" titleSlogan">Sogni di andare in Giappone?</h2>
          <Col className="">
            <p className=" fst-italic fs-5 mt-2 mb-4">
              Potrai scoprire meravigliose città e conoscere una cultura dalle
              radici profonde, immergendoti in paesaggi, esperienze
              accattivanti, divertenti e anche spirituali.
            </p>
          </Col>
        </Row>
      </Container>
      <Container fluid className="p-0">
        <p className=" backgroundSlogan w-100 text-center fs-4 py-2 mb-0 mx-0">
          In gruppo o da soli potrete scegliere tra diversi itinerari o
          richiederne uno personalizzato!
        </p>

        <Row className=" flex-md-wrap justify-content-md-center align-items-md-center ps-1 ">
          <Col md={6} lg={4} className=" text-center p-3">
            <div className="card h-100 shadow backgroundCard">
              <img
                src="https://www.itcattaneo.it/wp-content/uploads/2021/05/Visitare-il-Giappone.jpg"
                className="card-img-top"
                alt="Viaggi di Gruppo"
              />
              <div className="card-body ">
                <h5 className="card-title RedTitles">Viaggi di Gruppo</h5>
                <p className="card-text">
                  Unisciti ad altri appassionati per un'avventura guidata in
                  Giappone.
                </p>
              </div>
            </div>
          </Col>
          <Col md={6} lg={4} className="text-center p-3">
            <div className="card h-100 shadow backgroundCard">
              <img
                src="https://www.viaggidelgenio.it/wp-content/uploads/2023/09/2-1.jpg"
                className="card-img-top"
                alt="Viaggi Autonomi"
              />
              <div className="card-body">
                <h5 className="card-title  RedTitles">Viaggi in Autonomia</h5>
                <p className="card-text">
                  Itinerari suggeriti per esplorare in libertà, con il nostro
                  supporto.
                </p>
              </div>
            </div>
          </Col>
          <Col md={6} lg={4} className="text-center p-3">
            <div className="card h-100 shadow backgroundCard">
              <img
                src="https://travel.thewom.it/content/uploads/sites/4/2025/02/Motivi-per-visitare-il-giappone-704x528.jpg"
                className="card-img-top"
                alt="Viaggi Personalizzati"
              />
              <div className="card-body">
                <h5 className="card-title  RedTitles">Viaggi Personalizzati</h5>
                <p className="card-text">
                  Costruiamo insieme il tuo viaggio ideale, su misura per te.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <div>
        <SezioneViaggiComponent />
      </div>
      <div>
        <Link to={"/Viaggi"}>PRENOTA</Link>
      </div>
    </>
  )
}

export default HomePageComponent
