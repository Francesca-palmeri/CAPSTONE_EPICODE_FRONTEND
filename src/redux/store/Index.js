import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../reducers/authReducer"

const mainReducer = combineReducers({
  auth: authReducer,
})

const store = configureStore({
  reducer: mainReducer,
})

export default store
