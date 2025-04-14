import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { EffettuaPrenotazione } from "../redux/actions/prenotazioniActions"
import { Button, Spinner, Alert } from "react-bootstrap"

const PrenotaButtonComponent = ({ viaggioId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const { loading, error } = useSelector((state) => state.prenotazione)

  const utenteId =
    user?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ]

  const handlePrenota = () => {
    if (!utenteId || !viaggioId) return

    const prenotazione = {
      viaggioId,
      dataPrenotazione: new Date().toISOString(),
      utenteId,
    }

    console.log("Prenotazione inviata:", prenotazione)
    dispatch(EffettuaPrenotazione(prenotazione))

    // Redirect dopo prenotazione (puoi usare useEffect con success se preferisci)
    setTimeout(() => {
      navigate("/prenotazioni")
    }, 700)
  }

  return (
    <>
      <Button
        variant={isAuthenticated ? "success" : "secondary"}
        disabled={!isAuthenticated || loading}
        onClick={isAuthenticated ? handlePrenota : () => navigate("/LoginPage")}
      >
        {loading ? <Spinner animation="border" size="sm" /> : "Prenota"}
      </Button>

      {error && (
        <Alert variant="danger" className="mt-2">
          Errore: {error}
        </Alert>
      )}
    </>
  )
}

export default PrenotaButtonComponent
