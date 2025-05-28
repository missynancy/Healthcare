import React, { useEffect, useState } from 'react';

function SymptomHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching symptom history from backend
  useEffect(() => {
    const fetchSymptomHistory = async () => {
      // Simulated delay & mock data
      await new Promise((r) => setTimeout(r, 700));

      // Mock data, replace this with real API call
      const data = [
        {
          symptom: 'Headache',
          severity: 5,
          date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
        {
          symptom: 'Nausea',
          severity: 8,
          date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
        {
          symptom: 'Fatigue',
          severity: 3,
          date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        },
      ];

      setHistory(data);
      setLoading(false);
    };

    fetchSymptomHistory();
  }, []);

  if (loading) return <p>Loading symptom history...</p>;

  if (history.length === 0) return <p>No symptoms logged yet.</p>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>My Symptom History</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {history.map(({ symptom, severity, date }, idx) => (
          <li
            key={idx}
            style={{
              backgroundColor: '#f9f9f9',
              marginBottom: 12,
              padding: 15,
              borderRadius: 8,
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            <strong>{symptom}</strong> — Severity: {severity}
            <br />
            <small style={{ color: '#555' }}>{new Date(date).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SymptomHistory;
