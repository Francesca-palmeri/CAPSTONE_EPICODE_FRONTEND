import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/actions/authActions.js"
import { Link, useNavigate } from "react-router-dom"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { EyeSlash, Eye } from "react-bootstrap-icons"

const LoginComponent = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { error, token } = useSelector((state) => state.auth)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
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
    <>
      <Container fluid className="register-bg-img ">
        <Row className=" m-0">
          <Col className=" d-flex  justify-content-center align-items-center">
            <Form
              onSubmit={handleSubmit}
              className="d-flex flex-column align-items-center mx-auto columnRegister"
            >
              <div className=" d-flex flex-column loginFormGroup">
                <h2 className="text-white text-center  titleLog">Benvenuto!</h2>
                <h5 className=" m-auto">ようこそ！</h5>
                <Form.Group className="mt-3 text-center">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    className="reglogFormControl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mt-5 text-center">
                  <Form.Label>Password</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      className="reglogFormControl"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        color: "black",
                        fontSize: "1.rem",
                      }}
                    >
                      {showPassword ? <Eye /> : <EyeSlash />}
                    </span>
                  </div>
                </Form.Group>
                <Button type="submit" className="RegisterButton">
                  Login
                </Button>
                <div className=" smalltextLog d-flex justify-content-center ">
                  <p>Non sei registrato? </p>{" "}
                  <Link to={"/RegistrationPage"} className="redirect-cta ms-1">
                    Crea un account
                  </Link>
                </div>
                {error && <p className="text-danger">{error}</p>}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default LoginComponent
