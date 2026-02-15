const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test route
app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: 'Database connected!', time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register endpoint
app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
  
  try {
    // Check if user exists
    const userExists = await pool.query(
      'SELECT * FROM patient_account WHERE email = $1 OR username = $2',
      [email, username]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Email or username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user - matching your patient_account table
    const result = await pool.query(
      `INSERT INTO patient_account (email, username, password, fullname, contactnumber, status, datecreated, role) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING pk, email, username`,
      [email, username, hashedPassword, '', '', 'active', new Date().toISOString().split('T')[0], 'patient']
    );

    res.status(201).json({ 
      message: 'User registered successfully',
      user: result.rows[0] 
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, username, password } = req.body;
  
  try {
    // Find by email or username
    let query;
    let value;
    
    if (email) {
      query = 'SELECT * FROM patient_account WHERE email = $1';
      value = email;
    } else {
      query = 'SELECT * FROM patient_account WHERE username = $1';
      value = username;
    }

    const result = await pool.query(query, [value]);
    
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    
    // Check password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Return user info (excluding password)
    res.json({ 
      message: 'Login successful',
      user: {
        pk: user.pk,
        email: user.email,
        username: user.username,
        fullname: user.fullname,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));