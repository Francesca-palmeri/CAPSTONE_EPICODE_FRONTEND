import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePageComponent from "./components/HomePageComponent"
import LoginComponent from "./components/auth/LoginComponent"
import RegisterComponent from "./components/auth/RegisterComponent"
import NavBarComponent from "./components/NavBarComponent"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import FooterComponent from "./components/FooterComponent"

const App = () => (
  <BrowserRouter>
    <NavBarComponent />
    <Routes>
      <Route path="/" element={<HomePageComponent />} />
      <Route path="/LoginPage" element={<LoginComponent />} />
      <Route path="/RegistrationPage" element={<RegisterComponent />} />
    </Routes>
    <FooterComponent />
  </BrowserRouter>
)

export default App
