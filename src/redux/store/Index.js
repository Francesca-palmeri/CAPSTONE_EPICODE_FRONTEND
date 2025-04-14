import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../reducers/authReducer"
import viaggiReducer from "../reducers/viaggiReducer"
import giorniViaggioReducer from "../reducers/giorniReducer"
import prenotazioneReducer from "../reducers/prenotazioneReducer"
import prenotazioniListaReducer from "../reducers/prenotazioniListaReducer"

const mainReducer = combineReducers({
  auth: authReducer,
  viaggi: viaggiReducer,
  giorniViaggio: giorniViaggioReducer,
  prenotazione: prenotazioneReducer,
  prenotazioniLista: prenotazioniListaReducer,
})

const store = configureStore({
  reducer: mainReducer,
})

export default store
