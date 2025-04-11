export const LOGIN_FAILURE = "LOGIN_FAILURE"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGOUT = "LOGOUT"

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await fetch("https://localhost:7156/api/Account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const err = await res.json()
      return dispatch({ type: LOGIN_FAILURE, payload: err.message })
    }

    const data = await res.json()
    localStorage.setItem("token", data.token)
    dispatch({ type: LOGIN_SUCCESS, payload: data.token })
  } catch {
    dispatch({ type: LOGIN_FAILURE, payload: "Errore di rete" })
  }
}

export const logout = () => ({ type: LOGOUT })
