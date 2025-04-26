import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  Container,
  Card,
  Row,
  Col,
  Spinner,
  Alert,
  Form,
  Button,
  Toast,
  ToastContainer,
} from "react-bootstrap"
import { GetPrenotazioniUtente } from "../redux/actions/prenotazioniActions"
import { updateAvatarUrl, deleteAvatar } from "../redux/actions/authActions"
import {
  EnvelopeFill,
  CalendarDateFill,
  PersonFill,
  PeopleFill,
  JournalBookmarkFill,
  TelephoneFill,
  PencilFill,
} from "react-bootstrap-icons"
import "./Styles/ProfiloStyle.css"

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

  const [showEditForm, setShowEditForm] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  })

  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const fetchProfilo = async () => {
      try {
        const res = await fetch("https://localhost:7156/api/Account/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error("Errore durante il recupero del profilo")

        const data = await res.json()
        setProfilo(data)
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          phoneNumber: data.phoneNumber || "",
          email: data.email || "",
        })

        const utenteId = data.id
        dispatch(GetPrenotazioniUtente(utenteId))
      } catch (err) {
        setErroreProfilo(err.message)
      } finally {
        setLoadingProfilo(false)
      }
    }

    if (isAuthenticated && token) {
      fetchProfilo()
    }
  }, [dispatch, isAuthenticated, token])

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
        <Spinner animation="border" variant="danger" />
        <p className="text-danger mt-3">Caricamento dati profilo...</p>
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
      {/* Card Profilo */}
      <Card className="profilo-card shadow-lg p-4 mb-5 position-relative">
        <Button
          variant="link"
          className="position-absolute top-0 end-0 mt-2 me-2 text-danger"
          onClick={() => setShowEditForm(!showEditForm)}
        >
          <PencilFill size={22} />
        </Button>

        <Row className="align-items-center g-4">
          <Col md={4} className="text-center">
            <div className="d-flex justify-content-center align-items-center mb-3">
              <img
                src={profilo.avatarUrl || "/img/user-avatar.png"}
                alt="Avatar utente"
                className="profilo-avatar"
              />
            </div>

            <Form
              onSubmit={(e) => {
                e.preventDefault()
                const url = e.target.avatarUrl.value
                if (url) {
                  dispatch(updateAvatarUrl(url))
                  setProfilo((prev) => ({ ...prev, avatarUrl: url }))
                  e.target.reset()
                }
              }}
            >
              <Form.Group controlId="formAvatarUrl">
                <Form.Control
                  type="url"
                  name="avatarUrl"
                  placeholder="Incolla link immagine"
                  className="mb-2"
                  required
                />
              </Form.Group>
              <Button
                variant="outline-primary"
                size="sm"
                type="submit"
                className="w-100"
              >
                Aggiorna Avatar
              </Button>
            </Form>

            <Button
              variant="outline-danger"
              size="sm"
              className="w-100 mt-2"
              onClick={() => {
                if (window.confirm("Sei sicuro di voler rimuovere l'avatar?")) {
                  dispatch(deleteAvatar())
                  setProfilo((prev) => ({ ...prev, avatarUrl: null }))
                }
              }}
            >
              Rimuovi Avatar
            </Button>
          </Col>

          <Col md={8}>
            <h2 className="profilo-nome mb-4 d-flex justify-content-center align-items-center">
              <span className="me-2 text-danger">🎎</span>
              {profilo.firstName} {profilo.lastName}
            </h2>
            <div className="ms-5">
              <p className="text-danger mb-0">
                <TelephoneFill /> <strong>Telefono:</strong>
              </p>
              <p>{profilo.phoneNumber}</p>
              <p className="text-danger mb-0">
                <EnvelopeFill /> <strong>Email:</strong>
              </p>
              <p>{profilo.email}</p>
              <p className="text-danger mb-0">
                <CalendarDateFill /> <strong>Data di nascita:</strong>
              </p>
              <p>{new Date(profilo.birthDate).toLocaleDateString("it-IT")}</p>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Form Modifica sotto */}
      {showEditForm && (
        <Card className="profilo-card shadow-sm p-4 mb-5">
          <Form
            onSubmit={async (e) => {
              e.preventDefault()
              try {
                const response = await fetch(
                  "https://localhost:7156/api/Account/profile",
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                  }
                )

                if (!response.ok) {
                  const errorData = await response.json()
                  throw new Error(
                    errorData.message ||
                      "Errore durante l'aggiornamento del profilo."
                  )
                }

                const successData = await response.json()
                console.log(successData.message)

                setShowToast(true)
                setShowEditForm(false)

                setProfilo((prev) => ({
                  ...prev,
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  email: formData.email,
                  phoneNumber: formData.phoneNumber,
                }))
              } catch (error) {
                console.error("Errore aggiornamento profilo:", error.message)
                alert(error.message)
              }
            }}
          >
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="editFirstName">
                  <Form.Label className=" text-danger-emphasis">
                    Nome
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="editLastName">
                  <Form.Label className=" text-danger-emphasis">
                    Cognome
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mt-2">
              <Col md={6}>
                <Form.Group controlId="editPhone">
                  <Form.Label className=" text-danger-emphasis">
                    Telefono
                  </Form.Label>
                  <Form.Control
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="editEmail">
                  <Form.Label className=" text-danger-emphasis">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end mt-4">
              <Button type="submit" variant="danger">
                Salva Modifiche
              </Button>
            </div>
          </Form>
        </Card>
      )}

      {/* Prenotazioni */}
      <div className="text-center text-lg-start">
        <h3 className="mb-4 text-danger">
          <JournalBookmarkFill className="me-2 text-danger" />
          Le tue prenotazioni
        </h3>
      </div>

      {loading ? (
        <Spinner animation="border" variant="danger" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : prenotazioni?.length > 0 ? (
        <Row className="g-4">
          {prenotazioni.map((p) => (
            <Col xs={12} md={6} lg={4} key={p.id}>
              <Card className="prenotazione-card h-100 shadow-sm border border-danger-subtle">
                <Card.Body>
                  <Card.Title className="mb-3">{p.titoloViaggio}</Card.Title>
                  <p className="mb-2">
                    <CalendarDateFill className="me-2 text-warning" />{" "}
                    <strong>Data:</strong>{" "}
                    {new Date(p.dataPrenotazione).toLocaleDateString("it-IT")}
                  </p>
                  <p className="mb-2">
                    <PeopleFill className="me-2 text-success" />{" "}
                    <strong>Partecipanti:</strong> {p.numeroPartecipanti}
                  </p>
                  <p className="mb-2">
                    <PersonFill className="me-2 text-danger" />{" "}
                    <strong>Tipologia:</strong> {p.tipologia}
                  </p>
                  {p.note && (
                    <p className="mb-0">
                      <EnvelopeFill className="me-2 text-secondary" />{" "}
                      <strong>Note:</strong> {p.note}
                    </p>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>Nessuna prenotazione trovata.</p>
      )}

      {/* Toast Success */}
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
            Profilo aggiornato con successo!
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  )
}

export default ProfiloComponent
