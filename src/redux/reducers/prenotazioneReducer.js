import {
  PRENOTAZIONE_START,
  PRENOTAZIONE_SUCCESS,
  PRENOTAZIONE_FAILURE,
} from "../actions/prenotazioniActions"

const initialState = {
  loading: false,
  success: false,
  error: null,
  risposta: null,
}

const prenotazioneReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRENOTAZIONE_START:
      return { ...state, loading: true, success: false, error: null }
    case PRENOTAZIONE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        risposta: action.payload,
      }
    case PRENOTAZIONE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default prenotazioneReducer
