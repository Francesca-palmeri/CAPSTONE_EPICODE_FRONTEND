import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../redux/actions/authActions"
import { BagHeart, BoxArrowLeft, PersonCheck } from "react-bootstrap-icons"

function NavBarComponent() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  const userName =
    user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
    user?.firstName + " " + user?.lastName ||
    "Utente"

  const nomeUtente = userName?.split(" ")[0] || "Utente"

  const avatarUrl = user?.avatarUrl || "/img/user-avatar.png"

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  return (
    <Navbar expand="lg" className="bgNavBar">
      <Container
        fluid
        className="d-lg-flex justify-content-between align-items-center"
      >
        <Navbar.Brand as={Link} to="/">
          <img
            src="./src/assets/logonav.png"
            alt="Logo"
            className="logoNavbar"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto flex-row">
            <div className="d-lg-flex justify-content-between align-items-center me-auto ">
              <Nav.Link as={Link} to="/" className="HoverNavLink">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/Viaggi" className="HoverNavLink">
                Viaggi
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="ViaggiPersonalizzati"
                className="HoverNavLink text-center"
              >
                Viaggi personalizzati
              </Nav.Link>
            </div>
            <div className="d-lg-flex justify-content-between align-items-center me-auto">
              <Nav.Link as={Link} to="/BlogPage" className="HoverNavLink">
                Blog
              </Nav.Link>
              <Nav.Link as={Link} to="/ContattiPage" className="HoverNavLink">
                Contatti
              </Nav.Link>
              <Nav.Link as={Link} to="/FAQ" className="HoverNavLink">
                FAQ
              </Nav.Link>
            </div>
          </Nav>

          <div className="d-flex justify-content-between align-items-center ms-auto">
            {!isAuthenticated ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/RegistrationPage"
                  className="nav-item  mx-lg-2"
                >
                  Registrazione
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/LoginPage"
                  className="nav-item ms-sm-4 me-lg-3 marginLoginNav"
                >
                  Login
                </Nav.Link>
              </>
            ) : (
              <NavDropdown
                title={`Ciao ${nomeUtente}!`}
                id="basic-nav-dropdown"
                className="nav-user-dropdown"
              >
                <div className=" d-flex justify-content-center align-items-center">
                  <img
                    src={avatarUrl}
                    alt="Avatar utente"
                    className="imgProfilo mx-2"
                  />
                  <div className="d-flex flex-column mt-2">
                    <NavDropdown.Item
                      as={Link}
                      to="/Profilo"
                      className=" text-center m-0 fw-bold"
                    >
                      {userName}
                    </NavDropdown.Item>
                  </div>
                </div>

                <NavDropdown.Divider />

                <div className="d-flex flex-column justify-content-center align-items-center">
                  <h6 className="mt-2">Gestione</h6>
                  <NavDropdown.Item
                    as={Link}
                    to="/Prenotazioni"
                    className="text-center d-flex justify-content-start align-items-baseline"
                  >
                    <BagHeart className="me-2 p-0" />
                    Prenotazioni
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/Profilo"
                    className="text-center d-flex justify-content-start align-items-baseline"
                  >
                    <PersonCheck className="me-2 p-0" />
                    Account
                  </NavDropdown.Item>
                </div>

                <NavDropdown.Divider />

                <div className=" d-flex justify-content-start align-items-baseline">
                  <NavDropdown.Item onClick={handleLogout}>
                    <BoxArrowLeft className="me-2 mb-1 p-0" />
                    Logout
                  </NavDropdown.Item>
                </div>
              </NavDropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBarComponent
