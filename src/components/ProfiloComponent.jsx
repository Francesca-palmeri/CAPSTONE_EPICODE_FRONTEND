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
  Modal,
} from "react-bootstrap"
import { GetPrenotazioniUtente } from "../redux/actions/prenotazioniActions"
import { updateAvatarFile, deleteAvatar } from "../redux/actions/authActions"
import {
  EnvelopeFill,
  CalendarDateFill,
  PersonFill,
  PeopleFill,
  JournalBookmarkFill,
  TelephoneFill,
  PencilFill,
  BookmarkStarFill,
  TrashFill,
  Plus,
  GlobeAsiaAustralia,
  BookmarkFill,
} from "react-bootstrap-icons"
import "./Styles/ProfiloStyle.css"

const ProfiloComponent = () => {
  const dispatch = useDispatch()

  const { isAuthenticated, token } = useSelector((state) => state.auth)
  const stateAuth = useSelector((state) => state.auth)
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

  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [showPreviewModal, setShowPreviewModal] = useState(false)

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

  useEffect(() => {
    if (profilo && stateAuth?.user?.avatarUrl) {
      setProfilo((prev) => ({
        ...prev,
        avatarUrl: stateAuth.user.avatarUrl,
      }))
      setSelectedAvatarFile(null)
      setAvatarPreview(null)
    }
  }, [stateAuth?.user?.avatarUrl])

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
      setShowPreviewModal(true)
    }
  }

  const handleAvatarSubmit = (e) => {
    e.preventDefault()
    if (selectedAvatarFile) {
      dispatch(updateAvatarFile(selectedAvatarFile))
      setShowPreviewModal(false)
    }
  }

  const handleDeleteAvatar = () => {
    if (window.confirm("Sei sicuro di voler rimuovere l'avatar?")) {
      dispatch(deleteAvatar())
      setProfilo((prev) => ({ ...prev, avatarUrl: null }))
    }
  }

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

        <Row className="align-items-center">
          <Col
            md={4}
            className=" d-flex justify-content-center align-items-start text-center"
          >
            <div className="text-center position-relative d-inline-block">
              <img
                src={
                  avatarPreview ||
                  (profilo.avatarUrl
                    ? `https://localhost:7156${profilo.avatarUrl}`
                    : "/user-avatar.png")
                }
                alt="Avatar utente"
                className="profilo-avatar"
              />

              <label
                htmlFor="avatarFile"
                className="btn btn-outline-danger badge-avatar-add d-flex align-items-center justify-content-center"
              >
                <Plus size={20} />
              </label>

              <button
                type="button"
                className="btn btn-outline-dark badge-avatar-remove d-flex align-items-center justify-content-center"
                onClick={handleDeleteAvatar}
              >
                <TrashFill />
              </button>

              <input
                id="avatarFile"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: "none" }}
              />
            </div>
          </Col>

          <Col md={8}>
            <div className=" mb-4 d-flex flex-column flex-md-row justify-content-center align-items-center border-top border-3 border-danger-subtle mt-4">
              <p className="text-danger fs-3">🎎</p>
              <p className="profilo-nome text-center mt-0">
                {profilo.firstName} {profilo.lastName}
              </p>
            </div>
            <div className="ms-lg-5 text-center text-md-start">
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

      {/* Modal Preview */}
      <Modal
        show={showPreviewModal}
        onHide={() => {
          setShowPreviewModal(false)
          setSelectedAvatarFile(null)
          setAvatarPreview(null)
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Anteprima Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Anteprima Avatar"
              className="avatar-preview-modal-img"
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowPreviewModal(false)
              setSelectedAvatarFile(null)
              setAvatarPreview(null)
            }}
          >
            Annulla
          </Button>
          <Button variant="primary" onClick={handleAvatarSubmit}>
            Carica Avatar
          </Button>
        </Modal.Footer>
      </Modal>

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
                      setFormData({
                        ...formData,
                        phoneNumber: e.target.value,
                      })
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
                  <Card.Title className="mb-3">
                    {p.titoloViaggio ? p.titoloViaggio : "Personalizzato"}
                  </Card.Title>

                  <p className="mb-2">
                    <CalendarDateFill className="me-2 text-danger" />{" "}
                    <strong>Data prenotazione:</strong>{" "}
                    {new Date(p.dataPrenotazione).toLocaleDateString("it-IT")}
                  </p>
                  <p className="mb-2">
                    <PeopleFill className="me-2  text-danger" />{" "}
                    <strong>Partecipanti:</strong> {p.numeroPartecipanti}
                  </p>
                  <p className="mb-2">
                    <GlobeAsiaAustralia className=" text-danger" />{" "}
                    <strong>Viaggio:</strong> {p.titoloViaggio}
                  </p>
                  <p className="mb-2">
                    <PersonFill className="me-2 text-danger" />{" "}
                    <strong>Tipologia:</strong> {p.tipologia}
                  </p>
                  {p.descrizionePersonalizzata && (
                    <>
                      <p className=" text-danger fw-semibold mb-0 pb-1">
                        <BookmarkStarFill /> Richieste personalizzate:
                      </p>

                      <div className="descrizione-scroll">
                        <p className="mb-2">{p.descrizionePersonalizzata}</p>
                      </div>
                    </>
                  )}
                  {p.note && (
                    <p className="mb-0 mt-2">
                      <BookmarkFill className="me-2 text-secondary" />{" "}
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
