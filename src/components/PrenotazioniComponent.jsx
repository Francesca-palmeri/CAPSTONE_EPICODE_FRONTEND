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
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Modal,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap"
import {
  PeopleFill,
  CalendarDateFill,
  PencilFill,
  TrashFill,
  JournalBookmarkFill,
  GlobeAsiaAustralia,
  Crosshair2,
  BookmarkStarFill,
} from "react-bootstrap-icons"
import "./Styles/PrenotazioniStyles.css"

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
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (!user) return
    dispatch(GetViaggi())
    isAdmin
      ? dispatch(GetTutteLePrenotazioni())
      : dispatch(GetPrenotazioniUtente(utenteId))
  }, [dispatch, user, isAdmin, utenteId])

  const handleDelete = (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa prenotazione?")) {
      dispatch(DeletePrenotazione(id)).then(() => {
        isAdmin
          ? dispatch(GetTutteLePrenotazioni())
          : dispatch(GetPrenotazioniUtente(utenteId))
        setShowToast(true)
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
      setShowToast(true)
    })
  }

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="danger" />
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-danger">
          <JournalBookmarkFill className="me-2" />
          Tutte le prenotazioni
        </h2>
        {isAdmin && <p className="badge bg-danger fs-5 text-white">Admin</p>}
      </div>

      {Array.isArray(lista) && lista.length > 0 ? (
        <Row className="g-4">
          {lista.map((p) => (
            <Col xs={12} md={6} lg={4} key={p.id}>
              <Card className="prenotazione-card h-100 shadow-sm border border-danger-subtle d-flex flex-column">
                <Card.Body className="d-flex flex-column">
                  <div className="mb-4">
                    <Card.Title className="text-danger mb-4">
                      {p.nomeUtente} {p.cognomeUtente}
                    </Card.Title>

                    <p className="mb-2">
                      <CalendarDateFill className="me-2 icons-color" />
                      <strong>Data:</strong>{" "}
                      {new Date(p.dataPrenotazione).toLocaleDateString("it-IT")}
                    </p>
                    <p className="mb-2">
                      <PeopleFill className="me-2 icons-color" />
                      <strong>Partecipanti:</strong> {p.numeroPartecipanti}
                    </p>
                    <p className="mb-2">
                      <GlobeAsiaAustralia className="icons-color" />{" "}
                      <strong>Viaggio:</strong> {p.titoloViaggio}
                    </p>
                    <p className="mb-2">
                      <Crosshair2 className="icons-color" />{" "}
                      <strong>Tipologia:</strong> {p.tipologia}
                    </p>
                    {p.note && (
                      <p className="mb-0">
                        {" "}
                        <BookmarkStarFill className=" text-danger fs-5" />{" "}
                        <strong>Note:</strong> {p.note}
                      </p>
                    )}
                  </div>
                  {isAdmin && (
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <Button
                        className="btn-modifica"
                        size="sm"
                        onClick={() => {
                          setPrenotazioneDaModificare(p)
                          setShowEditModal(true)
                        }}
                      >
                        <PencilFill className="me-2" /> Modifica
                      </Button>

                      <Button
                        className="btn-elimina"
                        size="sm"
                        onClick={() => handleDelete(p.id)}
                      >
                        <TrashFill />
                        <span className="btn-text">Elimina</span>
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>Nessuna prenotazione trovata.</p>
      )}

      {/* Modal Modifica Prenotazione */}
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
                <Form.Label>Data Prenotazione</Form.Label>
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
                <Form.Label>Numero Partecipanti</Form.Label>
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
                  <option value="personalizzato">Viaggio personalizzato</option>
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

              <div className="text-end">
                <Button variant="outline-danger" type="submit">
                  Salva Modifiche
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      {/* Toast Successo */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Successo</strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            Operazione completata con successo!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  )
}

export default PrenotazioniComponent
