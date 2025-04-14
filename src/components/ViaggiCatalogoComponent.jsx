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
} from "react-bootstrap"
import { Link } from "react-router-dom"

const ViaggiCatalogoComponent = () => {
  const dispatch = useDispatch()
  const { viaggi, error, loading } = useSelector((state) => state.viaggi)

  const [tipologiaFiltro, setTipologiaFiltro] = useState("")
  const [prezzoMinimo, setPrezzoMinimo] = useState(0)
  const [prezzoMassimo, setPrezzoMassimo] = useState(10000)
  const [durataMassima, setDurataMassima] = useState(30)

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
    <Container className="my-5">
      <h2 className="mb-4 text-center">Catalogo Viaggi</h2>

      <Form className="mb-4">
        <Row className="g-3 align-items-end">
          <Col md={3}>
            <Form.Label>Tipologia</Form.Label>
            <Form.Select
              value={tipologiaFiltro}
              onChange={(e) => setTipologiaFiltro(e.target.value)}
            >
              <option value="">Tutte</option>
              {tipologieDisponibili.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Label>Prezzo minimo</Form.Label>
            <Form.Select
              value={prezzoMinimo}
              onChange={(e) => setPrezzoMinimo(Number(e.target.value))}
            >
              {prezziDisponibili.map((p) => (
                <option key={p} value={p}>
                  €{p}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col md={2}>
            <Form.Label>Prezzo massimo</Form.Label>
            <Form.Select
              value={prezzoMassimo}
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
          </Col>

          <Col md={3}>
            <Form.Label>Durata massima</Form.Label>
            <Form.Select
              value={durataMassima}
              onChange={(e) => setDurataMassima(Number(e.target.value))}
            >
              <option value={30}>Qualsiasi</option>
              <option value={10}>Fino a 10 giorni</option>
              <option value={15}>Fino a 15 giorni</option>
              <option value={20}>Fino a 20 giorni</option>
              <option value={25}>Fino a 25 giorni</option>
            </Form.Select>
          </Col>

          <Col md={2}>
            <Button
              variant="secondary"
              onClick={() => {
                setTipologiaFiltro("")
                setPrezzoMinimo(0)
                setPrezzoMassimo(10000)
                setDurataMassima(30)
              }}
            >
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
      <Row>
        {viaggiFiltrati.map((viaggio) => (
          <Col key={viaggio.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100">
              {viaggio.immagineCopertina && (
                <Card.Img
                  variant="top"
                  src={viaggio.immagineCopertina}
                  alt={viaggio.titolo}
                  style={{ objectFit: "cover", height: "200px" }}
                />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title>{viaggio.titolo}</Card.Title>
                <Card.Text className="flex-grow-1">
                  {new Date(viaggio.dataPartenza).toLocaleDateString("it-IT")} -{" "}
                  {new Date(viaggio.dataRitorno).toLocaleDateString("it-IT")}
                  <br />
                  Durata: {viaggio.durataGiorni} giorni
                </Card.Text>
                <Card.Text className="fw-bold">
                  Prezzo: Da {viaggio.prezzo} € a persona
                </Card.Text>
                <Card.Text className="fw-bold">
                  Tipologia: <br /> {viaggio.tipologia}
                </Card.Text>
                <Link
                  to={`/viaggi/${viaggio.id}`}
                  className="btn btn-primary mt-2"
                >
                  Scopri di più
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {viaggiFiltrati.length === 0 && (
        <div className="text-center mt-4">
          <p>Nessun viaggio trovato con i filtri selezionati.</p>
        </div>
      )}
    </Container>
  )
}

export default ViaggiCatalogoComponent
