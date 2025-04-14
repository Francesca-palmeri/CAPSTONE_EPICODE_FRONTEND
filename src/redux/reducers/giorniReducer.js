import {
  FETCH_GIORNI_START,
  FETCH_GIORNI_SUCCESS,
  FETCH_GIORNI_FAILURE,
} from "../actions/giorniActions"

const initialState = {
  giorni: [],
  loading: false,
  error: null,
}

const giorniViaggioReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GIORNI_START:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_GIORNI_SUCCESS:
      return {
        ...state,
        loading: false,
        giorni: action.payload,
      }
    case FETCH_GIORNI_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default giorniViaggioReducer
