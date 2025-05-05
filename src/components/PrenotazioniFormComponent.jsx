import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  EffettuaPrenotazione,
  GetPrenotazioniUtente,
} from "../redux/actions/prenotazioniActions"
import { GetViaggi } from "../redux/actions/viaggiActions"
import { Form, Button, Container, Alert, Spinner, Modal } from "react-bootstrap"
import jsPDF from "jspdf"
import { Link } from "react-router-dom"
import "./Styles/PrenotazioniStyles.css"

const PrenotazioneFormComponent = () => {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { loading, error } = useSelector((state) => state.prenotazione)
  const { viaggi, loading: loadingViaggi } = useSelector(
    (state) => state.viaggi
  )
  const { isAuthenticated } = useSelector((state) => state.auth)

  const [showModal, setShowModal] = useState(false)
  const [datiConferma, setDatiConferma] = useState(null)

  const utenteId =
    user?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ]
  const nomeUtente =
    user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
    "Utente"
  const emailUtente = user?.["email"] || "utente@esempio.com"

  const [formData, setFormData] = useState({
    viaggioId: "",
    dataPrenotazione: new Date().toISOString().split("T")[0],
    numeroPartecipanti: 1,
    tipologia: "personalizzato",
    note: "",
    descrizionePersonalizzata: "",
  })

  useEffect(() => {
    dispatch(GetViaggi())
  }, [dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numeroPartecipanti" ? parseInt(value) : value,
    }))
  }

  const generatePDF = (data, titoloViaggio, email, numeroConferma) => {
    const doc = new jsPDF()
    let y = 20
    const lineHeight = 7
    const maxWidth = 170

    doc.setFontSize(18).text("Conferma Prenotazione", 20, y)
    y += 10

    doc.setFontSize(12)
    doc.text(`Grazie: ${data.nomeUtente}`, 20, y)
    y += lineHeight
    doc.text(`Email: ${email}`, 20, y)
    y += lineHeight
    doc.text(`Numero prenotazione: #${numeroConferma}`, 20, y)
    y += lineHeight

    doc.line(20, y, 190, y)
    y += lineHeight

    doc.text("Dettagli prenotazione:", 20, y)
    y += lineHeight
    doc.text(`Viaggio: ${titoloViaggio}`, 20, y)
    y += lineHeight
    doc.text(
      `Data Prenotazione: ${new Date(data.dataPrenotazione).toLocaleDateString(
        "it-IT"
      )}`,
      20,
      y
    )
    y += lineHeight
    doc.text(`Partecipanti: ${data.numeroPartecipanti}`, 20, y)
    y += lineHeight
    doc.text(`Tipologia: ${data.tipologia}`, 20, y)
    y += lineHeight

    if (data.tipologia === "personalizzato" && data.descrizionePersonalizzata) {
      doc.text("Descrizione personalizzata:", 20, y)
      y += lineHeight

      const descrLines = doc.splitTextToSize(
        data.descrizionePersonalizzata,
        maxWidth
      )
      doc.text(descrLines, 20, y)
      y += descrLines.length * lineHeight
    }

    if (data.note) {
      doc.text("Note:", 20, y)
      y += lineHeight

      const noteLines = doc.splitTextToSize(data.note, maxWidth)
      doc.text(noteLines, 20, y)
      y += noteLines.length * lineHeight
    }

    doc.line(20, y, 190, y)
    y += lineHeight

    doc.setFontSize(11).setFont("helvetica", "italic")
    const thanksText =
      "Grazie per averci contattato! Ti ricontatteremo presto per preparare il viaggio perfetto per te."
    const thanksLines = doc.splitTextToSize(thanksText, maxWidth)
    doc.text(thanksLines, 20, y)

    doc.save("conferma-prenotazione.pdf")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      ...formData,
      viaggioId:
        formData.tipologia === "personalizzato" ? null : formData.viaggioId,
      utenteId,
      dataPrenotazione: new Date(formData.dataPrenotazione).toISOString(),
    }

    await dispatch(EffettuaPrenotazione(payload))
    dispatch(GetPrenotazioniUtente(utenteId))

    const titoloViaggio =
      formData.tipologia === "personalizzato"
        ? "Viaggio Personalizzato"
        : viaggi.find((v) => v.id === parseInt(formData.viaggioId))?.titolo ||
          "Viaggio"

    const numeroConferma = Math.floor(100000 + Math.random() * 900000)

    generatePDF(
      { ...payload, nomeUtente },
      titoloViaggio,
      emailUtente,
      numeroConferma
    )

    setDatiConferma({
      ...payload,
      titoloViaggio,
      numeroConferma,
    })
    setShowModal(true)

    setFormData({
      viaggioId: "",
      dataPrenotazione: new Date().toISOString().split("T")[0],
      numeroPartecipanti: 1,
      tipologia: "Personalizzato",
      note: "",
    })
  }
  if (isAuthenticated) {
    return (
      <Container className="my-5 prenotazione-form-container">
        <h3 className="mb-4">Effettua una prenotazione</h3>
        <p>
          Seleziona il viaggio che più ti interessa oppure richiedine uno
          personalizzato
        </p>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Seleziona Viaggio</Form.Label>
            {loadingViaggi ? (
              <Spinner animation="border" />
            ) : (
              <Form.Select
                name="viaggioId"
                value={formData.viaggioId}
                onChange={handleChange}
              >
                <option value="">-- Seleziona un viaggio --</option>
                <option value="personalizzato">Personalizzato</option>
                {viaggi.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.titolo}
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Numero partecipanti</Form.Label>
            <Form.Control
              type="number"
              name="numeroPartecipanti"
              value={formData.numeroPartecipanti}
              onChange={handleChange}
              min="1"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipologia</Form.Label>
            <Form.Select
              name="tipologia"
              value={formData.tipologia}
              onChange={handleChange}
              required
            >
              <option value="gruppo">Viaggio di gruppo</option>
              <option value="autonomia">Viaggio in autonomia</option>
              <option value="personalizzato">Personalizzato</option>
            </Form.Select>
          </Form.Group>
          {formData.tipologia === "personalizzato" && (
            <Form.Group className="mb-3">
              <Form.Label>Descrivi il viaggio che desideri</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="descrizionePersonalizzata"
                value={formData.descrizionePersonalizzata}
                onChange={handleChange}
                placeholder="Descrivi le mete, il periodo, il budget, ecc."
                required
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Richieste aggiuntive</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Inserisci eventuali preferenze o necessità specifiche"
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Invio in corso..." : "Prenota"}
          </Button>
        </Form>
        {error && (
          <Alert variant="danger" className="mt-3">
            Errore: {error}
          </Alert>
        )}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          centered
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>Conferma Prenotazione</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {datiConferma && (
              <div>
                <p>
                  <strong>Numero prenotazione:</strong> #
                  {datiConferma.numeroConferma}
                </p>
                <hr />
                <p>
                  <strong>Viaggio:</strong> {datiConferma.titoloViaggio}
                </p>
                <p>
                  <strong>Data:</strong>{" "}
                  {new Date(datiConferma.dataPrenotazione).toLocaleDateString(
                    "it-IT"
                  )}
                </p>
                <p>
                  <strong>Partecipanti:</strong>{" "}
                  {datiConferma.numeroPartecipanti}
                </p>
                <p>
                  <strong>Tipologia:</strong> {datiConferma.tipologia}
                </p>
                {datiConferma.tipologia === "personalizzato" && (
                  <>
                    <hr />
                    <p>
                      <strong>Descrizione personalizzata:</strong>
                    </p>
                    <p>{datiConferma.descrizionePersonalizzata}</p>
                  </>
                )}
                {datiConferma.note && (
                  <>
                    <hr />
                    <p>
                      <strong>Note aggiuntive:</strong>
                    </p>
                    <p>{datiConferma.note}</p>
                  </>
                )}
                <hr />
                <p className="text-success">
                  Grazie per la tua prenotazione! Ti invieremo a breve ulteriori
                  dettagli.
                </p>
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="outline-primary"
              onClick={() =>
                generatePDF(
                  { ...datiConferma, nomeUtente },
                  datiConferma.titoloViaggio,
                  emailUtente,
                  datiConferma.numeroConferma
                )
              }
            >
              Scarica PDF
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    )
  } else {
    return (
      <Container className="my-5 text-center text-uppercase">
        <Alert variant="warning">
          Devi avere effettuato l'accesso per consultare questa pagina.
        </Alert>
        <Button variant="danger" as={Link} to="/LoginPage">
          Vai al Login
        </Button>
      </Container>
    )
  }
}

export default PrenotazioneFormComponent
