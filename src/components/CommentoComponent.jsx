import { useState } from "react"
import { Button, Card } from "react-bootstrap"
import { PencilFill, TrashFill } from "react-bootstrap-icons"

const CommentoComponent = ({
  commento,
  currentUser,
  onElimina,
  onSalvaModifica,
}) => {
  const [inModifica, setInModifica] = useState(false)
  const [testoModificato, setTestoModificato] = useState(commento.testo)

  const isAutore =
    currentUser?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ] === commento.utenteId
  const isAdmin =
    currentUser?.[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ] === "Admin"

  const avatarSrc = commento.avatarUrl
    ? `https://localhost:7156${commento.avatarUrl}`
    : "/user-avatar.png"

  return (
    <Card className="mb-3 card-commento">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <div className="d-flex align-items-center">
            <img
              src={avatarSrc}
              alt="Avatar"
              className="rounded-circle me-2"
              width={36}
              height={36}
            />
            <div>
              <div className="fw-semibold text-danger-emphasis">
                {commento.utenteNome}
              </div>
              <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                {new Date(commento.dataCreazione).toLocaleString("it-IT")}
              </div>
            </div>
          </div>

          {(isAutore || isAdmin) && (
            <div className="d-flex">
              {isAutore && (
                <Button
                  variant="outline-danger"
                  className="px-1 py-0 me-2 border-0 "
                  onClick={() => setInModifica(true)}
                >
                  <PencilFill />
                </Button>
              )}
              <Button
                variant="outline-dark"
                className="px-1 py-0 border-0"
                onClick={() => onElimina(commento.id)}
              >
                <TrashFill />
              </Button>
            </div>
          )}
        </div>

        {inModifica ? (
          <>
            <textarea
              className="form-control mb-2"
              rows="2"
              value={testoModificato}
              onChange={(e) => setTestoModificato(e.target.value)}
            />
            <Button
              variant="outline-success"
              className="rounded-5 me-2 py-0"
              onClick={() => {
                onSalvaModifica(commento.id, testoModificato)
                setInModifica(false)
              }}
            >
              Salva
            </Button>
            <Button
              variant="outline-danger"
              className="rounded-5 py-0"
              onClick={() => setInModifica(false)}
            >
              Annulla
            </Button>
          </>
        ) : (
          <p className="ms-5">{commento.testo}</p>
        )}
      </Card.Body>
    </Card>
  )
}

export default CommentoComponent
