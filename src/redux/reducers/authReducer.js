import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actions/authActions"

const initialState = {
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  error: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        error: null,
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        token: null,
        isAuthenticated: false,
      }
    case LOGOUT:
      localStorage.removeItem("token")
      return { ...state, token: null, isAuthenticated: false, error: null }
    default:
      return state
  }
}

export default authReducer
