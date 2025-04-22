import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap"
import { Eye, EyeSlash } from "react-bootstrap-icons"
import { Link } from "react-router-dom"

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

  const [showPassword, setShowPassword] = useState(false)

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
    <Container fluid className="register-bg-img">
      <Row className="justify-content-center m-0">
        <Col xs={10} md={6} className=" d-flex flex-column columnRegister pt-3">
          <h2 className="text-white text-center titleLog">Registrati</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form
            className=" d-flex flex-column text-center p-2"
            onSubmit={handleSubmit}
          >
            <Form.Group className="m-0">
              <Form.Label className="mt-1 mb-0">Nome</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                className="reglogFormControl"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="m-0">
              <Form.Label className="mt-2 mb-0">Cognome</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                className="reglogFormControl"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="m-0">
              <Form.Label className="mt-2 mb-0">Data di Nascita</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                className="reglogFormControl"
                value={form.birthDate}
                onChange={handleChange}
                required
                isInvalid={!!errors.birthDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.birthDate}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="m-0">
              <Form.Label className="mt-2 mb-0">Numero di telefono</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                className="reglogFormControl "
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="m-0">
              <Form.Label className="mt-2 mb-0">Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                className="reglogFormControl"
                value={form.username}
                onChange={handleChange}
                required
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="m-0">
              <Form.Label className="mt-2 mb-0">Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                className="reglogFormControl"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="m-0">
              <Form.Label className="mt-2 mb-0">Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="reglogFormControl position-relative"
                  value={form.password}
                  onChange={handleChange}
                  required
                  isInvalid={!!errors.password}
                />
                <span
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="IconShowPassword position-absolute"
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </span>
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="RegisterButton">
              Registrati
            </Button>
            <div className=" smalltextLog d-flex justify-content-center  ">
              <p>Possiedi un account? </p>
              <Link to={"/LoginPage"} className="redirect-cta ms-1">
                Vai al login
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterComponent
