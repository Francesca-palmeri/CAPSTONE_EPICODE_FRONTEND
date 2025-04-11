import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/actions/authActions.js"
import { useNavigate } from "react-router-dom"

const LoginComponent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, token } = useSelector((state) => state.auth)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column align-items-center mt-4"
    >
      <h2>Login</h2>
      <div className="form-group my-2">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group my-2">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary my-2">
        Login
      </button>
      {error && <p className="text-danger">{error}</p>}
    </form>
  )
}

export default LoginComponent
