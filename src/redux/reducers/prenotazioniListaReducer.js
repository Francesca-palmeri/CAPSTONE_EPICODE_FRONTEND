import {
  PRENOTAZIONI_UTENTE_START,
  PRENOTAZIONI_UTENTE_SUCCESS,
  PRENOTAZIONI_UTENTE_FAILURE,
  PRENOTAZIONI_ADMIN_START,
  PRENOTAZIONI_ADMIN_SUCCESS,
  PRENOTAZIONI_ADMIN_FAILURE,
} from "../actions/prenotazioniActions"

const initialState = {
  lista: [],
  loading: false,
  error: null,
}

const prenotazioniListaReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRENOTAZIONI_UTENTE_START:
    case PRENOTAZIONI_ADMIN_START:
      return { ...state, loading: true, error: null }

    case PRENOTAZIONI_UTENTE_SUCCESS:
    case PRENOTAZIONI_ADMIN_SUCCESS:
      return { ...state, loading: false, lista: action.payload.prenotazioni }

    case PRENOTAZIONI_UTENTE_FAILURE:
    case PRENOTAZIONI_ADMIN_FAILURE:
      return { ...state, loading: false, error: action.payload.prenotazioni }

    default:
      return state
  }
}

export default prenotazioniListaReducer
