import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap"
import GiorniViaggioComponent from "./GiorniViaggioComponent"
import PrenotazioneFormComponent from "./PrenotazioniFormComponent"
import ViaggiRandomComponent from "./ViaggiRandomComponent"

const DettagliViaggioComponent = () => {
  const { id } = useParams()
  const [viaggio, setViaggio] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchViaggio = async () => {
      try {
        const response = await fetch(`https://localhost:7156/api/Viaggi/${id}`)
        if (!response.ok) {
          throw new Error("Errore nel recupero dei dettagli del viaggio")
        }

        const data = await response.json()
        setViaggio(data.viaggio || data.Viaggio || data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchViaggio()
  }, [id])

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
        <p>Caricamento viaggio...</p>
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

  if (!viaggio) {
    return (
      <Container className="my-5">
        <Alert variant="warning">Viaggio non trovato.</Alert>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card className="p-4">
            <h2>{viaggio.titolo}</h2>
            {viaggio.immagineCopertina && (
              <Card.Img
                variant="top"
                src={viaggio.immagineCopertina}
                alt={viaggio.titolo}
                style={{ objectFit: "cover", height: "300px" }}
              />
            )}
            <p className="mt-3">{viaggio.descrizione}</p>
            <p>Giorni di viaggio: {viaggio.durataGiorni}</p>
            <p>
              Dal: {new Date(viaggio.dataPartenza).toLocaleDateString("it-IT")}{" "}
              al: {new Date(viaggio.dataRitorno).toLocaleDateString("it-IT")}
            </p>

            <Card.Text className="fw-bold">
              Prezzo: Da {viaggio.prezzo} € a persona
            </Card.Text>
            <Card.Text className="fw-bold">
              Tipologia: {viaggio.tipologia}
            </Card.Text>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <GiorniViaggioComponent viaggioId={id} />
        </Col>
        <Col>
          <h2 className="mb-4">Prenota il tuo viaggio con noi</h2>
          <PrenotazioneFormComponent />
        </Col>
      </Row>
      <Row>
        <Col>
          <ViaggiRandomComponent quantità={4} />
        </Col>
      </Row>
    </Container>
  )
}

export default DettagliViaggioComponent
