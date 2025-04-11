import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../redux/actions/authActions"

function NavBarComponent() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    navigate("/") // Reindirizza alla home dopo il logout
  }

  return (
    <Navbar expand="lg" className="bgNavBar">
      <Container className="d-lg-flex justify-content-between align-items-center">
        <Navbar.Brand as={Link} to="/">
          <div>
            <img
              src="./src/assets/logonav.png"
              alt="Logo"
              className="logoNavbar"
            />
          </div>{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-lg-flex justify-content-between align-items-center">
            <div className="d-lg-flex justify-content-between align-items-center me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/viaggi">
                Viaggi
              </Nav.Link>
            </div>
            <div className="d-lg-flex justify-content-between align-items-center me-auto">
              <Nav.Link as={Link} to="/BlogPage">
                Blog
              </Nav.Link>
              <Nav.Link as={Link} to="/ContattiPage">
                Contatti
              </Nav.Link>
              <Nav.Link className="HoverNavLink" href="">
                FAQ
              </Nav.Link>
            </div>
          </Nav>
          <div className="d-lg-flex mx-2">
            {!isAuthenticated ? (
              <>
                <Nav.Link className="nav-item">
                  <Link className="nav-link me-2" to="/RegistrationPage">
                    Registrazione
                  </Link>
                </Nav.Link>
                <Nav.Link className="nav-item">
                  <Link className="nav-link " to="/LoginPage">
                    Login
                  </Link>
                </Nav.Link>
              </>
            ) : (
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/Profilo">
                  Profilo
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/Prenotazioni">
                  Prenotazioni
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBarComponent
