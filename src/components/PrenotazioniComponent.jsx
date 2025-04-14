import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  GetPrenotazioniUtente,
  GetTutteLePrenotazioni,
  DeletePrenotazione,
} from "../redux/actions/prenotazioniActions"
import {
  Container,
  ListGroup,
  Spinner,
  Alert,
  Button,
  Row,
  Col,
} from "react-bootstrap"

const PrenotazioniComponent = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { lista, loading, error } = useSelector(
    (state) => state.prenotazioniLista
  )

  const ruolo =
    user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  const utenteId =
    user?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ]
  const isAdmin = ruolo === "Admin"

  useEffect(() => {
    if (!user) return
    if (isAdmin) {
      dispatch(GetTutteLePrenotazioni())
    } else if (utenteId) {
      dispatch(GetPrenotazioniUtente(utenteId))
    }
  }, [dispatch, user, isAdmin, utenteId])

  const handleDelete = (id) => {
    if (window.confirm("Vuoi davvero eliminare questa prenotazione?")) {
      dispatch(DeletePrenotazione(id)).then(() => {
        dispatch(
          isAdmin ? GetTutteLePrenotazioni() : GetPrenotazioniUtente(utenteId)
        )
      })
    }
  }

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p>Caricamento prenotazioni...</p>
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
      <h2 className="mb-4">Le tue prenotazioni</h2>
      {Array.isArray(lista) && lista.length > 0 ? (
        <ListGroup>
          {lista.map((p) => (
            <ListGroup.Item key={p.id}>
              <Row>
                <Col>
                  <h5>
                    {p.nomeUtente} {p.cognomeUtente}
                  </h5>
                  <p>
                    <strong>Viaggio:</strong> {p.titoloViaggio} <br />
                    <strong>Data prenotazione:</strong>{" "}
                    {new Date(p.dataPrenotazione).toLocaleDateString("it-IT")}{" "}
                    <br />
                    <strong>Partecipanti:</strong> {p.numeroPartecipanti} <br />
                    <strong>Tipologia:</strong> {p.tipologia} <br />
                    {p.note && (
                      <>
                        <strong>Note:</strong> {p.note}
                      </>
                    )}
                  </p>
                </Col>
                {isAdmin && (
                  <Col xs="auto" className="d-flex align-items-center">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(p.id)}
                    >
                      Elimina
                    </Button>
                  </Col>
                )}
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>Nessuna prenotazione trovata.</p>
      )}
    </Container>
  )
}

export default PrenotazioniComponent
