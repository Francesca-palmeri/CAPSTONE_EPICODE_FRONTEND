# 🌏 Capstone Travel Blog Giappone 🗾

>  Viaggi in Giappone. Blog. Prenotazioni. Esperienze. Tutto in un'unica piattaforma full stack. ✈️

[![.NET 8.0](https://img.shields.io/badge/.NET-8.0-blueviolet)](https://learn.microsoft.com/en-us/dotnet/core/whats-new/dotnet-8)
[![React 18](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux--Toolkit-Critical)](https://redux-toolkit.js.org/)
[![JWT Auth](https://img.shields.io/badge/Auth-JWT-green)]()
[![Status](https://img.shields.io/badge/status-In%20Development-yellow)]()

---

## ✨ Caratteristiche principali

Questa è un'applicazione full-stack che mette in comunicazione utenti appassionati di Giappone con un sistema dinamico di prenotazione viaggi, articoli di approfondimento, frasi utili, e strumenti di interazione. Gli utenti possono esplorare viaggi, leggere post del blog, lasciare commenti, salvare prenotazioni e gestire il proprio profilo.

- Autenticazione JWT con ruoli `User` e `Admin`
- Gestione viaggi e prenotazioni con PDF di riepilogo
- Blog dinamico e sistema commenti
- Form contatti con invio email e conferma visiva
- Frasi giapponesi e sezione FAQ
- Profilo utente con avatar personalizzato

---

## 🧩 Funzionalità Principali

- **Catalogo Viaggi**: filtra per tipologia, prezzo, durata. Ogni viaggio include dettagli e giorni programmati.
- **Prenotazioni**: form guidato con riepilogo PDF scaricabile. Visualizzazione lista per utenti e admin.
- **Blog & Commenti**: articoli filtrabili per categoria, commentabili da utenti autenticati.
- **Profilo Utente**: modifica dati personali, gestione avatar, cronologia prenotazioni.
- **Frasi & FAQ**: guida turistica con frasi giapponesi utili e domande frequenti.
- **Contatti**: modulo email con toast di conferma.

---

## 🕹️ Come usare l’Applicazione

1. Registrati o effettua il login per sbloccare le funzionalità.
2. Sfoglia i viaggi nella sezione **Viaggi**.
3. Accedi a un viaggio per consultare dettagli e giorni.
4. Compila il form di prenotazione.
5. Scarica il PDF generato automaticamente.
6. Esplora il **Blog** e lascia commenti se sei autenticato.
7. Accedi alla pagina **Profilo** per gestire i tuoi dati.
8. Invia richieste tramite il modulo **Contattaci**.

---

## 🛠️ Tecnologie Utilizzate

### Frontend
- React 18 + Vite
- Redux Toolkit 
- React Bootstrap
- React Router DOM
- jsPDF
- Fetch API

### Backend
- ASP.NET Core 8.0 (Web API)
- Entity Framework Core (Code First)
- ASP.NET Identity + JWT
- FluentEmail + MailKit
- SQL Server
- Serilog + Swagger

---

## 💻 Requisiti del Sistema

1. Sistema operativo qualsiasi
2. Browser moderno (consigliato: Google Chrome)
3. [.NET SDK 8.0](https://dotnet.microsoft.com/download)
4. Node.js + npm

---

## 🖥️ Editor consigliati

- **Backend**: Visual Studio 2022 o superiore  
  Offre strumenti avanzati per progetti ASP.NET Core, Entity Framework, debug e integrazione SQL Server.

- **Frontend**: Visual Studio Code  
  Leggero e flessibile, perfetto per React, Redux Toolkit e sviluppo con Vite. Consigliati i plugin:
  - ESLint
  - Prettier
  - React Developer Tools
    
---

## ⚙️ Installazione

```bash
# Clona il repository
git clone 

# Backend ---> link repository: <https://github.com/Francesca-palmeri/CAPSTONE_EPICODE_BE>
cd backend
dotnet run

# Frontend ---> link repository: <https://github.com/Francesca-palmeri/CAPSTONE_EPICODE_FRONTEND>
cd frontend
npm install
npm run dev

 ```
## ⚙️ Configurazione

⚠️ Per motivi di sicurezza, il file `appsettings.json` **non è incluso nel repository**.  
Deve essere creato manualmente all'interno del progetto.

### Esempio di `appsettings.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=TravelBlogDb;Trusted_Connection=True;"
  },
  "Jwt": {
    "SecurityKey": "la_tua_chiave_di_sicurezza_personalizzata",
    "Issuer": "TravelBlogJapan",
    "Audience": "TravelBlogJapanUser",
    "ExpiresInDays": 7
  },
  "MailSettings": {
    "SenderEmail": "tadaimanihon@email.com",
    "Username": "tadaimanihon@email.com",
    "Password": "la-tua-password-app",
    "Server": "smtp.gmail.com",
    "Port": 587,
    "UseSsl": true
  }
}
```
## 🙌 Contributi
Se desideri contribuire al miglioramento del progetto, sei il benvenuto!
Puoi aprire una pull request con suggerimenti, fix o nuove funzionalità.

## 📜 License

This project, **Capstone Travel Blog Giappone**, is licensed under the GNU General Public License v3.0.

See the [LICENSE](LICENSE) file for more details.


## 👥 Developers
Francesca Palmeri - studente Epicode classe FS0924
