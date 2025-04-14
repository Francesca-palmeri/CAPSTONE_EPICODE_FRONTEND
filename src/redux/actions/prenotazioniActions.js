export const PRENOTAZIONE_START = "PRENOTAZIONE_START"
export const PRENOTAZIONE_SUCCESS = "PRENOTAZIONE_SUCCESS"
export const PRENOTAZIONE_FAILURE = "PRENOTAZIONE_FAILURE"

export const PRENOTAZIONI_UTENTE_START = "PRENOTAZIONI_UTENTE_START"
export const PRENOTAZIONI_UTENTE_SUCCESS = "PRENOTAZIONI_UTENTE_SUCCESS"
export const PRENOTAZIONI_UTENTE_FAILURE = "PRENOTAZIONI_UTENTE_FAILURE"

export const PRENOTAZIONI_ADMIN_START = "PRENOTAZIONI_ADMIN_START"
export const PRENOTAZIONI_ADMIN_SUCCESS = "PRENOTAZIONI_ADMIN_SUCCESS"
export const PRENOTAZIONI_ADMIN_FAILURE = "PRENOTAZIONI_ADMIN_FAILURE"

export const UPDATE_PRENOTAZIONE_SUCCESS = "UPDATE_PRENOTAZIONE_SUCCESS"

export const DELETE_SUCCESS = "DELETE_SUCCESS"

export const EffettuaPrenotazione = (prenotazioneData) => async (dispatch) => {
  dispatch({ type: PRENOTAZIONE_START })

  try {
    const res = await fetch("https://localhost:7156/api/Prenotazioni", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(prenotazioneData),
    })

    if (!res.ok)
      throw new Error((await res.text()) || "Errore nella prenotazione")

    const data = await res.json()
    dispatch({ type: PRENOTAZIONE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRENOTAZIONE_FAILURE, payload: error.message })
  }
}

export const GetPrenotazioniUtente = (utenteId) => async (dispatch) => {
  dispatch({ type: PRENOTAZIONI_UTENTE_START })

  try {
    const res = await fetch(
      `https://localhost:7156/api/Prenotazioni/utente/${utenteId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )

    if (!res.ok)
      throw new Error("Errore nel recupero delle prenotazioni utente")

    const data = await res.json()
    dispatch({ type: PRENOTAZIONI_UTENTE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: PRENOTAZIONI_UTENTE_FAILURE, payload: error.message })
  }
}

export const GetTutteLePrenotazioni = () => async (dispatch) => {
  dispatch({ type: PRENOTAZIONI_ADMIN_START })

  try {
    const res = await fetch("https://localhost:7156/api/Prenotazioni", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    if (!res.ok) throw new Error("Errore nel recupero delle prenotazioni admin")

    const data = await res.json()
    dispatch({ type: PRENOTAZIONI_ADMIN_SUCCESS, payload: data })
  } catch (err) {
    dispatch({ type: PRENOTAZIONI_ADMIN_FAILURE, payload: err.message })
  }
}

export const UpdatePrenotazione = (dto) => async (dispatch) => {
  try {
    const res = await fetch(
      `https://localhost:7156/api/Prenotazioni/${dto.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(dto),
      }
    )

    if (!res.ok) throw new Error("Errore aggiornamento")

    const data = await res.json()
    dispatch({
      type: UPDATE_PRENOTAZIONE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    console.error("Update error:", error)
  }
}

export const DeletePrenotazione = (id) => async (dispatch) => {
  try {
    const res = await fetch(`https://localhost:7156/api/Prenotazioni/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    if (!res.ok) throw new Error("Errore durante l'eliminazione")
    const data = await res.json()
    dispatch({ type: DELETE_SUCCESS, payload: data })
  } catch (error) {
    console.error("Errore cancellazione:", error)
  }
}
