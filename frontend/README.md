# Teacher Dashboard
A full-stack web application built with React.js and Node.js for managing student information, notes, and remarks.

## Project Structure

```
reactprj/
├── backend/
│   ├── models/
│   │   └── Student.js
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── package.json
│   ├── seed.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── NotesForm.jsx
    │   │   ├── RemarkForm.jsx
    │   │   ├── StudentDetails.jsx
    │   │   └── StudentList.jsx
    │   ├── assets/
    │   │   └── react.svg
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── public/
    │   └── vite.svg
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── eslint.config.js
```

## Tech Stack

### Frontend
- React.js (v19)
- React Router DOM (v7)
- Axios for API calls
- Vite as build tool


### Backend
- Node.js
- Express.js (v5)
- MongoDB with Mongoose
- dotenv for environment variables

## Prerequisites

- Node.js (v16 or higher)
- MongoDB installed and running locally
- Git for version control

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file in the backend directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/student_management
   ```

4. Seed the database (optional):
   ```bash
   npm run seed
   ```

5. Start the server:
   ```bash
   npm start
   ```

The backend server will start running on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will start running on http://localhost:5173

## Available Scripts

### Backend
- `npm start`: Starts the server with nodemon for development
- `npm run seed`: Seeds the database with initial data
- `npm test`: Runs tests (not implemented yet)

### Frontend
- `npm run dev`: Starts the development server
- `npm run build`: Builds the app for production
- `npm run lint`: Runs ESLint
- `npm run preview`: Previews the production build locally

## Git Setup

1. Initialize Git repository (if not already done):
   ```bash
   git init
   ```

2. Create a .gitignore file in the root directory:
   ```
   # Dependencies
   node_modules/
   
   # Environment variables
   .env
   
   # Build files
   dist/
   build/
   
   # Logs
   *.log
   npm-debug.log*
   
   # IDE files
   .vscode/
   .idea/
   
   # OS files
   .DS_Store
   Thumbs.db
   ```

3. Make your first commit:
   ```bash
   git add .
   git commit -m "Initial commit"
   ```

4. Link to remote repository:
   ```bash
   git remote add origin <your-github-repo-url>
   git branch -M main
   git push -u origin main
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
