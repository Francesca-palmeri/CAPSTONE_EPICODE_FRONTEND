import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetViaggi } from "../redux/actions/viaggiActions"
import {
  Container,
  Carousel,
  Card,
  Badge,
  Spinner,
  Row,
  Col,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import {
  Airplane,
  CalendarDay,
  EmojiLaughing,
  Headset,
  PencilSquare,
  PeopleFill,
  PersonWorkspace,
  TrainLightrailFront,
} from "react-bootstrap-icons"

const SezioneViaggiComponent = () => {
  const dispatch = useDispatch()
  const { viaggi, loading, error } = useSelector((state) => state.viaggi)

  useEffect(() => {
    if (!viaggi || viaggi.length === 0) {
      dispatch(GetViaggi())
    }
  }, [dispatch, viaggi])

  const viaggiGruppo = viaggi
    .filter((v) => v.tipologia === "Viaggio di gruppo")
    .slice(0, 6)

  const viaggiAutonomia = viaggi
    .filter((v) => v.tipologia === "Viaggio in autonomia")
    .slice(0, 6)

  console.log(viaggiAutonomia, viaggiGruppo)

  const renderCarousel = (listaViaggi, coloreBadge, coloreButton) => (
    <Carousel
      indicators={false}
      controls={false}
      className="my-2 mx-md-5 mx-lg-2 px-md-5 px-lg-0 "
    >
      {listaViaggi.map((viaggio) => (
        <Carousel.Item key={viaggio.id}>
          <Card className=" text-center m-2 viaggiCards text-white text-center h-100 position-relative fw-bolder">
            <div className="position-relative">
              {viaggio.immagineCopertina && (
                <Card.Img
                  variant="top"
                  src={viaggio.immagineCopertina}
                  alt={viaggio.titolo}
                  style={{ objectFit: "cover", height: "380px" }}
                />
              )}
              <Badge bg={coloreBadge} className=" badgeForm">
                {viaggio.tipologia.toUpperCase()}
              </Badge>
            </div>
            <Card.Body className=" d-flex flex-column  ">
              <Card.Title className=" display-3 fw-bold">
                {viaggio.titolo}
              </Card.Title>
              <Card.Text className=" m-2">
                <p>
                  Dal{" "}
                  {new Date(viaggio.dataPartenza).toLocaleDateString("it-IT")} –{" "}
                  al {new Date(viaggio.dataRitorno).toLocaleDateString("it-IT")}
                </p>

                <p>Durata: {viaggio.durataGiorni} giorni</p>
                <p className=" fw-semibold">Prezzo: €{viaggio.prezzo}</p>
              </Card.Text>
              <Link
                to={`/viaggi/${viaggio.id}`}
                className={`btn btn-${coloreButton} mt-auto`}
              >
                Scopri di più
              </Link>
            </Card.Body>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  )

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
        <p>Caricamento viaggi in corso...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="my-5 text-center text-danger">
        <p>Errore nel caricamento dei viaggi: {error}</p>
      </Container>
    )
  }

  return (
    <Container fluid className="my-5">
      <Row className=" align-items-center">
        <Col
          sm={12}
          className=" d-flex flex-column flex-lg-row justify-content-between "
        >
          <Col sm={12} lg={4} className=" ps-4 text-center w-100 d-lg-none">
            {renderCarousel(viaggiGruppo, "danger", "danger")}
          </Col>
          <Col sm={12} lg={8}>
            <div className=" text-center text-lg-start px-5">
              <h2 className=" fs-1 text-center mb-4 text-danger">
                Viaggi di gruppo consigliati
              </h2>
              <h4 className="text-danger">
                <PeopleFill /> Piccoli gruppi
              </h4>
              <p>
                Partenze da un massimo di 15/20 viaggiatori per gruppo, per
                viaggiare in maniera confortevole e godere della compagnia.
              </p>
              <h4 className="text-danger">
                {" "}
                <Airplane /> Volo incluso
              </h4>
              <p>
                I voli sono inclusi nel prezzo, da Roma Fiumicino o Milano
                Malpensa, con un bagaglio in stiva sempre incluso.
              </p>
              <h4 className="text-danger">
                {" "}
                <PersonWorkspace /> Tour Leader esperti
              </h4>
              <p>
                Gli accompagnatori hanno tutti grande esperienza riguardo la
                destinazione, conoscono la cultura e la lingua giapponese.
              </p>
              <h4 className="text-danger">
                {" "}
                <TrainLightrailFront /> Attività tradizionali e stimolanti
              </h4>
              <p>
                Le esperienze offerte sono tipiche giapponesi, dalle cerimonie
                del tè alle lezioni di cucina tradizionale, fino alla scoperta
                di antichi templi e giardini zen.
              </p>
            </div>
          </Col>

          <Col sm={12} lg={4} className=" ps-4 text-center d-none d-lg-block">
            {renderCarousel(viaggiGruppo, "danger", "danger")}
          </Col>
        </Col>

        <Col
          sm={12}
          className=" d-flex flex-column flex-lg-row justify-content-center "
        >
          <Col sm={12} lg={4} className=" ps-md-5 ps-4 mt-lg-5">
            {renderCarousel(viaggiAutonomia, "warning", "warning")}
          </Col>
          <Col sm={12} lg={8}>
            <div className="p-5 ">
              <h2 className=" fs-1 text-warning text-center mb-4 ">
                Viaggi in autonomia consigliati
              </h2>
              <h4 className="text-warning">
                <PencilSquare /> Su Misura
              </h4>
              <p>Decidi la tua destinazione e il tuo itinerario!</p>
              <h4 className="text-warning">
                <Headset /> Preparazione del viaggio
              </h4>
              <p>
                Un nostro esperto sarà a disposizione per programmare al meglio
                la tua vacanza.
              </p>
              <h4 className="text-warning">
                <CalendarDay /> Programma giornaliero
              </h4>
              <p>
                Avrai a disposizione una schedule giornaliera prefissata durante
                la programmazione di viaggio con il nostro esperto.
              </p>
              <h4 className="text-warning">
                <EmojiLaughing /> Accoglienza sempre inclusa
              </h4>
              <p>
                All'arrivo in aeroporto avrai un assistente dedicato che ti
                guiderà fino al tuo alloggio e ti fornirà tutte le informazioni
                necessarie per iniziare il tuo viaggio.
              </p>
            </div>
          </Col>
        </Col>
      </Row>
    </Container>
  )
}

export default SezioneViaggiComponent
