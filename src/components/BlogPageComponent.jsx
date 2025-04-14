import { useEffect } from "react"
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

  console.log(lista)

  useEffect(() => {
    dispatch(getBlogPosts())
  }, [dispatch])

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">📰 Il nostro Blog</h2>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Errore: {error}</Alert>}

      <Row className="mx-5">
        {Array.isArray(lista) &&
          lista.map((post) => (
            <Col key={post.id} sm={12} className="mb-4">
              <Card className="h-100 shadow-sm ">
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
                  {/*<Card.Text>{post.contenuto.slice(0, 120)}...</Card.Text>*/}
                  <Card.Subtitle className=" text-end text-muted">
                    Categoria: {post.categoria}
                  </Card.Subtitle>
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
    </Container>
  )
}

export default BlogPageComponent
