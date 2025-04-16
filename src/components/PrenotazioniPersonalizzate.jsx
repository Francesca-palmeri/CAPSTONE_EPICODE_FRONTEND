import { Container, Row, Col } from "react-bootstrap"
import PrenotazioneFormComponent from "./PrenotazioniFormComponent"
import ViaggiRandomComponent from "./ViaggiRandomComponent"
const PrenotazioniPersonalizzateComponent = () => {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <PrenotazioneFormComponent />
        </Col>
        <Col md={12}>
          <ViaggiRandomComponent quantità={8} />
        </Col>
      </Row>
    </Container>
  )
}

export default PrenotazioniPersonalizzateComponent
