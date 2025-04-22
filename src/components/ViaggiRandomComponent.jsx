import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import { GetViaggi } from "../redux/actions/viaggiActions"

const ViaggiRandomComponent = ({ quantità = 3 }) => {
  const dispatch = useDispatch()
  const { viaggi, error } = useSelector((state) => state.viaggi)

  useEffect(() => {
    if (viaggi.length === 0) {
      dispatch(GetViaggi())
    }
  }, [dispatch, viaggi.length])

  const viaggiCasuali = [...viaggi]
    .sort(() => 0.5 - Math.random())
    .slice(0, quantità)

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">
          Errore nel caricamento dei viaggi: {error}
        </Alert>
      </Container>
    )
  }

  if (viaggi.length === 0) {
    return (
      <Container className="my-4 text-center">
        <Spinner animation="border" />
        <p>Caricamento viaggi...</p>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <h4 className="mb-4">🌏 Ti consigliamo questi viaggi</h4>
      <Row>
        {viaggiCasuali.map((v) => (
          <Col md={4} lg={3} key={v.id} className="mb-4">
            <Card className="viaggiCards text-white text-center h-100 position-relative">
              {v.immagineCopertina && (
                <Card.Img
                  variant="top"
                  src={v.immagineCopertina}
                  alt={v.titolo}
                  style={{ objectFit: "cover", height: "360px" }}
                />
              )}
              <Card.Body className="d-flex flex-column">
                <Card.Title>{v.titolo}</Card.Title>
                <Card.Text className=" fw-semibold">
                  Dal: {new Date(v.dataPartenza).toLocaleDateString("it-IT")}{" "}
                  al: {new Date(v.dataRitorno).toLocaleDateString("it-IT")}
                </Card.Text>
                <Card.Text className="fw-bold">Prezzo: {v.prezzo} €</Card.Text>

                <Button
                  as={Link}
                  to={`/viaggi/${v.id}`}
                  className="mt-auto"
                  variant="primary"
                >
                  Scopri di più
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ViaggiRandomComponent
