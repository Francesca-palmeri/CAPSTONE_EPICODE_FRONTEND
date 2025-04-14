import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetGiorniViaggio } from "../redux/actions/giorniActions"
import { Container, ListGroup, Spinner, Alert } from "react-bootstrap"

const GiorniViaggioComponent = ({ viaggioId }) => {
  const dispatch = useDispatch()
  const { giorni, loading, error } = useSelector((state) => state.giorniViaggio)

  useEffect(() => {
    if (viaggioId) {
      dispatch(GetGiorniViaggio(viaggioId))
    }
  }, [dispatch, viaggioId])

  if (loading) {
    return (
      <Container className="text-center my-4">
        <Spinner animation="border" />
        <p>Caricamento giorni viaggio...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="my-4">
        <Alert variant="danger">Errore: {error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="my-4">
      <h4>Itinerario giorno per giorno:</h4>
      <ListGroup>
        {giorni.map((giorno, index) => (
          <ListGroup.Item key={giorno.id}>
            <strong>Giorno {index + 1}:</strong> {giorno.descrizione}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}

export default GiorniViaggioComponent
