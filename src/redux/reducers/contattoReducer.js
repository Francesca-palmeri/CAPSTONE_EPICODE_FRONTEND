import {
  INVIA_CONTATTO_REQUEST,
  INVIA_CONTATTO_SUCCESS,
  INVIA_CONTATTO_FAIL,
} from "../actions/contattoActions"

export const contattoReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case INVIA_CONTATTO_REQUEST:
      return { loading: true, success: false, error: null }
    case INVIA_CONTATTO_SUCCESS:
      return { loading: false, success: true, error: null }
    case INVIA_CONTATTO_FAIL:
      return { loading: false, success: false, error: action.payload }
    default:
      return state
  }
}
