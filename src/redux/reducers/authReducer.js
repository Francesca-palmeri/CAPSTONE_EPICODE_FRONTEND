import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../actions/authActions"

// Funzione per decodificare il token
const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    return payload
  } catch {
    return null
  }
}

const storedToken = localStorage.getItem("token")
const decoded = storedToken ? decodeToken(storedToken) : null

const initialState = {
  token: storedToken || null,
  isAuthenticated: !!storedToken,
  user: decoded || null, // user da token
  error: null,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      const decodedUser = decodeToken(action.payload)
      localStorage.setItem("token", action.payload)
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        user: decodedUser,
        error: null,
      }
    }

    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
        token: null,
        isAuthenticated: false,
        user: null,
      }

    case LOGOUT:
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
        error: null,
      }

    default:
      return state
  }
}

export default authReducer
