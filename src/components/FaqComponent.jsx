import { Container, Row, Col, Accordion } from "react-bootstrap"
import { Link } from "react-router-dom"

const FaqComponent = () => {
  const faq = [
    {
      domanda: "Come posso prenotare un viaggio?",
      risposta: (
        <>
          Puoi prenotare compilando il form che trovi sotto alla pagina del
          viaggio che ti interessa, oppure nella sezione{" "}
          <Link to="/PrenotazioniPersonalizzate" className="text-primary">
            Viaggi Personalizzati
          </Link>
          . Ti contatteremo in ogni caso per assistenza e ulteriori chiarimenti.
        </>
      ),
    },
    {
      domanda: "È necessario registrarsi per prenotare?",
      risposta: (
        <>
          Sì, per effettuare una prenotazione devi essere registrato e loggato
          con il tuo account. Se non hai un account, puoi registrarti dalla
          pagina di{" "}
          <Link to="/RegistrationPage" className="text-primary">
            Registrazione
          </Link>
          .
        </>
      ),
    },
    {
      domanda: "Posso personalizzare un viaggio?",
      risposta: (
        <>
          Certo! Nella sezione{" "}
          <Link to="/PrenotazioniPersonalizzate" className="text-primary">
            Viaggi personalizzati
          </Link>{" "}
          puoi inviare le tue preferenze e noi ti contatteremo con un itinerario
          su misura.
          <br />
          Non preoccuparti: se non sei interessato ai viaggi in catalogo, puoi
          selezionarne uno qualsiasi e inserire tutte le tue richieste
          nell'apposita area. Verrai ricontattato dal nostro team per
          organizzare il tuo viaggio in base alle tue esigenze!
        </>
      ),
    },
    {
      domanda:
        "Dove trovo le frasi in giapponese utili per il mio prossimo viaggio?",
      risposta: (
        <>
          Abbiamo una sezione dedicata: <strong>Frasi Utili</strong>. Puoi
          accedervi dal menu o{" "}
          <Link to="/frasi-utili" className="text-primary">
            cliccando qui
          </Link>
          .
        </>
      ),
    },
    {
      domanda: "Come posso contattarvi?",
      risposta: (
        <>
          Puoi compilare il modulo nella sezione{" "}
          <Link to="/ContattiPage" className="text-primary">
            Contatti
          </Link>{" "}
          oppure scriverci direttamente via email.
        </>
      ),
    },
  ]

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="text-center mb-4">❓ Domande Frequenti</h2>
          <Accordion>
            {faq.map((item, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={idx}>
                <Accordion.Header>{item.domanda}</Accordion.Header>
                <Accordion.Body>{item.risposta}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Col>
      </Row>
    </Container>
  )
}

export default FaqComponent
