import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { Container, Card, Row, Col, Button, Spinner } from "react-bootstrap"
import { useState, useEffect } from "react"
import {
  ArrowBarLeft,
  Send,
  Eye,
  ChatLeftDots,
  Heart,
} from "react-bootstrap-icons"
import CommentoComponent from "./CommentoComponent"
import { getBlogPostById } from "../redux/actions/blogActions"

const BlogDettaglioComponent = () => {
  const { postId } = useParams()
  const dispatch = useDispatch()

  const { lista, dettaglio, loading, error } = useSelector(
    (state) => state.blog
  )

  const [postCopy, setPostCopy] = useState(null)
  const [nuovoCommento, setNuovoCommento] = useState("")
  const [inviando, setInviando] = useState(false)
  const [erroreInvio, setErroreInvio] = useState("")
  const [mostraFormCommento, setMostraFormCommento] = useState(false)

  const getUserFromToken = () => {
    const token = localStorage.getItem("token")
    if (!token) return null

    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      return payload
    } catch (error) {
      console.error("Invalid token:", error)
      return null
    }
  }

  const currentUser = getUserFromToken()

  useEffect(() => {
    const foundPost = Array.isArray(lista)
      ? lista.find((p) => p.id === parseInt(postId))
      : null

    if (foundPost) {
      setPostCopy(foundPost)
    } else {
      dispatch(getBlogPostById(postId))
    }
  }, [postId, lista, dispatch])

  useEffect(() => {
    if (dettaglio && dettaglio.id === parseInt(postId)) {
      setPostCopy(dettaglio)
    }
  }, [dettaglio, postId])

  const handleInvioCommento = async () => {
    if (!nuovoCommento.trim()) return
    setInviando(true)
    setErroreInvio("")

    try {
      const res = await fetch("https://localhost:7156/api/Commenti", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          testo: nuovoCommento,
          blogPostId: postCopy.id,
        }),
      })

      if (!res.ok) throw new Error("Errore nell'invio del commento")

      const data = await res.json()
      const nuovo = {
        id: data.id,
        testo: data.testo,
        dataCreazione: data.dataCreazione,
        utenteId: data.utenteId,
        utenteNome: data.utenteNome,
        avatarUrl: data.avatarUrl,
      }

      setPostCopy({
        ...postCopy,
        commenti: [nuovo, ...(postCopy.commenti || [])],
      })
      setNuovoCommento("")
    } catch (error) {
      setErroreInvio(error.message)
    } finally {
      setInviando(false)
    }
  }

  const handleEliminaCommento = async (commentoId) => {
    const conferma = window.confirm(
      "Sei sicuro di voler eliminare questo commento?"
    )
    if (!conferma) return

    try {
      const res = await fetch(
        `https://localhost:7156/api/Commenti/${commentoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      if (!res.ok) throw new Error("Errore nell'eliminazione del commento")

      setPostCopy({
        ...postCopy,
        commenti: postCopy.commenti.filter((c) => c.id !== commentoId),
      })
    } catch (err) {
      alert("Errore: " + err.message)
    }
  }

  const handleSalvaModifica = async (commentoId, nuovoTesto) => {
    try {
      const res = await fetch(
        `https://localhost:7156/api/Commenti/${commentoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ testo: nuovoTesto }),
        }
      )

      if (!res.ok) throw new Error("Errore nella modifica del commento")

      setPostCopy((prev) => ({
        ...prev,
        commenti: prev.commenti.map((c) =>
          c.id === commentoId ? { ...c, testo: nuovoTesto } : c
        ),
      }))
    } catch (err) {
      alert("Errore: " + err.message)
    }
  }

  if (loading || !postCopy) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" variant="danger" />
        <p className="mt-3">Caricamento articolo...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="mt-5">
        <h2>Errore</h2>
        <p>{error}</p>
        <Button as={Link} to="/BlogPage" variant="outline-danger">
          Torna al catalogo
        </Button>
      </Container>
    )
  }

  const articoliCorrelati = lista.filter(
    (p) => p.categoria === postCopy.categoria && p.id !== postCopy.id
  )

  return (
    <Container className="my-5">
      <Button
        as={Link}
        to="/BlogPage"
        className=" text-decoration-none RegisterButton m-3 "
      >
        <ArrowBarLeft className=" mb-1" /> Torna al catalogo
      </Button>
      <Row>
        <Col>
          <Card.Title className="titleDetailTrip text-center fw-bolder m-0 p-3">
            {postCopy.titolo}
          </Card.Title>
          <Card className=" bg-white bg-opacity-75 border border-1 border-dark p-0 card-trips-details">
            <Card.Img
              variant="top"
              src={postCopy.immagineCopertina}
              className=" rounded-0 py-4 bg-black"
              style={{ objectFit: "cover", height: "400px" }}
            />
            <Card.Body className=" m-2">
              <Card.Text
                className="contenuto-blog"
                dangerouslySetInnerHTML={{ __html: postCopy.contenuto }}
              ></Card.Text>

              <div className=" d-flex justify-content-between align-items-center">
                <Card.Subtitle className="mb-2 text-muted">
                  Pubblicato il:{" "}
                  {new Date(postCopy.dataPubblicazione).toLocaleDateString(
                    "it-IT"
                  )}
                </Card.Subtitle>
                <Card.Text className="text-end">
                  <strong>Categoria:</strong> {postCopy.categoria}
                </Card.Text>
              </div>
            </Card.Body>
            <div className="d-flex justify-content-around align-items-center my-4">
              <div className="d-flex align-items-center">
                <Eye className="me-2" />
                <span>{postCopy.visualizzazioni || 0}</span>
              </div>

              <div
                className=" text-danger d-flex align-items-center"
                style={{ cursor: "pointer" }}
                onClick={() => setMostraFormCommento(!mostraFormCommento)}
              >
                <ChatLeftDots className="me-2" />
                <span className=" text-decoration-underline">Commenta</span>
              </div>

              <div className="d-flex align-items-center">
                <Heart className="me-2" />
                <span>Mi piace</span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {mostraFormCommento && (
        <Card className="my-4 border-danger ">
          <Card.Body className="p-3 mt-1 d-flex flex-column justify-content-center align-items-end">
            <textarea
              className="form-control mb-3"
              rows="3"
              placeholder="Scrivi un commento..."
              value={nuovoCommento}
              onChange={(e) => setNuovoCommento(e.target.value)}
            ></textarea>
            <button
              className="btn btn-danger rounded-pill px-4 py-2"
              onClick={handleInvioCommento}
              disabled={inviando}
            >
              {inviando ? (
                "Invio in corso..."
              ) : (
                <>
                  <Send className="me-2" />
                  Invia commento
                </>
              )}
            </button>

            {erroreInvio && (
              <p className="text-danger mt-2">Errore: {erroreInvio}</p>
            )}
          </Card.Body>
        </Card>
      )}

      <p className="mt-4 pt-4 border-top fs-3 fw-bold text-danger-emphasis text-center">
        Commenti
      </p>

      {postCopy.commenti?.length > 0 ? (
        postCopy.commenti.map((commento) => (
          <CommentoComponent
            key={commento.id}
            commento={commento}
            currentUser={currentUser}
            onElimina={handleEliminaCommento}
            onSalvaModifica={handleSalvaModifica}
          />
        ))
      ) : (
        <p className="text-muted text-center">Nessun commento disponibile.</p>
      )}

      {articoliCorrelati.length > 0 && (
        <>
          <h4 className="mt-5 mb-3">Articoli correlati</h4>
          <Row>
            {articoliCorrelati.map((p) => (
              <Col md={4} key={p.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={p.immagineCopertina}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <Card.Body className="d-flex flex-column ">
                    <p
                      className="text-uppercase text-danger-emphasis fw-semibold mb-1"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {p.categoria} • {p.durataLettura || "5 MIN"} READ
                    </p>
                    <Card.Title className=" fw-bold mb-3">
                      {p.titolo}
                    </Card.Title>
                    <Card.Subtitle className=" text-secondary mb-2">
                      Scopri di più...
                    </Card.Subtitle>
                    <Button
                      as={Link}
                      to={`/blog/${p.id}`}
                      className="mt-auto"
                      variant="outline-danger"
                    >
                      Leggi di più
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  )
}

export default BlogDettaglioComponent
