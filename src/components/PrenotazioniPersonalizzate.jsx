import { Container, Row, Col } from "react-bootstrap"
import PrenotazioneFormComponent from "./PrenotazioniFormComponent"
import ViaggiRandomComponent from "./ViaggiRandomComponent"
const PrenotazioniPersonalizzateComponent = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <PrenotazioneFormComponent />
        </Col>
        <Col xs={12}>
          <ViaggiRandomComponent quantità={8} />
        </Col>
      </Row>
    </Container>
  )
}

export default PrenotazioniPersonalizzateComponent
