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
  const { user } = useSelector((state) => state.auth)
  const userName =
    user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
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
              <Nav.Link as={Link} to="/" className="HoverNavLink">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/Viaggi" className="HoverNavLink">
                Viaggi
              </Nav.Link>
            </div>
            <div className="d-lg-flex justify-content-between align-items-center me-auto">
              <Nav.Link as={Link} to="/BlogPage" className="HoverNavLink">
                Blog
              </Nav.Link>
              <Nav.Link as={Link} to="/ContattiPage" className="HoverNavLink">
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
                <Nav.Link
                  as={Link}
                  to="/RegistrationPage"
                  className="nav-item  mx-2"
                >
                  Registrazione
                </Nav.Link>
                <Nav.Link as={Link} to="/LoginPage" className="nav-item">
                  Login
                </Nav.Link>
              </>
            ) : (
              <NavDropdown title={`${userName}`} id="basic-nav-dropdown">
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
