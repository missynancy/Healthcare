import React, { useState, useEffect } from 'react';

function MedicationManager() {
  // Medication structure: { id, name, dosage, frequency, startDate, endDate }
  const [meds, setMeds] = useState(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('meds');
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    name: '',
    dosage: '',
    frequency: '',
    startDate: '',
    endDate: '',
  });

  const [editId, setEditId] = useState(null); // null means add new, else editing existing
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Persist meds to localStorage whenever it changes
    localStorage.setItem('meds', JSON.stringify(meds));
  }, [meds]);

  const resetForm = () => {
    setForm({ name: '', dosage: '', frequency: '', startDate: '', endDate: '' });
    setEditId(null);
    setError('');
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setError('Medication name is required.');
      return false;
    }
    // Prevent duplicates by name (case insensitive), excluding currently edited med
    const duplicate = meds.find(
      (m) =>
        m.name.toLowerCase() === form.name.trim().toLowerCase() &&
        m.id !== editId
    );
    if (duplicate) {
      setError('This medication is already in the list.');
      return false;
    }
    return true;
  };

  const handleAddOrUpdate = () => {
    if (!validateForm()) return;

    if (editId === null) {
      // Add new
      const newMed = {
        id: Date.now(),
        ...form,
        name: form.name.trim(),
      };
      setMeds([newMed, ...meds]);
      setMessage(`Medication "${form.name}" added.`);
    } else {
      // Update existing
      setMeds((prev) =>
        prev.map((med) =>
          med.id === editId ? { ...med, ...form, name: form.name.trim() } : med
        )
      );
      setMessage(`Medication "${form.name}" updated.`);
    }

    resetForm();

    // Clear messages after 3 seconds
    setTimeout(() => {
      setMessage('');
      setError('');
    }, 3000);
  };

  const handleDelete = (id) => {
    const medToDelete = meds.find((m) => m.id === id);
    if (window.confirm(`Delete medication "${medToDelete.name}"?`)) {
      setMeds((prev) => prev.filter((m) => m.id !== id));
      setMessage(`Medication "${medToDelete.name}" deleted.`);
      setTimeout(() => setMessage(''), 3000);
      if (editId === id) resetForm();
    }
  };

  const handleEdit = (med) => {
    setForm({
      name: med.name,
      dosage: med.dosage,
      frequency: med.frequency,
      startDate: med.startDate,
      endDate: med.endDate,
    });
    setEditId(med.id);
    setError('');
    setMessage('');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Medication Manager</h2>

      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: 6,
          padding: 15,
          marginBottom: 20,
          backgroundColor: '#fafafa',
        }}
      >
        <h3>{editId === null ? 'Add Medication' : 'Edit Medication'}</h3>

        <input
          type="text"
          placeholder="Name*"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Dosage (e.g. 10mg)"
          value={form.dosage}
          onChange={(e) => setForm({ ...form, dosage: e.target.value })}
          style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Frequency (e.g. Twice a day)"
          value={form.frequency}
          onChange={(e) => setForm({ ...form, frequency: e.target.value })}
          style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <label>
          Start Date:
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            style={{ marginLeft: 10, marginBottom: 10 }}
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            style={{ marginLeft: 19, marginBottom: 10 }}
          />
        </label>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          onClick={handleAddOrUpdate}
          disabled={!form.name.trim()}
          style={{
            padding: 10,
            backgroundColor: form.name.trim() ? '#28a745' : '#94d3a2',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: form.name.trim() ? 'pointer' : 'not-allowed',
            marginRight: 10,
          }}
        >
          {editId === null ? 'Add Medication' : 'Update Medication'}
        </button>

        {editId !== null && (
          <button
            onClick={resetForm}
            style={{
              padding: 10,
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {message && <p style={{ fontWeight: 'bold', color: '#28a745' }}>{message}</p>}

      <h3>Medication List</h3>
      {meds.length === 0 ? (
        <p>No medications added yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#eee' }}>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Dosage</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Frequency</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Start Date</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>End Date</th>
              <th style={{ border: '1px solid #ccc', padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {meds.map((med) => (
              <tr key={med.id}>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{med.name}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{med.dosage || '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{med.frequency || '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{med.startDate || '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>{med.endDate || '-'}</td>
                <td style={{ border: '1px solid #ccc', padding: 8 }}>
                  <button
                    onClick={() => handleEdit(med)}
                    style={{
                      marginRight: 8,
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: 4,
                      padding: '5px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(med.id)}
                    style={{
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: 4,
                      padding: '5px 10px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MedicationManager;
