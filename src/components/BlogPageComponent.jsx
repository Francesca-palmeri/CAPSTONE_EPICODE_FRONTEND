import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBlogPosts } from "../redux/actions/blogActions"
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap"
import { Link } from "react-router-dom"

const BlogPageComponent = () => {
  const dispatch = useDispatch()
  const { lista, loading, error } = useSelector((state) => state.blog)
  const [categoriaSelezionata, setCategoriaSelezionata] = useState("Tutte")

  console.log(lista)

  useEffect(() => {
    dispatch(getBlogPosts())
  }, [dispatch])

  const categorie = Array.from(new Set(lista.map((p) => p.categoria))).sort()

  const articoliFiltrati =
    categoriaSelezionata === "Tutte"
      ? lista
      : lista.filter((p) => p.categoria === categoriaSelezionata)

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">📰 Il nostro Blog</h2>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Errore: {error}</Alert>}

      <div className="mb-4 text-center">
        <span
          className={`badge rounded-pill me-2 px-3 py-2 ${
            categoriaSelezionata === "Tutte"
              ? "bg-primary"
              : "bg-light text-dark border"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => setCategoriaSelezionata("Tutte")}
        >
          Tutte
        </span>

        {categorie.map((cat, index) => (
          <span
            key={index}
            className={`badge rounded-pill me-2 px-3 py-2 ${
              categoriaSelezionata === cat
                ? "bg-primary"
                : "bg-light text-dark border"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => setCategoriaSelezionata(cat)}
          >
            {cat}
          </span>
        ))}
      </div>

      <Row className="m-5 ">
        <Row>
          {articoliFiltrati.map((post) => (
            <Col key={post.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                {post.immagineCopertina && (
                  <Card.Img
                    variant="top"
                    src={post.immagineCopertina}
                    alt={post.titolo}
                    style={{ objectFit: "cover", height: "180px" }}
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{post.titolo}</Card.Title>
                  <Card.Text
                    className="text-muted"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {new Date(post.dataPubblicazione).toLocaleDateString(
                      "it-IT"
                    )}
                  </Card.Text>

                  <Button
                    as={Link}
                    to={`/blog/${post.id}`}
                    className="mt-auto"
                    variant="outline-primary"
                  >
                    Leggi di più
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Row>
    </Container>
  )
}

export default BlogPageComponent
