import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFrasiUtili } from "../redux/actions/frasiActions"
import { Container, Spinner, Alert, Accordion } from "react-bootstrap"

const FrasiUtiliComponent = () => {
  const dispatch = useDispatch()
  const { lista, loading, error } = useSelector((state) => state.frasi)
  const [categoriaSelezionata, setCategoriaSelezionata] = useState("Tutte")

  console.log(lista)

  useEffect(() => {
    dispatch(getFrasiUtili())
  }, [dispatch])

  const categorie = Array.from(new Set(lista.map((f) => f.categoria))).sort()

  const frasiFiltrate =
    categoriaSelezionata === "Tutte"
      ? lista
      : lista.filter((f) => f.categoria === categoriaSelezionata)

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">
        🗣️ Frasi giapponesi utili per viaggiare
      </h2>
      <p className="text-center text-muted mb-4">
        Un piccolo frasario per aiutarti durante il tuo viaggio in Giappone!
      </p>

      <div className="mb-4 text-center">
        <span
          className={`badge rounded-pill me-2 px-3 py-2 ${
            categoriaSelezionata === "Tutte"
              ? "bg-primary"
              : "bg-light text-dark border"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => setCategoriaSelezionata("Tutte")}
        >
          Tutte
        </span>

        {categorie.map((cat, index) => (
          <span
            key={index}
            className={`badge rounded-pill me-2 px-3 py-2 ${
              categoriaSelezionata === cat
                ? "bg-primary"
                : "bg-light text-dark border"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => setCategoriaSelezionata(cat)}
          >
            {cat}
          </span>
        ))}
      </div>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">Errore: {error}</Alert>}

      <Accordion alwaysOpen>
        {frasiFiltrate.map((frase) => (
          <Accordion.Item eventKey={frase.id.toString()} key={frase.id}>
            <Accordion.Header>
              <p className=" mx-2 my-2 ">{frase.giapponeseKana}</p>
            </Accordion.Header>
            <Accordion.Body className="">
              <p>
                <strong>Giapponese (kana):</strong> {frase.giapponeseKana}
              </p>
              <p>
                <strong>Romaji:</strong> {frase.romaji}
              </p>

              <p>
                <strong>Traduzione: </strong>
                {frase.italiano}
              </p>
              <p>{frase.categoria}</p>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  )
}

export default FrasiUtiliComponent
