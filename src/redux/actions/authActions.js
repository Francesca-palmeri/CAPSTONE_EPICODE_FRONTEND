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

export const AVATAR_URL_UPDATE_SUCCESS = "AVATAR_URL_UPDATE_SUCCESS"
export const AVATAR_UPDATE_FAILURE = "AVATAR_UPDATE_FAILURE"

export const updateAvatarUrl = (url) => async (dispatch) => {
  try {
    const res = await fetch(
      "https://localhost:7156/api/Account/profile/avatar",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(url),
      }
    )

    const data = await res.json()

    if (res.ok) {
      dispatch({ type: AVATAR_URL_UPDATE_SUCCESS, payload: data.avatarUrl })
    } else {
      dispatch({ type: AVATAR_UPDATE_FAILURE, payload: data.message })
    }
  } catch (err) {
    dispatch({ type: AVATAR_UPDATE_FAILURE, payload: err.message })
  }
}

export const AVATAR_DELETE_SUCCESS = "AVATAR_DELETE_SUCCESS"
export const AVATAR_DELETE_FAILURE = "AVATAR_DELETE_FAILURE"

export const deleteAvatar = () => async (dispatch) => {
  try {
    const res = await fetch(
      "https://localhost:7156/api/Account/profile/avatar",
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )

    const data = await res.json()

    if (res.ok) {
      dispatch({ type: AVATAR_DELETE_SUCCESS })
    } else {
      dispatch({ type: AVATAR_DELETE_FAILURE, payload: data.message })
    }
  } catch (err) {
    dispatch({ type: AVATAR_DELETE_FAILURE, payload: err.message })
  }
}
