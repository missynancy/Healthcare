import React, { useState } from 'react';
import jsPDF from 'jspdf';
import emailjs from 'emailjs-com';

function ShareData() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);

  const healthSummary = {
    name: 'John Doe',
    conditions: ['Hypertension', 'Diabetes'],
    medications: ['Lisinopril', 'Metformin'],
    lastVisit: '2025-05-15',
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Health Summary', 10, 10);
    doc.text(`Name: ${healthSummary.name}`, 10, 20);
    doc.text(`Conditions: ${healthSummary.conditions.join(', ')}`, 10, 30);
    doc.text(`Medications: ${healthSummary.medications.join(', ')}`, 10, 40);
    doc.text(`Last Visit: ${healthSummary.lastVisit}`, 10, 50);
    doc.save('health_summary.pdf');
  };

  const sendViaEmailJS = () => {
    emailjs.send('service_8sotdjb', 'template_ra7eprb', {
      to_email: email,
      patient_name: healthSummary.name,
      message: JSON.stringify(healthSummary, null, 2),
    }, 'your_user_id')
    .then(() => {
      alert('✅ Health summary sent successfully to ' + email);
    })
    .catch((err) => {
      console.error(err);
      alert('❌ Failed to send email.');
    });
  };

  const handleExport = () => {
    if (!email || !consent) {
      alert('Please provide provider email and give consent.');
      return;
    }

    console.log('Exporting health summary to:', email);

    generatePDF();       // Optionally generate/download PDF
    sendViaEmailJS();    // Send via email service
  };

  // Optional: FHIR bundle conversion
  const convertToFHIR = () => ({
    resourceType: 'Bundle',
    type: 'collection',
    entry: [
      {
        resource: {
          resourceType: 'Patient',
          name: [{ given: ['John'], family: 'Doe' }],
        },
      },
      {
        resource: {
          resourceType: 'Condition',
          code: {
            text: 'Hypertension',
          },
        },
      },
      {
        resource: {
          resourceType: 'MedicationStatement',
          medicationCodeableConcept: {
            text: 'Lisinopril',
          },
        },
      },
    ],
  });

  return (
    <div style={{ maxWidth: 400, margin: 'auto', fontFamily: 'Arial' }}>
      <h2>📤 Share With Provider</h2>

      <input
        type="email"
        placeholder="Provider Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />

      <div style={{ marginBottom: 12 }}>
        <label>
          <input
            type="checkbox"
            checked={consent}
            onChange={() => setConsent(!consent)}
          />{' '}
          I consent to share my health summary.
        </label>
      </div>

      <button onClick={handleExport}>Send Health Summary</button>

      <button
        style={{ marginTop: 10 }}
        onClick={() => console.log('FHIR format:', convertToFHIR())}
      >
        🔎 Preview FHIR Data
      </button>
    </div>
  );
}

export default ShareData;
