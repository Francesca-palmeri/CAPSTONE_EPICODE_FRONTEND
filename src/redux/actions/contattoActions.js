export const INVIA_CONTATTO_REQUEST = "INVIA_CONTATTO_REQUEST"
export const INVIA_CONTATTO_SUCCESS = "INVIA_CONTATTO_SUCCESS"
export const INVIA_CONTATTO_FAIL = "INVIA_CONTATTO_FAIL"

export const inviaContatto = (dati) => async (dispatch) => {
  dispatch({ type: INVIA_CONTATTO_REQUEST })
  try {
    const res = await fetch("https://localhost:7156/api/contatti", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dati),
    })

    if (!res.ok) throw new Error("Errore invio")
    const result = await res.json()

    dispatch({ type: INVIA_CONTATTO_SUCCESS, payload: result })
  } catch (err) {
    dispatch({ type: INVIA_CONTATTO_FAIL, payload: err.message })
  }
}
