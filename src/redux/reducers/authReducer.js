import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  AVATAR_URL_UPDATE_SUCCESS,
  AVATAR_DELETE_SUCCESS,
  SET_USER_PROFILE,
} from "../actions/authActions"

// Funzione per decodificare il token (usata solo per dati minimi come email, id, ruoli ecc.)
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
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        user: {
          id: decodedUser?.sub, // o altro campo usato nel JWT
          email: decodedUser?.email,
        },
        error: null,
      }
    }

    case SET_USER_PROFILE:
      return {
        ...state,
        user: action.payload,
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
