import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetViaggi } from "../redux/actions/viaggiActions"
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Form,
  Spinner,
  Offcanvas,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import { ArrowRight, SearchHeart } from "react-bootstrap-icons"
import FaqComponent from "./FaqComponent"

const ViaggiCatalogoComponent = () => {
  const dispatch = useDispatch()
  const { viaggi, error, loading } = useSelector((state) => state.viaggi)

  const [tipologiaFiltro, setTipologiaFiltro] = useState("")
  const [prezzoMinimo, setPrezzoMinimo] = useState(0)
  const [prezzoMassimo, setPrezzoMassimo] = useState(10000)
  const [durataMassima, setDurataMassima] = useState(30)
  const [showFiltri, setShowFiltri] = useState(false)

  const filtriAttivi = [
    tipologiaFiltro !== "",
    prezzoMinimo > 0,
    prezzoMassimo < 10000,
    durataMassima < 30,
  ].filter(Boolean).length

  useEffect(() => {
    dispatch(GetViaggi())
  }, [dispatch])

  const tipologieDisponibili = [
    ...new Set(viaggi.map((v) => v.tipologia)),
  ].sort()
  const prezziDisponibili = [...new Set(viaggi.map((v) => v.prezzo))].sort(
    (a, b) => a - b
  )

  const viaggiFiltrati = viaggi.filter((viaggio) => {
    const matchTipologia = tipologiaFiltro
      ? viaggio.tipologia?.toLowerCase() === tipologiaFiltro.toLowerCase()
      : true
    const matchPrezzo =
      viaggio.prezzo >= prezzoMinimo && viaggio.prezzo <= prezzoMassimo
    const matchDurata =
      durataMassima >= 30 ? true : viaggio.durataGiorni <= durataMassima
    return matchTipologia && matchPrezzo && matchDurata
  })

  const renderFiltriForm = () => (
    <Form className="filtriForm">
      <div className="d-flex justify-content-start align-items-center mb-4">
        <h5 className="text-danger mb-0">
          Filtri di ricerca
          <SearchHeart className="ms-2" />
        </h5>
        {filtriAttivi > 0 && (
          <span className="badge rounded-pill bg-danger ms-3">
            {filtriAttivi} attivi
          </span>
        )}
      </div>

      <Form.Group className="mb-4">
        <Form.Label>Tipologia</Form.Label>
        <Form.Select
          value={tipologiaFiltro}
          onChange={(e) => setTipologiaFiltro(e.target.value)}
          className="predefinitaOption"
        >
          <option value="">Tutte</option>
          {tipologieDisponibili.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Prezzo minimo</Form.Label>
        <Form.Select
          value={prezzoMinimo}
          onChange={(e) => setPrezzoMinimo(Number(e.target.value))}
          className="predefinitaOption"
        >
          {prezziDisponibili.map((p) => (
            <option key={p} value={p}>
              €{p}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Prezzo massimo</Form.Label>
        <Form.Select
          value={prezzoMassimo}
          onChange={(e) => setPrezzoMassimo(Number(e.target.value))}
          className="predefinitaOption"
        >
          {prezziDisponibili
            .slice()
            .reverse()
            .map((p) => (
              <option key={p} value={p}>
                €{p}
              </option>
            ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Durata massima</Form.Label>
        <Form.Select
          value={durataMassima}
          onChange={(e) => setDurataMassima(Number(e.target.value))}
          className="predefinitaOption"
        >
          <option value={30}>Qualsiasi</option>
          <option value={10}>Fino a 10 giorni</option>
          <option value={15}>Fino a 15 giorni</option>
          <option value={20}>Fino a 20 giorni</option>
          <option value={25}>Fino a 25 giorni</option>
        </Form.Select>
      </Form.Group>

      <Button
        variant="danger"
        className="w-100 mt-3"
        onClick={() => {
          setTipologiaFiltro("")
          setPrezzoMinimo(0)
          setPrezzoMassimo(10000)
          setDurataMassima(30)
        }}
      >
        Reset Filtri
      </Button>
    </Form>
  )

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" variant="danger" />
        <p className="text-danger mt-3">Caricamento viaggi in corso...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">
          Errore: {error}
        </Alert>
      </Container>
    )
  }

  return (
    <>
      <Container fluid className=" mt-5 rounded-0">
        <section className="intro-section text-center mb-5">
          <h2 className="intro-title">Scopri i nostri viaggi</h2>
          <p className="intro-subtitle">
            Scegli la tua prossima avventura tra mete uniche e imperdibili!
          </p>
        </section>

        {/* Bottone mobile per aprire filtri */}
        <div className="d-lg-none text-end m-3 me-5">
          <Button
            variant="outline-danger"
            className="position-relative"
            onClick={() => setShowFiltri(true)}
          >
            Ricerca <SearchHeart className="fs-5 ms-2" />
            {filtriAttivi > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.7rem" }}
              >
                {filtriAttivi}
              </span>
            )}
          </Button>
        </div>

        <Row>
          {/* Sidebar fissa da desktop */}
          <Col xs={12} lg={2} className="d-none d-lg-block ms-5">
            {renderFiltriForm()}
          </Col>

          {/* Offcanvas mobile */}
          <Offcanvas
            show={showFiltri}
            onHide={() => setShowFiltri(false)}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Filtra i viaggi</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>{renderFiltriForm()}</Offcanvas.Body>
          </Offcanvas>

          {/* Lista viaggi */}
          <Col xs={12} lg={9} className="px-4">
            <Row className="g-4">
              {viaggiFiltrati.map((viaggio) => (
                <Col key={viaggio.id} xs={12} sm={6} md={4} xxl={3}>
                  <Card className="viaggiCards text-white h-100">
                    {viaggio.immagineCopertina && (
                      <Card.Img
                        variant="top"
                        src={viaggio.immagineCopertina}
                        alt={viaggio.titolo}
                        style={{ objectFit: "cover", height: "350px" }}
                      />
                    )}
                    <Card.Body className="d-flex flex-column justify-content-end text-center">
                      <Card.Title>{viaggio.titolo}</Card.Title>
                      <Card.Text>
                        {new Date(viaggio.dataPartenza).toLocaleDateString(
                          "it-IT"
                        )}{" "}
                        -{" "}
                        {new Date(viaggio.dataRitorno).toLocaleDateString(
                          "it-IT"
                        )}
                      </Card.Text>
                      <Card.Text>
                        Durata: {viaggio.durataGiorni} giorni
                      </Card.Text>
                      <Card.Text className="fw-bold">
                        Da {viaggio.prezzo}€
                      </Card.Text>
                      <Link
                        to={`/viaggi/${viaggio.id}`}
                        className="btn btn-light mt-2"
                      >
                        Scopri di più <ArrowRight />
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {viaggiFiltrati.length === 0 && (
              <div className="text-center mt-5">
                <p className="text-muted">
                  Nessun viaggio trovato con i filtri selezionati.
                </p>
              </div>
            )}
          </Col>
        </Row>

        {/* FAQ Section */}
        <Row className="border-top border-danger mt-5 pt-5">
          <Col>
            <FaqComponent />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ViaggiCatalogoComponent
