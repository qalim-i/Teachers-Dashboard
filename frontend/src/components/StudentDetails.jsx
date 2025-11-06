import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import RemarkForm from './RemarkForm';
import NotesForm from './NotesForm';

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const { id } = useParams();

  const fetchStudentDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/students/${id}`);
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching student details:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchStudentDetails();
  }, [fetchStudentDetails]);

  const handleRemarkUpdate = async (updatedRemark) => {
    setStudent({ ...student, remarks: updatedRemark });
    // Ensure we reflect backend state
    await fetchStudentDetails();
  };

  const handleNotesUpdate = async (updatedNotes) => {
    setStudent({ ...student, recommendedNotes: updatedNotes });
    await fetchStudentDetails();
  };

  const calculateOverallGrade = (scores) => {
    const total = scores.reduce((sum, score) => sum + score, 0);
    const average = total / scores.length;
    if (average >= 23) return 'A+';
    if (average >= 20) return 'A';
    if (average >= 17) return 'B+';
    if (average >= 14) return 'B';
    if (average >= 10) return 'C';
    return 'F';
  };

  const getPerformanceStatus = (grade) => {
    switch (grade) {
      case 'A+': return { status: 'Excellent', color: '#4CAF50' };
      case 'A': return { status: 'Very Good', color: '#8BC34A' };
      case 'B+': return { status: 'Good', color: '#CDDC39' };
      case 'B': return { status: 'Average', color: '#FFC107' };
      case 'C': return { status: 'Below Average', color: '#FF9800' };
      default: return { status: 'Needs Improvement', color: '#F44336' };
    }
  };

  if (!student) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading student details...</div>;

  const overallGrade = calculateOverallGrade(student.ciaScores);
  const performance = getPerformanceStatus(overallGrade);

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      overflowY: 'auto', 
      padding: '24px', 
      boxSizing: 'border-box', 
      backgroundColor: '#0a0a0a', 
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', color: '#ffffff' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px' }}>
          ← Back to Student List
        </Link>
      </div>

      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.08)', 
        padding: '30px', 
        borderRadius: '10px', 
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1 style={{ margin: '0 0 10px 0', color: '#ffffff' }}>{student.name}</h1>
            <p style={{ margin: '0', color: 'rgba(255,255,255,0.8)', fontSize: '18px' }}>Roll Number: {student.rollNumber}</p>
          </div>
          <div style={{ 
            backgroundColor: performance.color, 
            color: 'white', 
            padding: '15px 25px', 
            borderRadius: '25px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{overallGrade}</div>
            <div style={{ fontSize: '14px' }}>{performance.status}</div>
          </div>
        </div>
      </div>

      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.08)', 
        padding: '25px', 
        borderRadius: '10px', 
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#ffffff', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Academic Performance</h2>
        
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: 'rgba(255,255,255,0.85)' }}>CIA Scores Breakdown</h3>
          <div style={{ display: 'flex', gap: '20px', marginTop: '15px' }}>
            {student.ciaScores.map((score, index) => (
              <div key={index} style={{ 
                backgroundColor: 'rgba(227, 242, 253, 0.2)', 
                padding: '15px', 
                borderRadius: '8px',
                textAlign: 'center',
                minWidth: '80px'
              }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#64b5f6' }}>{score}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>CIA {index + 1}</div>
              </div>
            ))}
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.12)', 
              padding: '15px', 
              borderRadius: '8px',
              textAlign: 'center',
              minWidth: '80px'
            }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>
                {Math.round(student.ciaScores.reduce((sum, score) => sum + score, 0) / student.ciaScores.length)}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>Average</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '25px' }}>
          <h3 style={{ color: 'rgba(255,255,255,0.85)' }}>Performance Summary</h3>
          <div style={{ 
            backgroundColor: performance.color + '20', 
            borderLeft: `4px solid ${performance.color}`,
            padding: '15px',
            marginTop: '10px',
            borderRadius: '5px'
          }}>
            <p style={{ margin: '0', fontWeight: 'bold', color: performance.color }}>
              {performance.status} Performance
            </p>
            <p style={{ margin: '5px 0 0 0', color: 'rgba(255,255,255,0.8)' }}>
              {student.ciaScores.length} assessments completed with an average of {Math.round(student.ciaScores.reduce((sum, score) => sum + score, 0) / student.ciaScores.length)}/25
            </p>
          </div>
        </div>
      </div>

      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.08)', 
        padding: '25px', 
        borderRadius: '10px', 
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#ffffff', borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Teacher's Remarks</h2>
        <div style={{ marginTop: '15px' }}>
          <div style={{ 
            backgroundColor: 'rgba(255,255,255,0.12)', 
            padding: '15px', 
            borderRadius: '8px',
            borderLeft: '4px solid #007bff',
            marginBottom: '15px'
          }}>
            <p style={{ margin: '0', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)' }}>"{student.remarks}"</p>
          </div>
          <RemarkForm studentId={student._id} currentRemark={student.remarks} onRemarkUpdate={handleRemarkUpdate} />
        </div>
      </div>

      <div style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.08)', 
        padding: '25px', 
        borderRadius: '10px', 
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.25)'
      }}>
        <h2 style={{ color: '#ffffff', borderBottom: '2px solid #28a745', paddingBottom: '10px' }}>Recommended Study Materials</h2>
        <div style={{ marginTop: '15px' }}>
          {student.recommendedNotes.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: '0' }}>
              {student.recommendedNotes.map((note, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <a 
                    href={note} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#64b5f6', 
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px',
                      backgroundColor: 'rgba(255,255,255,0.12)',
                      borderRadius: '5px',
                      transition: 'background-color 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#e3f2fd'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                  >
                    📚 {note}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No recommended materials yet.</p>
          )}
          <NotesForm studentId={student._id} currentNotes={student.recommendedNotes} onNotesUpdate={handleNotesUpdate} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default StudentDetails;