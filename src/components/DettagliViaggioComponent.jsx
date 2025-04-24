import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  Spinner,
  Button,
} from "react-bootstrap"
import GiorniViaggioComponent from "./GiorniViaggioComponent"
import PrenotazioneFormComponent from "./PrenotazioniFormComponent"
import ViaggiRandomComponent from "./ViaggiRandomComponent"
import DettagliInclusiComponent from "./DettagliInclusiComponent"
import { ArrowBarLeft } from "react-bootstrap-icons"
import { Link } from "react-router-dom"

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
          <Card className=" bg-white bg-opacity-75 border border-1 border-dark p-0 card-trips-details">
            <Card.Title className="titleDetailTrip text-center fw-bolder m-0 p-3 ">
              {viaggio.titolo}
            </Card.Title>
            {viaggio.immagineCopertina && (
              <Card.Img
                variant="top"
                src={viaggio.immagineCopertina}
                alt={viaggio.titolo}
                className=" rounded-0 py-4 bg-black"
                style={{ objectFit: "cover", height: "350px" }}
              />
            )}
            <div className="my-3 mx-4">
              <p className=" text-uppercasefirst">{viaggio.descrizione}</p>
              <p>Giorni di viaggio: {viaggio.durataGiorni}</p>
              <p>
                Dal:{" "}
                {new Date(viaggio.dataPartenza).toLocaleDateString("it-IT")} al:{" "}
                {new Date(viaggio.dataRitorno).toLocaleDateString("it-IT")}
              </p>
              <Card.Text className="fw-bold fs-5 text-danger">
                Prezzo: Da {viaggio.prezzo} € a persona
              </Card.Text>
              <Card.Text className="fw-bold text-end">
                Tipologia: {viaggio.tipologia}
              </Card.Text>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8} className="p-0">
          <GiorniViaggioComponent viaggioId={id} />
          <Button
            as={Link}
            to="/Viaggi"
            className=" text-decoration-none RegisterButton m-3 "
          >
            <ArrowBarLeft className=" mb-1" /> Torna al catalogo
          </Button>
        </Col>
        <Col xs={12} md={4} className=" mt-4">
          <DettagliInclusiComponent />
        </Col>
      </Row>
      <Row className=" mt-4">
        <Col xs={12}>
          <h2 className="mb-4">Prenota il tuo viaggio con noi</h2>
          <PrenotazioneFormComponent />
        </Col>
        <Col xs={12} className=" d-flex ">
          <ViaggiRandomComponent quantità={8} />
        </Col>
      </Row>
    </Container>
  )
}

export default DettagliViaggioComponent
