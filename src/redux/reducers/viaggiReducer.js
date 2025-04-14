import {
  GET_VIAGGI_SUCCESS,
  GET_VIAGGI_FAILURE,
} from "../actions/viaggiActions"

const initialState = {
  viaggi: [],
  error: null,
}

const viaggiReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIAGGI_SUCCESS:
      return {
        ...state,
        viaggi: action.payload,
        error: null,
      }
    case GET_VIAGGI_FAILURE:
      return {
        ...state,
        viaggi: [],
        error: action.payload,
      }
    default:
      return state
  }
}

export default viaggiReducer
