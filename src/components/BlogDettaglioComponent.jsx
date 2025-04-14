import { useParams, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Container, Card, Row, Col } from "react-bootstrap"

const BlogDettaglioComponent = () => {
  const { postId } = useParams()
  const { lista } = useSelector((state) => state.blog)

  const post = Array.isArray(lista)
    ? lista.find((p) => p.id === parseInt(postId))
    : null

  if (!post) {
    return (
      <Container className="mt-5">
        <h2>Articolo non trovato</h2>
        <p>Il post richiesto non è disponibile o non è stato caricato.</p>
      </Container>
    )
  }

  const articoliCorrelati = lista.filter(
    (p) => p.categoria === post.categoria && p.id !== post.id
  )

  return (
    <Container className="my-5">
      <Card className="mb-4">
        <Card.Img variant="top" src={post.immagineCopertina} />
        <Card.Body>
          <Card.Title>{post.titolo}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Pubblicato il:{" "}
            {new Date(post.dataPubblicazione).toLocaleDateString("it-IT")}
          </Card.Subtitle>
          <Card.Text style={{ whiteSpace: "pre-line" }}>
            {post.contenuto}
          </Card.Text>
          <Card.Text className="text-end">
            <strong>Categoria:</strong> {post.categoria}
          </Card.Text>
        </Card.Body>
      </Card>

      <Link to="/BlogPage" className="btn btn-info mb-5">
        TORNA AL BLOG
      </Link>

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
                    <Card.Text>
                      {p.contenuto.length > 150
                        ? p.contenuto.substring(0, 150) + "..."
                        : p.contenuto}
                    </Card.Text>
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
