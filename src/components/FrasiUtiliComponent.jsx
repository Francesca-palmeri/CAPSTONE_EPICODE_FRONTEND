import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFrasiUtili } from "../redux/actions/frasiActions"
import { Container, Spinner, Alert, Row, Col, Card } from "react-bootstrap"
import { Translate, Book, Globe } from "react-bootstrap-icons"
import "./Styles/FrasiUtiliStyle.css"

const FrasiUtiliComponent = () => {
  const dispatch = useDispatch()
  const { lista, loading, error } = useSelector((state) => state.frasi)
  const [categoriaSelezionata, setCategoriaSelezionata] = useState("Tutte")

  useEffect(() => {
    dispatch(getFrasiUtili())
  }, [dispatch])

  const categorie = Array.from(new Set(lista.map((f) => f.categoria))).sort()

  const frasiFiltrate =
    categoriaSelezionata === "Tutte"
      ? lista
      : lista.filter((f) => f.categoria === categoriaSelezionata)

  return (
    <Container className="my-5">
      <h2 className="text-center mb-3 intro-title text-danger">
        🗣️ Frasi giapponesi utili per viaggiare
      </h2>
      <p className="text-center text-muted mb-4 fs-5">
        Scopri le frasi più utili da usare durante il tuo viaggio!
      </p>

      <div className="mb-5 text-center">
        <span
          className={`badge-categoria ${
            categoriaSelezionata === "Tutte" ? "active" : ""
          }`}
          onClick={() => setCategoriaSelezionata("Tutte")}
        >
          Tutte
        </span>

        {categorie.map((cat, index) => (
          <span
            key={index}
            className={`badge-categoria ${
              categoriaSelezionata === cat ? "active" : ""
            }`}
            onClick={() => setCategoriaSelezionata(cat)}
          >
            {cat}
          </span>
        ))}
      </div>

      {loading && (
        <div className="text-center my-5">
          <Spinner animation="border" variant="danger" />
          <p className="text-muted mt-3">Caricamento frasi in corso...</p>
        </div>
      )}
      {error && (
        <div className="text-center my-5">
          <Alert variant="danger">{error}</Alert>
        </div>
      )}

      <Row className="g-4">
        {frasiFiltrate.map((frase) => (
          <Col xs={12} md={6} key={frase.id}>
            <Card className="frasi-card shadow-sm h-100">
              <Card.Body>
                <h5 className="text-danger mb-3 text-center">
                  {frase.giapponeseKana}
                </h5>
                <p>
                  <Book className="me-2 text-danger" />
                  <strong>Romaji:</strong> {frase.romaji}
                </p>
                <p>
                  <Translate className="me-2 text-primary" />
                  <strong>Traduzione:</strong> {frase.italiano}
                </p>
                <p className="fst-italic text-muted text-end mb-0">
                  {frase.categoria}
                </p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default FrasiUtiliComponent
