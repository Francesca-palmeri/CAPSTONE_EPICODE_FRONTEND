import {
  FRASI_FAILURE,
  FRASI_SUCCESS,
  FRASI_LOADING,
} from "../actions/frasiActions"

const initialState = {
  loading: false,
  error: null,
  lista: [],
}

const frasiReducer = (state = initialState, action) => {
  switch (action.type) {
    case FRASI_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FRASI_SUCCESS:
      return {
        ...state,
        loading: false,
        lista: action.payload,
      }
    case FRASI_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default frasiReducer
