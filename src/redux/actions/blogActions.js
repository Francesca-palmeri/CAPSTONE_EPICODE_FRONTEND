export const BLOG_LOADING = "BLOG_LOADING"
export const BLOG_SUCCESS = "BLOG_SUCCESS"
export const BLOG_FAILURE = "BLOG_FAILURE"
export const BLOG_DETAIL_SUCCESS = "BLOG_DETAIL_SUCCESS"

export const ADD_BLOG_SUCCESS = "ADD_BLOG_SUCCESS"
export const DELETE_BLOG_SUCCESS = "DELETE_BLOG_SUCCESS"
export const UPDATE_BLOG_SUCCESS = "UPDATE_BLOG_SUCCESS"

export const getBlogPosts = () => async (dispatch) => {
  dispatch({ type: BLOG_LOADING })

  try {
    const res = await fetch("https://localhost:7156/api/BlogPosts")
    const data = await res.json()
    dispatch({ type: BLOG_SUCCESS, payload: data.blogPosts })
  } catch (error) {
    dispatch({ type: BLOG_FAILURE, payload: error.message })
  }
}

export const getBlogPostById = (id) => async (dispatch) => {
  dispatch({ type: BLOG_LOADING })

  try {
    const res = await fetch(`https://localhost:7156/api/BlogPosts/${id}`)
    const data = await res.json()
    dispatch({ type: BLOG_DETAIL_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: BLOG_FAILURE, payload: error.message })
  }
}

export const addBlogPost = (postData) => async (dispatch) => {
  try {
    const res = await fetch("https://localhost:7156/api/BlogPosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(postData),
    })

    if (!res.ok) throw new Error("Errore nella creazione del post")

    const data = await res.json()
    dispatch({
      type: ADD_BLOG_SUCCESS,
      payload: data,
    })
  } catch (err) {
    dispatch({
      type: BLOG_FAILURE,
      payload: err.message,
    })
  }
}

export const deleteBlogPost = (id) => async (dispatch) => {
  try {
    const res = await fetch(`https://localhost:7156/api/BlogPosts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    if (!res.ok) throw new Error("Errore durante l'eliminazione")

    dispatch({
      type: DELETE_BLOG_SUCCESS,
      payload: id,
    })
  } catch (err) {
    dispatch({
      type: BLOG_FAILURE,
      payload: err.message,
    })
  }
}

export const updateBlogPost = (postData) => async (dispatch) => {
  try {
    const res = await fetch(
      `https://localhost:7156/api/BlogPosts/${postData.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(postData),
      }
    )

    if (!res.ok) throw new Error("Errore nell'aggiornamento del post")

    const data = await res.json()
    dispatch({ type: UPDATE_BLOG_SUCCESS, payload: data })
  } catch (err) {
    dispatch({
      type: BLOG_FAILURE,
      payload: err.message,
    })
  }
}
