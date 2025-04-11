import SezioneViaggiComponent from "./SezioneViaggiComponent"

const HomePageComponent = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section text-white text-center d-flex align-items-center justify-content-center">
        <div className="overlay"></div>

        <div className="content">
          <h1 className="VerticalJP">ただいま日本！</h1>
          <h2 className="display-3 fw-bold">Esplora il Giappone con noi</h2>
          <p className="lead">Viaggi su misura per ogni spirito</p>
          <div className="mt-4">
            <button className="btn btn-outline-light me-3">
              Scopri di più
            </button>
            <button className="btn btn-outline-light">
              Personalizza il tuo viaggio
            </button>
          </div>
        </div>
      </div>
      {/* Content Section */}
      <SezioneViaggiComponent />
    </div>
  )
}

export default HomePageComponent
