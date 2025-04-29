import { Button, Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

const ErrorComponent = () => {
  return (
    <Container className="text-center mt-5 pt-3">
      <Row className="align-items-center">
        <Col xs={12} md={5} className="mb-4  mb-md-0">
          <img
            src="https://s3.voyapon.com/wp-content/uploads/2020/05/26150357/pose_syazai_man-332x500.png"
            alt="immagine errore"
            className="mx-auto"
          />
        </Col>

        <Col xs={12} md={7}>
          <div className="d-flex flex-column align-items-center">
            <p className="jp fs-4">お探しのページが見つかりませんでした</p>
            <p className="fs-1 fw-bold text-danger m-0">404</p>
            <p className="fs-4">Ops! Pagina non trovata!</p>
            <p className="text-muted">
              La pagina che stai cercando non è stata trovata.
              <br />
              Può essere stata rimossa, rinominata o non esistente.
            </p>

            <Button
              as={Link}
              to="/"
              variant="danger"
              size="lg"
              className="mt-3 mb-5 mb-lg-0"
            >
              Torna alla homepage
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ErrorComponent
