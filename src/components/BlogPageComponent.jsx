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

  useEffect(() => {
    dispatch(getBlogPosts())
  }, [dispatch])

  const categorie = Array.from(new Set(lista.map((p) => p.categoria))).sort()

  const articoliFiltrati =
    categoriaSelezionata === "Tutte"
      ? lista
      : lista.filter((p) => p.categoria === categoriaSelezionata)

  return (
    <Container className=" my-5">
      <div className="text-center mb-5">
        <h1 className="intro-title">Tadaima Nihon Blog </h1>
        <p className="lead text-dark">
          Scopri le ultime novità, itinerari, curiosità e consigli per esplorare
          il Giappone con occhi nuovi. <br /> Design, cultura e ispirazioni ti
          aspettano!
        </p>
      </div>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Errore: {error}</Alert>}

      {articoliFiltrati.length > 0 && (
        <Row className="mb-5 rounded align-items-center border border-black bg-light  ms-2">
          <Col md={6} className="py-3 px-0 bg-dark shadow">
            <img
              src={articoliFiltrati[0].immagineCopertina}
              alt={articoliFiltrati[0].titolo}
              className="img-fluid"
              style={{ height: "250px", width: "100%", objectFit: "cover" }}
            />
          </Col>
          <Col md={6} className=" px-lg-4">
            <p className="text-uppercase text-danger fw-semibold mb-xl-1 ">
              {articoliFiltrati[0].categoria} •{" "}
              {articoliFiltrati[0].durataLettura || "5 MIN"} READ
            </p>
            <h2 className="mt-2 fw-bold">{articoliFiltrati[0].titolo}</h2>
            <p className="text-muted mt-lg-5">
              {articoliFiltrati[0].anteprima ||
                "Scopri di più su questo post..."}
            </p>
            <Button
              className=" mb-2 mb-lg-1"
              as={Link}
              to={`/blog/${articoliFiltrati[0].id}`}
              variant="outline-danger"
            >
              Continua a leggere
            </Button>
          </Col>
        </Row>
      )}
      <Row className=" ">
        <Col
          xs={12}
          className="d-flex justify-content-evenly align-items-center gap-2 mb-4 pb-2"
        >
          <p
            className={`badge rounded-pill px-3 py-2 ${
              categoriaSelezionata === "Tutte"
                ? "bg-danger text-white"
                : "bg-light text-dark border"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => setCategoriaSelezionata("Tutte")}
          >
            Tutte
          </p>
          {categorie.map((cat, index) => (
            <p
              key={index}
              className={`badge rounded-pill px-3 py-2 ${
                categoriaSelezionata === cat
                  ? "bg-danger text-white"
                  : "bg-light text-dark border"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setCategoriaSelezionata(cat)}
            >
              {cat}
            </p>
          ))}
        </Col>
      </Row>

      <Row className="g-4">
        {articoliFiltrati.slice(1).map((post) => (
          <Col key={post.id} md={4}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={post.immagineCopertina}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <Card.Body className="d-flex flex-column ">
                <p
                  className="text-uppercase text-danger-emphasis fw-semibold mb-1"
                  style={{ fontSize: "0.8rem" }}
                >
                  {post.categoria} • {post.durataLettura || "5 MIN"} READ
                </p>
                <Card.Title className=" fw-bold mb-3">{post.titolo}</Card.Title>
                <Card.Subtitle className=" text-secondary mb-2">
                  Scopri di più...
                </Card.Subtitle>
                <Button
                  as={Link}
                  to={`/blog/${post.id}`}
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
    </Container>
  )
}

export default BlogPageComponent
