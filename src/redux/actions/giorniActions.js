export const FETCH_GIORNI_START = "FETCH_GIORNI_START"
export const FETCH_GIORNI_SUCCESS = "FETCH_GIORNI_SUCCESS"
export const FETCH_GIORNI_FAILURE = "FETCH_GIORNI_FAILURE"

export const GetGiorniViaggio = (viaggioId) => async (dispatch) => {
  dispatch({ type: FETCH_GIORNI_START })

  try {
    const response = await fetch(
      `https://localhost:7156/api/GiorniViaggio/by-viaggio/${viaggioId}`
    )
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = await response.json()
    console.log(data)
    dispatch({
      type: FETCH_GIORNI_SUCCESS,
      payload: data.giorni,
    })
  } catch (error) {
    dispatch({
      type: FETCH_GIORNI_FAILURE,
      payload: error.message,
    })
  }
}
