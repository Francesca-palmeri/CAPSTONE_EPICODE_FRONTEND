import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap"

const RegisterComponent = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    phoneNumber: "",
  })

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    birthDate: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const validateForm = (name, value) => {
    let newErrors = { ...errors }

    if (name === "username") {
      newErrors.username = /\s/.test(value)
        ? "L'username non può contenere spazi."
        : ""
    }

    if (name === "password") {
      const isValid =
        value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value)
      newErrors.password = isValid
        ? ""
        : "La password deve contenere almeno 8 caratteri, una lettera e un numero."
    }
    setErrors(newErrors)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError("")
    validateForm(name, value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Se ci sono errori nei campi, blocca il submit
    const hasErrors = Object.values(errors).some((err) => err !== "")
    if (hasErrors) {
      setError("Correggi gli errori nel modulo.")
      return
    }

    try {
      const res = await fetch("https://localhost:7156/api/Account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.message || "Errore durante la registrazione.")
        return
      }

      setSuccess("Registrazione avvenuta con successo!")
      setTimeout(() => navigate("/LoginPage"), 2000)
    } catch (err) {
      setError("Errore di rete.", err)
    }
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Registrati</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Data di nascita</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={form.birthDate}
                onChange={handleChange}
                required
                isInvalid={!!errors.birthDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.birthDate}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Numero di telefono</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100">
              Registrati
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterComponent
