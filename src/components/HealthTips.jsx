import React, { useState, useEffect } from 'react';

// Simulated API response
const mockTipsAPI = {
  Hypertension: {
    Nutrition: [
      'Reduce sodium in your diet',
      'Eat more potassium-rich foods like bananas and sweet potatoes',
    ],
    Lifestyle: [
      'Exercise 30 minutes a day',
      'Limit alcohol intake',
    ],
  },
  Diabetes: {
    Nutrition: [
      'Eat low-glycemic foods like whole grains',
      'Avoid sugary drinks and refined carbs',
    ],
    Lifestyle: [
      'Check your blood sugar daily',
      'Maintain a healthy weight',
    ],
  },
};

function HealthTips({ conditions = ['Hypertension'], role = 'patient' }) {
  const [tips, setTips] = useState([]);
  const [category, setCategory] = useState('All');
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    let collectedTips = {};
    conditions.forEach((condition) => {
      const conditionTips = mockTipsAPI[condition] || {};
      Object.entries(conditionTips).forEach(([cat, tipsList]) => {
        if (!collectedTips[cat]) collectedTips[cat] = [];
        collectedTips[cat] = [...new Set([...collectedTips[cat], ...tipsList])];
      });
    });

    setTips(collectedTips);
    setAvailableCategories(['All', ...Object.keys(collectedTips)]);
  }, [conditions]);

  const filteredTips =
    category === 'All'
      ? Object.values(tips).flat()
      : tips[category] || [];

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: 600, margin: 'auto' }}>
      <h2>📋 Personalized Health Tips</h2>

      <label htmlFor="category"><strong>Filter by Category:</strong></label>{' '}
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginBottom: '1rem' }}
      >
        {availableCategories.map((cat, idx) => (
          <option key={idx} value={cat}>{cat}</option>
        ))}
      </select>

      {filteredTips.length === 0 ? (
        <p>No tips available for the selected category.</p>
      ) : (
        <ul>
          {filteredTips.map((tip, index) => (
            <li key={index}>
              {tip}
              {role === 'patient' && (
                <span style={{ marginLeft: 10 }}>
                  <button style={{ fontSize: '0.8rem' }}>👍</button>
                  <button style={{ fontSize: '0.8rem' }}>👎</button>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HealthTips;
