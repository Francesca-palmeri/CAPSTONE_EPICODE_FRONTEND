import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../reducers/authReducer"
import viaggiReducer from "../reducers/viaggiReducer"
import giorniViaggioReducer from "../reducers/giorniReducer"
import prenotazioneReducer from "../reducers/prenotazioneReducer"
import prenotazioniListaReducer from "../reducers/prenotazioniListaReducer"
import blogReducer from "../reducers/blogReducer"

const mainReducer = combineReducers({
  auth: authReducer,
  viaggi: viaggiReducer,
  giorniViaggio: giorniViaggioReducer,
  prenotazione: prenotazioneReducer,
  prenotazioniLista: prenotazioniListaReducer,
  blog: blogReducer,
})

const store = configureStore({
  reducer: mainReducer,
})

export default store
