import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePageComponent from "./components/HomePageComponent"
import LoginComponent from "./components/auth/LoginComponent"
import RegisterComponent from "./components/auth/RegisterComponent"
import NavBarComponent from "./components/NavBarComponent"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import FooterComponent from "./components/FooterComponent"
import ViaggiComponent from "./components/ViaggiCatalogoComponent"
import DettagliViaggioComponent from "./components/DettagliViaggioComponent"
import PrenotazioniComponent from "./components/PrenotazioniComponent"
import PrenotazioneFormComponent from "./components/PrenotazioniFormComponent"

const App = () => (
  <BrowserRouter>
    <NavBarComponent />
    <Routes>
      <Route path="/" element={<HomePageComponent />} />
      <Route path="/LoginPage" element={<LoginComponent />} />
      <Route path="/RegistrationPage" element={<RegisterComponent />} />
      <Route path="/Viaggi" element={<ViaggiComponent />} />
      <Route path="/Viaggi/:id" element={<DettagliViaggioComponent />} />
      <Route path="/Prenotazioni" element={<PrenotazioniComponent />} />
      <Route
        path="/PrenotazioniPersonalizzate"
        element={<PrenotazioneFormComponent />}
      />
    </Routes>
    <FooterComponent />
  </BrowserRouter>
)

export default App
