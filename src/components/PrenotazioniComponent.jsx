import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  GetPrenotazioniUtente,
  GetTutteLePrenotazioni,
  DeletePrenotazione,
  UpdatePrenotazione,
} from "../redux/actions/prenotazioniActions"
import { GetViaggi } from "../redux/actions/viaggiActions"
import {
  Container,
  ListGroup,
  Spinner,
  Alert,
  Button,
  Row,
  Col,
  Form,
  Modal,
} from "react-bootstrap"

const PrenotazioniComponent = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { lista, loading, error } = useSelector(
    (state) => state.prenotazioniLista
  )
  const { viaggi } = useSelector((state) => state.viaggi)

  const ruolo =
    user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  const utenteId =
    user?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ]
  const isAdmin = ruolo === "Admin"

  const [showEditModal, setShowEditModal] = useState(false)
  const [prenotazioneDaModificare, setPrenotazioneDaModificare] = useState(null)

  useEffect(() => {
    if (!user) return
    dispatch(GetViaggi())
    isAdmin
      ? dispatch(GetTutteLePrenotazioni())
      : dispatch(GetPrenotazioniUtente(utenteId))
  }, [dispatch, user, isAdmin, utenteId])

  const handleDelete = (id) => {
    if (window.confirm("Vuoi davvero eliminare questa prenotazione?")) {
      dispatch(DeletePrenotazione(id)).then(() => {
        isAdmin
          ? dispatch(GetTutteLePrenotazioni())
          : dispatch(GetPrenotazioniUtente(utenteId))
      })
    }
  }

  const handleUpdateSubmit = (e) => {
    e.preventDefault()
    dispatch(UpdatePrenotazione(prenotazioneDaModificare)).then(() => {
      isAdmin
        ? dispatch(GetTutteLePrenotazioni())
        : dispatch(GetPrenotazioniUtente(utenteId))
      setShowEditModal(false)
    })
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
      <h2 className="mb-4">Prenotazioni</h2>

      {Array.isArray(lista) && lista.length > 0 ? (
        <ListGroup>
          {lista.map((p) => (
            <ListGroup.Item key={p.id}>
              <Row>
                <Col>
                  <h5>
                    {p.nomeUtente} {p.cognomeUtente}{" "}
                    {isAdmin && (
                      <span className="badge bg-warning text-dark">Admin</span>
                    )}
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
                  <Col
                    xs="auto"
                    className="d-flex flex-column justify-content-center align-items-end"
                  >
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="mb-2"
                      onClick={() => {
                        setPrenotazioneDaModificare(p)
                        setShowEditModal(true)
                      }}
                    >
                      Modifica
                    </Button>
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

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifica Prenotazione</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {prenotazioneDaModificare && (
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Data prenotazione</Form.Label>
                <Form.Control
                  type="date"
                  value={
                    prenotazioneDaModificare.dataPrenotazione.split("T")[0]
                  }
                  onChange={(e) =>
                    setPrenotazioneDaModificare((prev) => ({
                      ...prev,
                      dataPrenotazione: e.target.value,
                    }))
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Viaggio</Form.Label>
                <Form.Select
                  value={prenotazioneDaModificare.viaggioId}
                  onChange={(e) =>
                    setPrenotazioneDaModificare((prev) => ({
                      ...prev,
                      viaggioId: parseInt(e.target.value),
                    }))
                  }
                >
                  <option value="">-- Seleziona un viaggio --</option>
                  {viaggi.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.titolo}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Numero partecipanti</Form.Label>
                <Form.Control
                  type="number"
                  value={prenotazioneDaModificare.numeroPartecipanti}
                  onChange={(e) =>
                    setPrenotazioneDaModificare((prev) => ({
                      ...prev,
                      numeroPartecipanti: parseInt(e.target.value),
                    }))
                  }
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tipologia</Form.Label>
                <Form.Select
                  value={prenotazioneDaModificare.tipologia}
                  onChange={(e) =>
                    setPrenotazioneDaModificare((prev) => ({
                      ...prev,
                      tipologia: e.target.value,
                    }))
                  }
                  required
                >
                  <option value="gruppo">Viaggio di gruppo</option>
                  <option value="autonomia">Viaggio in autonomia</option>
                  <option value="personalizzato">Personalizzato</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Note</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={prenotazioneDaModificare.note || ""}
                  onChange={(e) =>
                    setPrenotazioneDaModificare((prev) => ({
                      ...prev,
                      note: e.target.value,
                    }))
                  }
                />
              </Form.Group>

              <Button type="submit" variant="primary">
                Salva modifiche
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default PrenotazioniComponent
