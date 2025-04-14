export const GET_VIAGGI_SUCCESS = "GET_VIAGGI_SUCCESS"
export const GET_VIAGGI_FAILURE = "GET_VIAGGI_FAILURE"

export const GetViaggi = () => async (dispatch) => {
  try {
    const response = await fetch("https://localhost:7156/api/Viaggi")
    if (!response.ok) {
      throw new Error("Errore nella richiesta dei viaggi")
    }
    const data = await response.json()
    console.log(data.viaggi)
    dispatch({
      type: GET_VIAGGI_SUCCESS,
      payload: data.viaggi,
    })
  } catch (error) {
    console.error("Errore:", error)
    dispatch({
      type: GET_VIAGGI_FAILURE,
      payload: error.message,
    })
  }
}
