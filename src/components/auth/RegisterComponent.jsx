import { useState } from "react"
import { useNavigate } from "react-router-dom"

const RegisterComponent = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDate: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("https://localhost:7156/api/Account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.message || "Errore registrazione")
        return
      }
      setSuccess("Registrazione avvenuta con successo!")
      // Reindirizza al login dopo un breve delay
      setTimeout(() => navigate("/LoginPage"), 2000)
    } catch (err) {
      console.error("Network error:", err)
      setError("Errore di rete")
    }
  }

  return (
    <form
      onSubmit={handleRegister}
      className="d-flex flex-column align-items-center mt-4"
    >
      <h2>Registrati</h2>
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      <div className="d-flex flex-column align-items-center">
        <input
          type="text"
          name="firstName"
          placeholder="Nome"
          value={form.firstName}
          onChange={handleChange}
          className="form-control my-1"
          required
        />
        <input
          name="lastName"
          placeholder="Cognome"
          value={form.lastName}
          onChange={handleChange}
          className="form-control my-1"
          required
        />
        <input
          name="birthDate"
          type="date"
          value={form.birthDate}
          onChange={handleChange}
          className="form-control my-1"
          required
        />
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="form-control my-1"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="form-control my-1"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="form-control my-1"
          required
        />
        <button type="submit" className="btn btn-primary my-2">
          Registrati
        </button>
      </div>
    </form>
  )
}

export default RegisterComponent
