const SezioneViaggiComponent = () => {
  return (
    <>
      {" "}
      {/* Sezione 3 Viaggi */}
      <div className="container text-center my-5">
        <h2 className="mb-4">Scegli il tuo viaggio</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card h-100 shadow backgroundCard">
              <img
                src="https://www.itcattaneo.it/wp-content/uploads/2021/05/Visitare-il-Giappone.jpg"
                className="card-img-top"
                alt="Viaggi di Gruppo"
              />
              <div className="card-body ">
                <h5 className="card-title RedTitles">Viaggi di Gruppo</h5>
                <p className="card-text">
                  Unisciti ad altri appassionati per un'avventura guidata in
                  Giappone.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow backgroundCard">
              <img
                src="https://www.viaggidelgenio.it/wp-content/uploads/2023/09/2-1.jpg"
                className="card-img-top"
                alt="Viaggi Autonomi"
              />
              <div className="card-body">
                <h5 className="card-title  RedTitles">Viaggi in Autonomia</h5>
                <p className="card-text">
                  Itinerari suggeriti per esplorare in libertà, con il nostro
                  supporto.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 shadow backgroundCard">
              <img
                src="https://travel.thewom.it/content/uploads/sites/4/2025/02/Motivi-per-visitare-il-giappone-704x528.jpg"
                className="card-img-top"
                alt="Viaggi Personalizzati"
              />
              <div className="card-body">
                <h5 className="card-title  RedTitles">Viaggi Personalizzati</h5>
                <p className="card-text">
                  Costruiamo insieme il tuo viaggio ideale, su misura per te.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SezioneViaggiComponent
