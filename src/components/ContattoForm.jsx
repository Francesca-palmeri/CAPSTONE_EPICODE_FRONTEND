import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { inviaContatto } from "../redux/actions/contattoActions"

import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { Link } from "react-router-dom"
import { Form, FormControl, FormLabel, Button } from "react-bootstrap"

const ContattoForm = () => {
  const dispatch = useDispatch()
  const { loading, success, error } = useSelector((state) => state.contatto)

  const toastRef = useRef(null)
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  })

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefono: "",
    messaggio: "",
    accettaPrivacy: false,
  })

  useEffect(() => {
    if (success || error) {
      const message = success
        ? "Messaggio inviato! Verrai ricontattato il prima possibile."
        : `Errore: ${error}`
      const type = success ? "success" : "danger"

      setToast({ show: true, message, type })

      setTimeout(() => {
        if (toastRef.current) {
          const toastInstance = window.bootstrap.Toast.getOrCreateInstance(
            toastRef.current
          )
          toastInstance.show()
        }
      }, 200)
    }

    if (success) {
      setForm({
        nome: "",
        email: "",
        telefono: "",
        messaggio: "",
        accettaPrivacy: false,
      })
    }
  }, [success, error])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === "checkbox" ? checked : value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.accettaPrivacy) {
      setToast({
        show: true,
        message: "Devi accettare la privacy policy.",
        type: "warning",
      })
      const toastInstance = window.bootstrap.Toast.getOrCreateInstance(
        toastRef.current
      )
      toastInstance.show()
      return
    }

    dispatch(inviaContatto(form))
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="p-4 border border-white rounded shadow bg-white bg-opacity-75 text-center"
      >
        <h4 className=" text-center fs-2 text-danger fw-bold mb-4">
          COMPILA IL FORM
        </h4>
        <div className="mb-3 text-center d-flex flex-column align-items-center">
          <FormLabel className="text-danger fs-5 fw-semibold">
            Nome & Cognome
          </FormLabel>
          <FormControl
            className="w-75 text-center"
            type="text"
            placeholder="e. Mario Rossi"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 d-flex flex-column align-items-center">
          <FormLabel className="text-danger fs-5 fw-semibold">Email</FormLabel>
          <FormControl
            className="w-75 text-center"
            placeholder="es. rossi@example.it"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 d-flex flex-column align-items-center">
          <FormLabel className="text-danger fs-5 fw-semibold">
            Telefono
          </FormLabel>
          <FormControl
            className="w-75 text-center"
            placeholder="es. +39 3695845212 "
            type="tel"
            name="telefono"
            pattern="^\+?\d{8,15}$"
            value={form.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 d-flex flex-column align-items-center">
          <FormLabel className="text-danger fs-5 fw-semibold">
            Messaggio
          </FormLabel>
          <FormControl
            className="w-75 text-center"
            placeholder=" Inserisci qui il messaggio che vuoi inviarci"
            name="messaggio"
            as="textarea"
            rows="5"
            value={form.messaggio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="custom-checkbox d-flex align-items-center justify-content-center gap-2 my-3">
          <input
            type="checkbox"
            id="accettaPrivacy"
            name="accettaPrivacy"
            checked={form.accettaPrivacy}
            onChange={handleChange}
            disabled={loading}
          />
          <label htmlFor="accettaPrivacy" className="d-flex align-items-center">
            <div className=" d-flex justify-content-center justify-content-lg-start align-items-baseline">
              <p className="checkbox-custom" />
              <p className="ps-2">
                Confermo di aver letto e compreso l'{" "}
                <Link
                  to="/privacy"
                  className="text-decoration-none text-danger fw-bold"
                >
                  informativa sulla privacy
                </Link>
              </p>
            </div>
          </label>
        </div>

        <Button className=" RegisterButton " type="submit" disabled={loading}>
          {loading ? "Invio in corso..." : "Invia messaggio"}
        </Button>
      </Form>

      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{ zIndex: 9999 }}
      >
        <div
          ref={toastRef}
          className={`toast text-bg-${toast.type} border-0`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          data-bs-delay="4000"
          data-bs-autohide="true"
        >
          <div className="d-flex">
            <div className="toast-body">{toast.message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Chiudi"
            ></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContattoForm
