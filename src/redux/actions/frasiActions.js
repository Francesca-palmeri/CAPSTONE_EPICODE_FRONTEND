export const FRASI_LOADING = "FRASI_LOADING"
export const FRASI_SUCCESS = "FRASI_SUCCESS"
export const FRASI_FAILURE = "FRASI_FAILURE"

export const getFrasiUtili = () => async (dispatch) => {
  dispatch({ type: FRASI_LOADING })

  try {
    const res = await fetch("https://localhost:7156/api/FrasiUtili")
    const data = await res.json()

    dispatch({
      type: FRASI_SUCCESS,
      payload: data.frasi,
    })
  } catch (err) {
    dispatch({
      type: FRASI_FAILURE,
      payload: err.message,
    })
  }
}
