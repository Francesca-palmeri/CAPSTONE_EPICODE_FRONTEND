import { Container, Row, Col, Accordion } from "react-bootstrap"
import { PatchQuestion, PatchQuestionFill } from "react-bootstrap-icons"
import { Link } from "react-router-dom"

const FaqComponent = () => {
  const faq = [
    {
      domanda: "Organizzate viaggi solo per il Giappone?",
      risposta: (
        <>
          <p>
            {" "}
            Sì. Siamo un tour operator che si occupa di viaggi organizzati in
            Giappone.
          </p>
        </>
      ),
    },

    {
      domanda: "Che tipi di viaggi organizzate?",
      risposta: (
        <>
          <p>Organizziamo diverse tipologie di viaggio per ogni esigenza. </p>
          <ul>
            <li>
              <strong>Pacchetti viaggi di gruppo organizzati </strong>con guida:
              partenze con date precise, per tutte le stagioni dell'anno e
              persino in periodi festivi;
            </li>
            <li>
              <strong>Pacchetti individuali</strong> : ideali per chi vuole
              viaggiare individualmente con assistenza e visite guidate in
              italiano.
            </li>
            <li>
              <strong>Pacchetti personalizzati su richiesta</strong>:
              individuali o in gruppi più piccoli, con guida o senza guida. Uno
              dei nostri esperti sarà a disposizione per scegliere l'itinerario
              e le date che più possano soddisfare le vostre necessità. Spesso
              gestiamo anche <strong>Viaggi di Nozze</strong>.
            </li>
          </ul>
        </>
      ),
    },
    {
      domanda: "Come posso prenotare un viaggio?",
      risposta: (
        <>
          <p>
            Potete contattarci compilando il form in tutti i suoi campi che
            troverete sotto alla pagina del viaggio, oppure nella sezione{" "}
            <Link to="/PrenotazioniPersonalizzate" className="text-primary">
              Viaggi Personalizzati
            </Link>
            .
            <br />
            Un agente del nostro tour operator si metterà in contatto con voi
            per definire tutti i dettagli e proporvi un preventivo di viaggio.
            Una volta accettato il preventivo si procede a stipulare un
            contratto di viaggio ed è previsto il versamento di un acconto. Il
            saldo avviene poi normalmente via bonifico prima della data di
            partenza.
          </p>
          <p className=" fw-semibold text-secondary">
            Per i viaggi individuali {"(Non di gruppo)"}:
          </p>
          <p>
            I viaggi pubblicati sono quotati sulla base di tariffe minime
            riferite a determinate classi di prenotazione in stagionalità media.
            Al momento del preventivo e/o della conferma del viaggio
            verificheremo l'effettiva disponibilità. Qualora non ci fosse posto
            verrà comunicato l'eventuale supplemento aereo per la classe
            successiva o verificheremo con voi date alternative per mantenere il
            prezzo del sito. In alta stagione possono avvenire forti
            oscillazioni tariffarie soprattutto su voli e posto in hotel.
            Contatatteci il più possibile in anticipo per avere il prezzo
            migliore.{" "}
          </p>
        </>
      ),
    },
    {
      domanda: "È necessario registrarsi per prenotare?",
      risposta: (
        <>
          <p>
            Sì, per effettuare una prenotazione devi essere registrato e loggato
            con il tuo account. Se non hai un account, puoi registrarti dalla
            pagina di{" "}
            <Link to="/RegistrationPage" className="text-primary">
              Registrazione
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      domanda: "Posso personalizzare un viaggio?",
      risposta: (
        <>
          <p>
            Certo! Nella sezione{" "}
            <Link to="/PrenotazioniPersonalizzate" className="text-primary">
              Viaggi personalizzati
            </Link>{" "}
            potete inviare le vostre preferenze e noi vi contatteremo con un
            itinerario su misura.
            <br />
            Non preoccupatevi: se non siete interessati ai viaggi in catalogo,
            potete selezionarne uno qualsiasi e inserire tutte le vostre
            richieste nell'apposita area. Verrete ricontattati dal nostro team
            per organizzare il vostro viaggio in base alle vostre esigenze,
            oppure contattandoci tramite il nostro indirizzo email{" "}
            <span className=" fw-bold">tadaimanihon@travelblog.it</span>.
          </p>
        </>
      ),
    },
    {
      domanda: "Devo conoscere la lingua per poter viaggiare?",
      risposta: (
        <>
          <p>
            Non è necessario. I nostri esperti possono aiutarvi per qualsiasi
            evenienza, loro conoscono il giapponese e possono comunicare per
            voi.
          </p>
          <p>
            {" "}
            Per chi è curioso e desidera imparare almeno qualche frase abbiamo
            una sezione dedicata: <strong>Frasi Utili</strong>. Potete accedervi
            dal menu in basso o{" "}
            <Link to="/frasi-utili" className="text-primary">
              cliccando qui
            </Link>
            .
          </p>
        </>
      ),
    },
    {
      domanda: "Come posso contattarvi?",
      risposta: (
        <p>
          Potete compilare il modulo che trovate in questa pagina{" "}
          <Link to="/PrenotazioniPersonalizzate" className="text-primary">
            Viaggi Personalizzati
          </Link>{" "}
          , nel caso foste interessati ad organizzare un viaggio, oppure per
          ulteriori informazioni e chiarimenti potete scriverci direttamente via
          email o contattarci tramite telefono.
          <br />
          Nella sezione{" "}
          <Link to="/ContattiPage" className="text-primary">
            {" "}
            CONTATTI{" "}
          </Link>{" "}
          troverete tutte le informazioni utili e anche i nostri orari di
          ufficio.
        </p>
      ),
    },
    {
      domanda: "Come pianificare al meglio il proprio soggiorno in Giappone?",
      risposta: (
        <>
          <p>
            Se decidete di viaggiare in alta stagione (periodo della fioritura,
            agosto) cercate di prenotare tra{" "}
            <span className=" fw-bold">6 e 12 mesi di anticipo</span> per avere
            la massima disponibilità di scelta. Se però aveste deciso di partire
            all'ultimo minuto non c'è motivo di disperare, grazie alla nostra
            esperienza saremo in grado di trovare delle soluzioni ottimali.
            Cercate di preparare un bagaglio il più possibile leggero e
            contenuto, lo spazio negli hotel non è molto generoso; non
            dimenticate di lasciare un po' di spazio vuoto per l'acquisto dei
            souvenir. <br /> Se aveste bisogno di farmaci o alimenti particolari
            durante la vostra vacanza non esitate a contattarci per assistenza e
            supporto.
          </p>
        </>
      ),
    },
    {
      domanda: "Cosa è compreso nel costo di un viaggio ?",
      risposta: (
        <>
          <p>
            I nostri viaggi di gruppo includono i pernottamenti, il volo e gli
            spostamenti in treno a lunga percorrenza. Ai viaggi individuali va
            aggiunto invece il costo del volo internazionale in funzione del
            periodo desiderato. Richiedeteci un preventivo con le vostre date di
            partenza e vi proporremo le soluzioni migliori.
          </p>
          <p>
            Tutti i viaggi hanno diverse caratteristiche e possono includere
            diverse opzioni. Queste vengono però sempre riportate alla voce cosa
            include nel prospetto online e nel contratto di viaggio.
          </p>
          <p>
            I costi di un viaggio possono inoltre variare in funzione della
            classe di viaggio preferita: possiamo quotare su richiesta hotels 4
            stelle, boutique hotels e classe di viaggio aereo/treno business.
          </p>
        </>
      ),
    },
    {
      domanda: "Cosa è richiesto per entrare in Giappone?",
      risposta: (
        <>
          <p>
            I cittadini italiani possono recarsi in Giappone per motivi di
            soggiorno turistico e per un massimo di 90 giorni di permanenza. Non
            è necessario un visto, basta presentare passaporto con validità
            residua che vada oltre alla data di ritorno. Al momento
            dell’ingresso nel Paese bisogna essere in possesso anche del
            biglietto aereo di ritorno. Per ulteriori informazioni rimandiamo al{" "}
            <Link to="https://www.viaggiaresicuri.it/find-country/country/JPN">
              Ministero degli affari esteri{" "}
            </Link>{" "}
            e al nostro <Link to="/BlogPage">blog</Link> .
          </p>
        </>
      ),
    },
    {
      domanda: "Sono richieste vaccinazioni ?",
      risposta: (
        <>
          <p>
            Per recarsi in Giappone non sono richieste vaccinazioni
            obbligatorie. Nel caso di esigenze specifiche vi raccomandiamo di
            contattare il vostro medico di famiglia o la ASL competente.
          </p>
        </>
      ),
    },
  ]

  return (
    <Container>
      <Row className="mx-4">
        <Col className="">
          <h2 className="text-center mb-4 pt-4"> ❓ Domande Frequenti ❓ </h2>

          <Accordion className=" faqAccordion">
            {faq.map((item, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={idx}>
                <Accordion.Header>
                  {" "}
                  <PatchQuestionFill className=" me-2" /> {item.domanda}
                </Accordion.Header>
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
