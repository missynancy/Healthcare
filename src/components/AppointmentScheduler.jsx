import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function AppointmentScheduler() {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    date: '',
    time: '',
    type: '',
    doctor: '',
    notes: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSubmit = () => {
    if (!form.date || !form.time || !form.type || !form.doctor) {
      setError('Please fill all required fields.');
      return;
    }

    const appointmentDateTime = new Date(`${form.date}T${form.time}`);
    const now = new Date();

    if (appointmentDateTime < now) {
      setError('Cannot book an appointment in the past.');
      return;
    }

    const isOverlap = appointments.some(
      (a) => a.date === form.date && a.time === form.time && a.id !== editingId
    );
    if (isOverlap) {
      setError('This time slot is already booked.');
      return;
    }

    const newAppointment = {
      id: editingId || Date.now(),
      ...form,
    };

    const updatedAppointments = editingId
      ? appointments.map((a) => (a.id === editingId ? newAppointment : a))
      : [...appointments, newAppointment];

    setAppointments(updatedAppointments);
    setForm({ date: '', time: '', type: '', doctor: '', notes: '' });
    setEditingId(null);
    setError('');
  };

  const handleEdit = (id) => {
    const appointment = appointments.find((a) => a.id === id);
    setForm(appointment);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      setAppointments(appointments.filter((a) => a.id !== id));
    }
  };

  const now = new Date();
  const upcoming = appointments.filter(
    (a) => new Date(`${a.date}T${a.time}`) >= now
  );
  const past = appointments.filter(
    (a) => new Date(`${a.date}T${a.time}`) < now
  );

  const filteredAppointments = upcoming.filter(
    (a) => a.date === selectedDate.toISOString().split('T')[0]
  );

  return (
    <div style={{ maxWidth: 700, margin: 'auto', fontFamily: 'Arial' }}>
      <h2>📅 Schedule Appointment</h2>

      {/* Calendar Integration */}
      <div style={{ marginBottom: '2rem' }}>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
        />
      </div>

      {/* Appointment Form */}
      <div>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        /><br />
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        /><br />
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="">Select Type</option>
          <option value="In-person">In-person</option>
          <option value="Telehealth">Telehealth</option>
        </select><br />
        <input
          type="text"
          placeholder="Doctor/Department"
          value={form.doctor}
          onChange={(e) => setForm({ ...form, doctor: e.target.value })}
        /><br />
        <textarea
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        /><br />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button onClick={handleSubmit}>
          {editingId ? 'Update Appointment' : 'Book Appointment'}
        </button>
      </div>

      {/* Upcoming Appointments on Selected Date */}
      <h3 style={{ marginTop: '2rem' }}>
        📌 Appointments on {selectedDate.toDateString()}
      </h3>
      {filteredAppointments.length === 0 && <p>No appointments on this day.</p>}
      <ul>
        {filteredAppointments.map((a) => (
          <li key={a.id} style={{ marginBottom: 10 }}>
            <strong>{a.date}</strong> at {a.time} with Dr. {a.doctor} ({a.type})<br />
            {a.notes && <small>Note: {a.notes}</small>}<br />
            <button onClick={() => handleEdit(a.id)}>Edit</button>{' '}
            <button onClick={() => handleDelete(a.id)}>Cancel</button>
          </li>
        ))}
      </ul>

      {/* Past Appointments */}
      <h3 style={{ marginTop: '2rem' }}>📁 Past Appointments</h3>
      {past.length === 0 && <p>No past appointments.</p>}
      <ul>
        {past
          .sort(
            (a, b) =>
              new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`)
          )
          .map((a) => (
            <li key={a.id} style={{ color: 'gray', marginBottom: 8 }}>
              {a.date} at {a.time} with Dr. {a.doctor} ({a.type}) —{' '}
              {a.notes || 'No notes'}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AppointmentScheduler;
