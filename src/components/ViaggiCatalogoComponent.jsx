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
      <div className=" d-flex justify-content-start align-items-center">
        <p className=" d-none d-lg-block fs-5 mb-0 border-bottom border-1 border-danger text-danger">
          Filtri di ricerca <SearchHeart className="fs-5 ms-5" />
        </p>

        {filtriAttivi > 0 && (
          <p className="badge bg-danger fw-light p-1 mb-0 ms-4 ">
            {filtriAttivi} {filtriAttivi > 0 ? "attivi" : ""}
          </p>
        )}
      </div>

      <Form.Group className="mt-4">
        <Form.Label className="mt-4 mb-0">Tipologia</Form.Label>
        <Form.Select
          value={tipologiaFiltro}
          className="predefinitaOption py-0"
          onChange={(e) => setTipologiaFiltro(e.target.value)}
        >
          <option value="">Tutte</option>
          {tipologieDisponibili.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label className="mt-4 mb-0">Prezzo minimo</Form.Label>
        <Form.Select
          value={prezzoMinimo}
          className="predefinitaOption"
          onChange={(e) => setPrezzoMinimo(Number(e.target.value))}
        >
          {prezziDisponibili.map((p) => (
            <option key={p} value={p}>
              €{p}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label className="mt-4 mb-0">Prezzo massimo</Form.Label>
        <Form.Select
          value={prezzoMassimo}
          className="predefinitaOption"
          onChange={(e) => setPrezzoMassimo(Number(e.target.value))}
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

      <Form.Group>
        <Form.Label className="mt-4 mb-0">Durata massima</Form.Label>
        <Form.Select
          value={durataMassima}
          className="predefinitaOption"
          onChange={(e) => setDurataMassima(Number(e.target.value))}
        >
          <option value={30}>Qualsiasi</option>
          <option value={10}>Fino a 10 giorni</option>
          <option value={15}>Fino a 15 giorni</option>
          <option value={20}>Fino a 20 giorni</option>
          <option value={25}>Fino a 25 giorni</option>
        </Form.Select>
      </Form.Group>

      <Button
        variant="outline-danger "
        className="mt-3"
        onClick={() => {
          setTipologiaFiltro("")
          setPrezzoMinimo(0)
          setPrezzoMassimo(10000)
          setDurataMassima(30)
        }}
      >
        Reset
      </Button>
    </Form>
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
      <Container className="my-5">
        <Alert variant="danger">Errore: {error}</Alert>
      </Container>
    )
  }

  return (
    <Container fluid className="my-5">
      <h2 className="mb-lg-5 display-5 text-center fw-semibold catalogoColor">
        ⛩️ Catalogo Viaggi ⛩️
      </h2>

      {/* Bottone mobile per aprire filtri */}
      <div className="d-lg-none text-end m-3 me-5">
        <Button
          variant="outline-danger"
          className="mb-3 py-1 position-relative"
          onClick={() => setShowFiltri(true)}
        >
          Ricerca <SearchHeart className="fs-5 ms-2" />
          {filtriAttivi > 0 && (
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.6rem" }}
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
            <Offcanvas.Title>Filtri di ricerca</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>{renderFiltriForm()}</Offcanvas.Body>
        </Offcanvas>

        {/* Risultati viaggi */}
        <Col xs={12} lg={9} className="px-5">
          <Row className="g-4">
            {viaggiFiltrati.map((viaggio) => (
              <Col key={viaggio.id} xs={12} sm={6} md={4} xxl={3}>
                <Card className="viaggiCards text-white h-100 position-relative">
                  {viaggio.immagineCopertina && (
                    <Card.Img
                      variant="top"
                      src={viaggio.immagineCopertina}
                      alt={viaggio.titolo}
                      style={{ objectFit: "cover", height: "350px" }}
                    />
                  )}
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center">
                    <Card.Title>{viaggio.titolo}</Card.Title>
                    <Card.Text className="fw-semibold mb-md-1">
                      {new Date(viaggio.dataPartenza).toLocaleDateString(
                        "it-IT"
                      )}{" "}
                      -{" "}
                      {new Date(viaggio.dataRitorno).toLocaleDateString(
                        "it-IT"
                      )}
                    </Card.Text>
                    <Card.Text className="mb-lg-1">
                      Durata: {viaggio.durataGiorni} giorni
                    </Card.Text>
                    <Card.Text className="fw-bold mb-2">
                      Prezzo: Da {viaggio.prezzo} € a persona
                    </Card.Text>
                    <Card.Text className="fw-bold mb-md-1">
                      {viaggio.tipologia}
                    </Card.Text>
                    <Link
                      to={`/viaggi/${viaggio.id}`}
                      className="btn btn-primary mt-auto px-4 fw-bold"
                    >
                      Scopri di più <ArrowRight />
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        {viaggiFiltrati.length === 0 && (
          <div className="text-center mt-4">
            <p>Nessun viaggio trovato con i filtri selezionati.</p>
          </div>
        )}
      </Row>
      <Row className=" border border-0 border-top border-danger mt-5 ">
        <Col className=" mt-5">
          <FaqComponent />
        </Col>
      </Row>
    </Container>
  )
}

export default ViaggiCatalogoComponent
