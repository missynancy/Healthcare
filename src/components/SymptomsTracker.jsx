import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SymptomTracker() {
  const [symptom, setSymptom] = useState('');
  const [severity, setSeverity] = useState(5);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const saveSymptomToBackend = async (symptomEntry) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ success: true }), 500);
    });
  };

  const handleSubmit = async () => {
    if (!symptom.trim()) {
      setMessage('Please enter a symptom.');
      setTimeout(() => setMessage(''), 4000);
      return;
    }

    const symptomEntry = {
      symptom: symptom.trim(),
      severity: Number(severity),
      date: new Date().toISOString(),
    };

    try {
      const response = await saveSymptomToBackend(symptomEntry);
      if (!response.success) {
        setMessage('Failed to save symptom. Please try again.');
        setTimeout(() => setMessage(''), 6000);
        return;
      }

      // Optionally, show a message briefly before redirect
      if (symptomEntry.severity >= 7) {
        setMessage(
          'Symptom logged. Since severity is high, consider contacting your healthcare provider.'
        );
      } else {
        setMessage('Symptom logged successfully.');
      }

      // Clear inputs
      setSymptom('');
      setSeverity(5);

      // Redirect to symptom history page after short delay
      setTimeout(() => {
        navigate('/symptom-history'); // <-- change this to your route
      }, 1000); // 1 second delay to show message

    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setTimeout(() => setMessage(''), 4000);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Symptom Tracker</h2>

      <input
        type="text"
        placeholder="Symptom"
        value={symptom}
        onChange={(e) => setSymptom(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 15, borderRadius: 4, border: '1px solid #ccc' }}
      />

      <label>
        Severity: {severity}
        <input
          type="range"
          min="1"
          max="10"
          value={severity}
          onChange={(e) => setSeverity(Number(e.target.value))}
          style={{ width: '100%', marginBottom: 15 }}
        />
      </label>

      <button
        onClick={handleSubmit}
        disabled={!symptom.trim()}
        style={{
          width: '100%',
          padding: 10,
          backgroundColor: !symptom.trim() ? '#94d3a2' : '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: !symptom.trim() ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
        }}
      >
        Log Symptom
      </button>

      {message && <p style={{ marginTop: 15, fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}

export default SymptomTracker;
