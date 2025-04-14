import {
  BLOG_LOADING,
  BLOG_SUCCESS,
  BLOG_FAILURE,
  BLOG_DETAIL_SUCCESS,
  ADD_BLOG_SUCCESS,
  DELETE_BLOG_SUCCESS,
  UPDATE_BLOG_SUCCESS,
} from "../actions/blogActions"

const initialState = {
  loading: false,
  error: null,
  lista: [],
  dettaglio: null,
}

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case BLOG_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        lista: action.payload,
      }
    case BLOG_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        dettaglio: action.payload,
      }
    case BLOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case ADD_BLOG_SUCCESS:
      return {
        ...state,
        lista: [action.payload, ...state.lista],
      }

    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        lista: state.lista.filter((post) => post.id !== action.payload),
      }

    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        lista: state.lista.map((post) =>
          post.id === action.payload.id ? action.payload : post
        ),
      }

    default:
      return state
  }
}

export default blogReducer
