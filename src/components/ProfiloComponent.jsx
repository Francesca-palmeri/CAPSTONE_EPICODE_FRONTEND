import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Container,
  Card,
  Row,
  Col,
  Spinner,
  Alert,
  ListGroup,
} from "react-bootstrap"
import { GetPrenotazioniUtente } from "../redux/actions/prenotazioniActions"

const ProfiloComponent = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, token } = useSelector((state) => state.auth)
  const {
    lista: prenotazioni,
    loading,
    error,
  } = useSelector((state) => state.prenotazioniLista)

  const [profilo, setProfilo] = useState(null)
  const [loadingProfilo, setLoadingProfilo] = useState(true)
  const [erroreProfilo, setErroreProfilo] = useState(null)

  useEffect(() => {
    const fetchProfilo = async () => {
      try {
        const res = await fetch("https://localhost:7156/api/Account/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) throw new Error("Errore durante il recupero del profilo")

        const data = await res.json()
        setProfilo(data)
      } catch (err) {
        setErroreProfilo(err.message)
      } finally {
        setLoadingProfilo(false)
      }
    }

    if (isAuthenticated) {
      fetchProfilo()
      dispatch(GetPrenotazioniUtente())
    }
  }, [isAuthenticated, token, dispatch])

  if (!isAuthenticated) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="warning">
          Devi essere loggato per visualizzare il profilo.
        </Alert>
      </Container>
    )
  }

  if (loadingProfilo) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
        <p>Caricamento dati profilo...</p>
      </Container>
    )
  }

  if (erroreProfilo) {
    return (
      <Container className="my-5">
        <Alert variant="danger">Errore: {erroreProfilo}</Alert>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <Card className="shadow p-4 mb-5">
        <Row className="align-items-center">
          <Col md={4} className="text-center">
            <img
              src="/img/user-avatar.png"
              alt="User Avatar"
              style={{ width: "150px", borderRadius: "50%" }}
            />
          </Col>
          <Col md={8}>
            <h3 className="mb-3">
              {profilo.firstName} {profilo.lastName}
            </h3>
            <p>
              <strong>Email:</strong> {profilo.email}
            </p>
            <p>
              <strong>ID Utente:</strong> {profilo.id}
            </p>
            <p>
              <strong>Data di nascita:</strong>{" "}
              {profilo.birthDate?.split("T")[0]}
            </p>
          </Col>
        </Row>
      </Card>

      <h4 className="mb-3">Le tue prenotazioni</h4>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : prenotazioni && prenotazioni.length > 0 ? (
        <ListGroup>
          {prenotazioni.map((p) => (
            <ListGroup.Item key={p.id}>
              <strong>Viaggio:</strong> {p.titoloViaggio} <br />
              <strong>Data:</strong>{" "}
              {new Date(p.dataPrenotazione).toLocaleDateString("it-IT")} <br />
              <strong>Partecipanti:</strong> {p.numeroPartecipanti} <br />
              <strong>Tipologia:</strong> {p.tipologia}
              {p.note && (
                <>
                  <br />
                  <strong>Note:</strong> {p.note}
                </>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>Nessuna prenotazione trovata.</p>
      )}
    </Container>
  )
}

export default ProfiloComponent
