# Extensio.ai — No-Code Chrome Extension Generator

Extensio.ai lets anyone describe a Chrome extension in plain English and instantly get back a working, installable extension — no coding required.

**Live Demo:** https://extensio-frontend.onrender.com/

Type a prompt like *"Make a Chrome extension that blocks all YouTube ads"* and the platform generates a complete Manifest V3 extension, packages it into a ZIP, and makes it available for download.

---

## Features

* AI-Powered Chrome Extension Generation
* Manifest V3 Compatible Extensions
* Instant ZIP Download
* User Authentication (JWT)
* Personal Dashboard
* Saved Extensions Management
* Free Plan Usage Limits
* Profile Settings
* Login-Gated Generation

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* Groq SDK (Llama 3.3 70B Versatile)
* JWT Authentication
* bcryptjs
* archiver
* dotenv

### Frontend

* React (Vite)
* React Router DOM
* Tailwind CSS
* Framer Motion
* Lucide React

### Infrastructure

* Docker
* MongoDB Atlas
* Render

---

## Project Structure

```text
extensio/
├── backend/
├── frontend/
```

---

## Local Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

Create `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
GROQ_API_KEY=your_groq_api_key
JWT_SECRET=your_secret_key
FREE_PLAN_LIMIT=3
FRONTEND_URL=http://localhost:5173
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `.env.local`:

```env
VITE_API_URL=http://localhost:5000
```

---

## API Endpoints

| Method | Endpoint                     | Description        |
| ------ | ---------------------------- | ------------------ |
| POST   | /api/auth/register           | Register User      |
| POST   | /api/auth/login              | Login User         |
| PUT    | /api/auth/profile            | Update Profile     |
| POST   | /api/extensions/generate     | Generate Extension |
| GET    | /api/extensions/download/:id | Download Extension |
| GET    | /api/extensions/my           | User Extensions    |
| DELETE | /api/extensions/:id          | Delete Extension   |

---

## How It Works

1. Enter an extension prompt.
2. AI generates Manifest V3 extension files.
3. Download the generated ZIP.
4. Extract the ZIP.
5. Open `chrome://extensions`.
6. Enable Developer Mode.
7. Click **Load Unpacked**.
8. Select the extracted folder.

---

## Deployment

### Frontend

https://extensio-frontend.onrender.com/

### Backend

Render Hosted Node.js API

---

## Known Limitations

* AI-generated code may occasionally require refinement.
* Some advanced Chrome APIs are not yet supported.
* Subscription billing is planned but not implemented.




