import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Beams from './Beams/Beams';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#0a0a0a', color: '#ffffff', overflow: 'hidden' }}>
      {/* Background Beams Animation */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>
      
      {/* Content Container */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '40px', textAlign: 'center', fontWeight: 'bold', textShadow: '0 0 20px rgba(255, 255, 255, 0.5)' }}>
           Student List
         </h2>
         
         <div style={{ marginBottom: '40px', textAlign: 'center' }}>
           <input
             type="text"
             placeholder="Search by name..."
             onChange={(e) => setSearchTerm(e.target.value)}
             style={{
               padding: '15px 25px',
               fontSize: '18px',
               border: '2px solid #333',
               borderRadius: '30px',
               backgroundColor: 'rgba(255, 255, 255, 0.1)',
               color: 'rgba(255, 255, 255, 1)',
               width: '400px',
               outline: 'none',
               transition: 'all 0.3s ease',
               backdropFilter: 'blur(5px)'
             }}
             onFocus={(e) => e.target.style.borderColor = '#ffffff'}
             onBlur={(e) => e.target.style.borderColor = '#333'}
           />
         </div>
         
         <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '30px', backdropFilter: 'blur(15px)', maxWidth: '600px', width: '100%', maxHeight: '60vh', overflowY: 'auto', scrollbarWidth: 'none' }}>
           <ul style={{ listStyle: 'none', padding: 0, margin: 0,backgroundColor: 'rgba(255, 255, 255, 0.05)',color: 'rgba(255, 252, 252, 0)' }}>
            {filteredStudents.map(student => (
               <li key={student._id} style={{ 
                 padding: '20px', 
                 color: 'rgba(255, 255, 255, 0)',
                 borderBottom: '1px solid rgba(81, 76, 76, 1)',
                 transition: 'background-color 0.3s ease',
                 cursor: 'pointer'
               }}
               onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
               onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
               >
                 <Link 
                   to={`/student/${student._id}`} 
                   style={{ 
                     color: 'rgba(255, 255, 255, 1)', 
                     textDecoration: 'none', 
                     fontSize: '20px',
                     fontWeight: '600',
                     transition: 'color 0.3s ease'
                   }}
                   onMouseOver={(e) => e.target.style.color = '#3e454bff'}
                   onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 1)'}
                 >
                   {student.name}
                 </Link>
                 <span style={{ color: 'rgba(255, 255, 255, 0.6)', marginLeft: '15px', fontSize: '16px' }}>
                   Roll: {student.rollNumber}
                 </span>
               </li>
             ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentList;