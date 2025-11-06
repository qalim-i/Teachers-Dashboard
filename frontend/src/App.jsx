import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentDetails from './components/StudentDetails';


function App() {
  return (
    <Router>
      <div className="App">
        <h1>Teacher Student Dashboard</h1>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/student/:id" element={<StudentDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
