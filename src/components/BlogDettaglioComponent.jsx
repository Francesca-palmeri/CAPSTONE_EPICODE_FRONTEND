import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Container, Card, Row, Col } from "react-bootstrap"
import { useState, useEffect } from "react"

const BlogDettaglioComponent = () => {
  const { postId } = useParams()
  const { lista } = useSelector((state) => state.blog)

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

  const post = Array.isArray(lista)
    ? lista.find((p) => p.id === parseInt(postId))
    : null

  const [postCopy, setPostCopy] = useState(post)
  const [nuovoCommento, setNuovoCommento] = useState("")
  const [inviando, setInviando] = useState(false)
  const [erroreInvio, setErroreInvio] = useState("")
  const [commentoInModifica, setCommentoInModifica] = useState(null)
  const [testoModificato, setTestoModificato] = useState("")

  useEffect(() => {
    setPostCopy(post)
  }, [post])

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

  const handleSalvaModifica = async (commentoId) => {
    try {
      const res = await fetch(
        `https://localhost:7156/api/Commenti/${commentoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ testo: testoModificato }),
        }
      )

      if (!res.ok) throw new Error("Errore nella modifica del commento")

      const commentiAggiornati = postCopy.commenti.map((c) =>
        c.id === commentoId ? { ...c, testo: testoModificato } : c
      )

      setPostCopy({ ...postCopy, commenti: commentiAggiornati })
      setCommentoInModifica(null)
      setTestoModificato("")
    } catch (err) {
      alert("Errore: " + err.message)
    }
  }

  if (!postCopy) {
    return (
      <Container className="mt-5">
        <h2>Articolo non trovato</h2>
        <p>Il post richiesto non è disponibile o non è stato caricato.</p>
      </Container>
    )
  }

  const articoliCorrelati = lista.filter(
    (p) => p.categoria === postCopy.categoria && p.id !== postCopy.id
  )

  return (
    <Container className="my-5">
      <Card className="mb-4">
        <Card.Img variant="top" src={postCopy.immagineCopertina} />
        <Card.Body>
          <Card.Title>{postCopy.titolo}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Pubblicato il:{" "}
            {new Date(postCopy.dataPubblicazione).toLocaleDateString("it-IT")}
          </Card.Subtitle>
          <Card.Text
            className="contenuto-blog"
            dangerouslySetInnerHTML={{ __html: postCopy.contenuto }}
          ></Card.Text>
          <Card.Text className="text-end">
            <strong>Categoria:</strong> {postCopy.categoria}
          </Card.Text>
        </Card.Body>
      </Card>

      <Link to="/BlogPage" className="btn btn-info mb-5">
        TORNA AL BLOG
      </Link>

      <h4 className="mt-5">Commenti</h4>

      <div className="mb-4">
        <textarea
          className="form-control"
          rows="3"
          placeholder="Scrivi un commento..."
          value={nuovoCommento}
          onChange={(e) => setNuovoCommento(e.target.value)}
        ></textarea>
        <button
          className="btn btn-primary mt-2"
          onClick={handleInvioCommento}
          disabled={inviando}
        >
          {inviando ? "Invio in corso..." : "Invia commento"}
        </button>
        {erroreInvio && (
          <p className="text-danger mt-2">Errore: {erroreInvio}</p>
        )}
      </div>

      {postCopy.commenti && postCopy.commenti.length > 0 ? (
        postCopy.commenti.map((commento) => {
          const isAutore =
            currentUser?.[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ] === commento.utenteId
          const isAdmin =
            currentUser?.[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ] === "Admin"

          return (
            <Card key={commento.id} className="mb-3 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  {commento.avatarUrl && (
                    <img
                      src={commento.avatarUrl}
                      alt="Avatar"
                      className="rounded-circle me-2"
                      width={40}
                      height={40}
                    />
                  )}
                  <strong>{commento.utenteNome}</strong>
                  <span
                    className="ms-auto text-muted"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {new Date(commento.dataCreazione).toLocaleString("it-IT")}
                  </span>
                </div>

                {commentoInModifica === commento.id ? (
                  <>
                    <textarea
                      className="form-control mb-2"
                      rows="2"
                      value={testoModificato}
                      onChange={(e) => setTestoModificato(e.target.value)}
                    />
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleSalvaModifica(commento.id)}
                    >
                      Salva
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => setCommentoInModifica(null)}
                    >
                      Annulla
                    </button>
                  </>
                ) : (
                  <p className="mb-0">{commento.testo}</p>
                )}

                {(isAutore || isAdmin) && (
                  <div className="mt-2 text-end">
                    {isAutore && (
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => {
                          setCommentoInModifica(commento.id)
                          setTestoModificato(commento.testo)
                        }}
                      >
                        Modifica
                      </button>
                    )}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleEliminaCommento(commento.id)}
                    >
                      Elimina
                    </button>
                  </div>
                )}
              </Card.Body>
            </Card>
          )
        })
      ) : (
        <p className="text-muted">Nessun commento disponibile.</p>
      )}

      {articoliCorrelati.length > 0 && (
        <>
          <h4 className="mt-5 mb-3">Articoli correlati</h4>
          <Row>
            {articoliCorrelati.map((p) => (
              <Col md={4} key={p.id}>
                <Card className="mb-4 h-100">
                  <Card.Img variant="top" src={p.immagineCopertina} />
                  <Card.Body>
                    <Card.Title>{p.titolo}</Card.Title>
                    <Link
                      to={`/blog/${p.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Leggi di più
                    </Link>
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
