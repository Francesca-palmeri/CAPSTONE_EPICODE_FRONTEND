import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container, ListGroup, Spinner, Alert } from "react-bootstrap"

// Simula un'azione per recuperare prenotazioni dell'utente
import { GetPrenotazioniUtente } from "../redux/actions/prenotazioniActions"

const PrenotazioniUtenteComponent = () => {
  const dispatch = useDispatch()
  const { lista, loading, error } = useSelector(
    (state) => state.prenotazioniUtente
  )

  useEffect(() => {
    dispatch(GetPrenotazioniUtente())
  }, [dispatch])

  if (loading) {
    return (
      <Container className="text-center mt-4">
        <Spinner animation="border" />
        <p>Caricamento prenotazioni...</p>
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
    <Container className="my-5">
      <h2>Le tue prenotazioni</h2>
      <ListGroup>
        {lista.map((p) => (
          <ListGroup.Item key={p.id}>
            Viaggio: {p.viaggioTitolo} <br />
            Data prenotazione:{" "}
            {new Date(p.dataPrenotazione).toLocaleDateString("it-IT")}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  )
}

export default PrenotazioniUtenteComponent
