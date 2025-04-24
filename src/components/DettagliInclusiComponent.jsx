import { Card } from "react-bootstrap"
import { CheckCircle, InfoCircle, XCircle } from "react-bootstrap-icons"

const DettagliInclusiComponent = () => {
  return (
    <Card className=" border-dark p-3 mt-5 bg-danger bg-opacity-10">
      <h4 className="fw-bold mb-3">Scheda Informativa</h4>

      <h5 className="fw-bold">Incluso</h5>
      <ul className="list-unstyled ms-2">
        <li>
          <CheckCircle className="text-success me-2" /> L’assistenza del
          coordinatore durante tutto il viaggio
        </li>
        <li>
          <CheckCircle className="text-success me-2" /> Sistemazione in camere
          condivise durante tutto il viaggio (si applica ai viaggi di gruppo)
        </li>
        <li>
          <CheckCircle className="text-success me-2" /> 7 giorni Shinkansen
          Japan Rail Pass (qualora necessario)
        </li>

        <li>
          <CheckCircle className="text-success me-2" /> Assicurazione sanitaria
        </li>
      </ul>

      <h5 className="fw-bold ">Non incluso</h5>
      <ul className="list-unstyled ms-2">
        <li>
          <XCircle className="text-danger me-2" /> Biglietto aereo
          Italia-Giappone A/R
        </li>
        <li>
          <XCircle className="text-danger me-2" /> Cibo e bevande non
          specificati
        </li>
        <li>
          <XCircle className="text-danger me-2" /> Costo dei trasporti, salvo
          biglietti/pass inclusi
        </li>
        <li>
          <XCircle className="text-danger me-2" /> Integrazione copertura
          annullamento
        </li>
        <li>
          <XCircle className="text-danger me-2" /> Tassa di soggiorno, bevande,
          pasti non in programma
        </li>
        <li>
          <XCircle className="text-danger me-2" /> Tutto ciò non espressamente
          indicato tra i servizi inclusi nella formula scelta
        </li>
      </ul>

      <h5 className="fw-bold ">Altre informazioni</h5>
      <p className="ms-2">
        <InfoCircle className=" text-primary me-1" />
        <strong>Prezzo per persona</strong> <br />
        Il prezzo è da intendersi per persona, in base camera matrimoniale.
        Supplemento twin e riduzione 3° e 4° letto adulti e bambini su
        richiesta. Supplemento singola non disponibile.
      </p>
      <p className="ms-2">
        <InfoCircle className=" text-primary me-1" />
        <strong>Stagionalità</strong>
        <br />
        Il prezzo è calcolato in base al costo medio dei servizi in bassa
        stagione. Per i periodi di alta e altissima stagione, o in concomitanza
        con i fine settimana o festività nazionali, i prezzi potrebbero subire
        dei rialzi che faremo del nostro meglio per ridurre al minimo.
      </p>
      <p className="ms-2">
        <InfoCircle className=" text-primary me-1" />
        <strong>Tipologia di viaggio</strong>
        <br />
        La tipologia e le date disponibili sono segnalate nella scheda dettagli
        di ogni viaggio. Le date possono comunque variare
      </p>
    </Card>
  )
}

export default DettagliInclusiComponent
