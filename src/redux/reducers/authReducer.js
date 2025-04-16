import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  AVATAR_URL_UPDATE_SUCCESS,
  AVATAR_DELETE_SUCCESS,
} from "../actions/authActions"

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
  user: decoded || null,
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
    case AVATAR_URL_UPDATE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          avatarUrl: action.payload,
        },
      }
    case AVATAR_DELETE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          avatarUrl: null,
        },
      }

    default:
      return state
  }
}

export default authReducer
