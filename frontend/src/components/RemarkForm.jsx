import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RemarkForm = ({ studentId, currentRemark, onRemarkUpdate }) => {
  const [remark, setRemark] = useState(currentRemark);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setRemark(currentRemark);
  }, [currentRemark]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSaved(false);
      console.log('Submitting remark update...', { studentId, remark });
      const response = await axios.post(`http://localhost:5000/api/students/${studentId}/remark`, { remarks: remark });
      onRemarkUpdate(response.data.remarks);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch (error) {
      console.error('Error updating remark:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={remark ?? ''} onChange={(e) => setRemark(e.target.value)} />
      <button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Update Remark'}
      </button>
      {saved && <span style={{ marginLeft: '8px', color: '#28a745', fontWeight: 'bold' }}>✓ Saved</span>}
    </form>
  );
};

export default RemarkForm;