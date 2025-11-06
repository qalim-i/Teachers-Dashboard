import React, { useState } from 'react';
import axios from 'axios';

const NotesForm = ({ studentId, currentNotes, onNotesUpdate }) => {
  const [notes, setNotes] = useState(currentNotes.join('\n'));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const notesArray = notes.split('\n').filter(note => note.trim() !== '');
    try {
      setSaving(true);
      setSaved(false);
      console.log('Submitting notes update...', { studentId, notesArray });
      const response = await axios.post(`http://localhost:5000/api/students/${studentId}/notes`, { recommendedNotes: notesArray });
      onNotesUpdate(response.data.recommendedNotes);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch (error) {
      console.error('Error updating notes:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="5" />
      <button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Update Notes'}
      </button>
      {saved && <span style={{ marginLeft: '8px', color: '#28a745', fontWeight: 'bold' }}>✓ Saved</span>}
    </form>
  );
};

export default NotesForm;