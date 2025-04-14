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

  const renderCarousel = (listaViaggi, coloreBadge) => (
    <Carousel variant="dark" className="mb-5">
      {listaViaggi.map((viaggio) => (
        <Carousel.Item key={viaggio.id}>
          <Card className="mx-auto shadow" style={{ maxWidth: "500px" }}>
            <div className="position-relative">
              {viaggio.immagineCopertina && (
                <Card.Img
                  variant="top"
                  src={viaggio.immagineCopertina}
                  alt={viaggio.titolo}
                  style={{ objectFit: "cover", height: "200px" }}
                />
              )}
              <Badge
                bg={coloreBadge}
                className="position-absolute top-0 start-0 m-2"
              >
                {viaggio.tipologia.toUpperCase()}
              </Badge>
            </div>
            <Card.Body className="text-center d-flex flex-column">
              <Card.Title>{viaggio.titolo}</Card.Title>
              <Card.Text>
                {new Date(viaggio.dataPartenza).toLocaleDateString("it-IT")} –{" "}
                {new Date(viaggio.dataRitorno).toLocaleDateString("it-IT")}
                <br />
                Durata: {viaggio.durataGiorni} giorni
                <br />
                Prezzo: €{viaggio.prezzo}
              </Card.Text>
              <Link
                to={`/viaggi/${viaggio.id}`}
                className="btn btn-primary mt-auto"
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
    <Container className="my-5">
      <Row>
        <Col sm={12} md={6}>
          <h2 className="text-center mb-4">Viaggi di gruppo consigliati</h2>
          {renderCarousel(viaggiGruppo, "info")}
        </Col>
        <Col sm={12} md={6}>
          <h2 className="text-center mb-4">Viaggi in autonomia consigliati</h2>
          {renderCarousel(viaggiAutonomia, "success")}
        </Col>
      </Row>
    </Container>
  )
}

export default SezioneViaggiComponent
