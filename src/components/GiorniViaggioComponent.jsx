import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetGiorniViaggio } from "../redux/actions/giorniActions"
import { Container, ListGroup, Spinner, Alert } from "react-bootstrap"
import { Calendar2Check } from "react-bootstrap-icons"

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
      <p className=" fs-2  text-start mb-0">Programma: 🗓️</p>
      <ListGroup className=" border border-1 border-danger text bg-opacity-75">
        {giorni.map((giorno) => (
          <ListGroup.Item key={giorno.id}>
            <h5 className=" text-danger m-2">
              <Calendar2Check className="pb-1" /> {giorno.titolo}:
            </h5>
            <p className="m-2">{giorno.descrizione}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}

export default GiorniViaggioComponent
