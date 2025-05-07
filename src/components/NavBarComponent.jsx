import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link, useNavigate, NavLink } from "react-router-dom"
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
        className="d-lg-flex justify-content-between align-items-center "
      >
        <Navbar.Brand as={Link} to="/">
          <img src="/logonav.png" alt="Logo" className="logoNavbar ms-3" />
        </Navbar.Brand>

        <div className="d-flex d-lg-none align-items-center m-0 p-0 ">
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/RegistrationPage"
                className="nav-item  mx-lg-2 text-danger-emphasis text-decoration-none"
              >
                Registrazione
              </NavLink>
              <NavLink
                to="/LoginPage"
                className="nav-item ms-sm-4 me-5 me-lg-3 text-danger-emphasis text-decoration-none "
              >
                Login
              </NavLink>
            </>
          ) : (
            <NavDropdown
              title={`Ciao ${nomeUtente}!`}
              id="basic-nav-dropdown"
              className="nav-user-dropdown"
            >
              <div className=" d-flex justify-content-center align-items-center">
                <img
                  src={`https://localhost:7156${avatarUrl}`}
                  alt="Avatar utente"
                  className="imgProfilo ms-2"
                />

                <div className="d-flex flex-column mt-2">
                  <NavDropdown.Item
                    as={Link}
                    to="/Profilo"
                    className=" text-center text-danger m-0 fw-bold"
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
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto flex-column flex-lg-row">
            <div className="d-lg-flex justify-content-between align-items-center text-center ">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "NavLinkActive" : "HoverNavLink"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/Viaggi"
                className={({ isActive }) =>
                  isActive ? "NavLinkActive" : "HoverNavLink"
                }
              >
                Viaggi
              </NavLink>
              <NavLink
                to="ViaggiPersonalizzati"
                className={({ isActive }) =>
                  isActive
                    ? "NavLinkActive text-center "
                    : "HoverNavLink text-center"
                }
              >
                Viaggi personalizzati
              </NavLink>
            </div>
            <div className="d-lg-flex  justify-content-between align-items-center text-center">
              <NavLink
                to="/BlogPage"
                className={({ isActive }) =>
                  isActive ? "NavLinkActive" : "HoverNavLink"
                }
              >
                Blog
              </NavLink>
              <NavLink
                to="/Contatti"
                className={({ isActive }) =>
                  isActive ? "NavLinkActive" : "HoverNavLink"
                }
              >
                Contatti
              </NavLink>
              <NavLink
                to="/FAQ"
                className={({ isActive }) =>
                  isActive ? "NavLinkActive" : "HoverNavLink"
                }
              >
                FAQ
              </NavLink>
            </div>
          </Nav>

          <div className="d-none d-lg-flex justify-content-center align-items-center  m-0 p-0 ">
            {!isAuthenticated ? (
              <>
                <NavLink
                  to="/RegistrationPage"
                  className="nav-item  me-5 mx-lg-2 text-danger-emphasis text-decoration-none"
                >
                  Registrazione
                </NavLink>
                <NavLink
                  to="/LoginPage"
                  className="nav-item ms-sm-4 me-5 me-lg-3 text-danger-emphasis text-decoration-none "
                >
                  Login
                </NavLink>
              </>
            ) : (
              <NavDropdown
                title={`Ciao ${nomeUtente}!`}
                id="basic-nav-dropdown"
                className="nav-user-dropdown"
              >
                <div className=" d-flex justify-content-center align-items-center">
                  <img
                    src={`https://localhost:7156${avatarUrl}`}
                    alt="Avatar utente"
                    className="imgProfilo ms-2"
                  />

                  <div className="d-flex flex-column mt-2">
                    <NavDropdown.Item
                      as={Link}
                      to="/Profilo"
                      className=" text-center text-danger m-0 fw-bold"
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
