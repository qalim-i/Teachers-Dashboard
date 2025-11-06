# Teachers Dashboard (React + Node)

## Overview

This repository contains a simple Teachers Dashboard project with a React frontend (Vite) and a Node/Express backend. It manages student records and notes/remarks. The frontend is under `frontend/` and the backend API is under `backend/`.

## Tech Stack

- Frontend: React (Vite), React Router, Axios, three.js + @react-three/* (for 3D/visual effects), motion
- Backend: Node.js, Express, MongoDB (models in `backend/models`)
- Dev tools: Vite, ESLint

## Project Structure

- `frontend/`
  - `src/`
    - `components/`
      - `StudentList.jsx` - shows list of students and integrates the Beams visual component
      - `StudentDetails.jsx` - shows details for a single student
      - `NotesForm.jsx` - form to add notes for students
      - `RemarkForm.jsx` - form to add remarks
      - `Beams/` - Animated beams visual (3D or animated background)
    - `App.jsx` - main React app and routing
    - `main.jsx` - app bootstrap
  - `package.json` - frontend dependencies and scripts (dev/build/preview)

- `backend/`
  - `server.js` - Express server and API routes
  - `routes/` - route definitions (e.g., `studentRoutes.js`)
  - `models/` - Mongoose (or plain JS) models e.g., `Student.js`
  - `seed.js` - optional seed script to populate sample data
  - `package.json` - backend dependencies and scripts

## How to run (development)

Open two terminals (PowerShell on Windows). From the project root directory (`reactprj`):

1. Start the backend API

```powershell
cd backend
npm install
npm start
```

The backend typically listens on port 5000 (see `backend/server.js`).

2. Start the frontend dev server

```powershell
cd frontend
npm install
npm run dev
```

This uses Vite's `dev` script (see `frontend/package.json`). The frontend usually serves on `http://localhost:5173` by default.

## Environment / Configuration

- Backend may expect a MongoDB connection string or other environment variables. Check `backend/server.js` for usage. Create a `.env` file in the `backend/` folder if required.

- API endpoints used by the frontend are typically under `/api/students` (e.g., `http://localhost:5000/api/students`). Update the URL in `frontend/src/components/StudentList.jsx` if your backend runs on a different host/port.

## React Components (summary)

- StudentList.jsx
  - Fetches student list via Axios from the backend endpoint.
  - Renders search/filter UI and links to student details.
  - Integrates the `Beams` animated component as a background/visual.

- StudentDetails.jsx
  - Shows details for a chosen student and may include notes/remarks.

- NotesForm.jsx / RemarkForm.jsx
  - Small controlled forms that post notes/remarks to the backend. Look inside `src/components` for props and expected behavior.

- Beams (in `src/components/Beams`)
  - A visual/animation component (may use three.js or CSS/motion). If imports fail at runtime, verify the path and file name and ensure the component's default export exists.

## Common troubleshooting

- Import path errors (e.g., Vite fails to resolve `../Animated/Beams`)
  - Ensure the import path matches the actual folder/file layout and casing.
  - If your beams component is `Beams.jsx` inside `src/components/Beams/Beams.jsx`, import with `import Beams from './Beams/Beams';` (relative to the importing file).
  - Restart the Vite dev server after changing file names/paths.

- CORS / API errors
  - If frontend requests to `http://localhost:5000` are blocked, enable CORS in the backend or proxy requests via Vite config.

- Backend not starting
  - Check `backend/package.json` scripts and `server.js` for the correct start script. Run `npm install` in the `backend` folder first.

## Development notes and conventions

- Use `npm run dev` inside `frontend/` to run the Vite dev server.
- ESLint is configured in the frontend — use the `lint` script to check for issues.
- Keep component files in `frontend/src/components/` and prefer relative imports.

## Contribution

Feel free to open issues or create PRs. When adding new components, update this README with a short description and example usage.

## License

This project currently has no license file.
