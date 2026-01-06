// backend/src/routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Event registration endpoint
router.post('/register', async (req, res) => {
  try {
    const { full_name, email, phone, company, position, event_title } = req.body;
    
    // Save to database
    const [result] = await db.execute(
      `INSERT INTO event_registrations 
      (full_name, email, phone, company, position, event_title, registration_date, status) 
      VALUES (?, ?, ?, ?, ?, ?, NOW(), 'pending')`,
      [full_name, email, phone, company, position, event_title]
    );
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// Get all registrations (admin only)
router.get('/registrations', async (req, res) => {
  try {
    const [registrations] = await db.execute(
      'SELECT * FROM event_registrations ORDER BY registration_date DESC'
    );
    
    res.json({ success: true, data: registrations });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch registrations' });
  }
});

// Update registration status
router.put('/registrations/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    await db.execute(
      'UPDATE event_registrations SET status = ? WHERE id = ?',
      [status, id]
    );
    
    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ success: false, error: 'Failed to update status' });
  }
});

module.exports = router;