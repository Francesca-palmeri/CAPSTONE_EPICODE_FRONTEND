import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap"
import GiorniViaggioComponent from "./GiorniViaggioComponent"
import PrenotaButtonComponent from "./PrenotaButtonComponent"
import PrenotazioneFormComponent from "./PrenotazioniFormComponent"

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
            <p>
              Dal:{" "}
              {new Date(viaggio.dataPartenza).toLocaleDateString("it-IT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}{" "}
              al:{" "}
              {new Date(viaggio.dataRitorno).toLocaleDateString("it-IT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>

            <Card.Text className="fw-bold">
              Prezzo: {viaggio.prezzo} €
            </Card.Text>
            <Card.Text className="fw-bold">
              Tipologia: {viaggio.tipologia}
            </Card.Text>
            <PrenotaButtonComponent viaggioId={id} />
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
    </Container>
  )
}

export default DettagliViaggioComponent
