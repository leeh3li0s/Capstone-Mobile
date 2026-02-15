const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ==================== FORGOT PASSWORD ROUTES ====================

// 1. Request OTP
app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  
  try {
    // Check if user exists
    const userResult = await pool.query(
      'SELECT * FROM patient_account WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'Email not found' });
    }

    const user = userResult.rows[0];
    
    // Generate OTP
    const otp = generateOTP();
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 15); // OTP expires in 15 minutes

    // Store OTP in database
    await pool.query(
      `UPDATE patient_account 
       SET reset_otp = $1, 
           reset_otp_expiry = $2,
           reset_requested_at = CURRENT_TIMESTAMP
       WHERE email = $3`,
      [otp, expiry, email]
    );

    // Send OTP via email
    const msg = {
      to: email,
      from: process.env.FROM_EMAIL,
      subject: 'Password Reset OTP - Veterinary Clinic',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hello ${user.fullname || user.username},</p>
          <p>You requested to reset your password. Use the OTP below to proceed:</p>
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP is valid for 15 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    
    res.json({ 
      success: true, 
      message: 'OTP sent to your email' 
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// 2. Verify OTP
app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  
  try {
    const result = await pool.query(
      `SELECT * FROM patient_account 
       WHERE email = $1 
       AND reset_otp = $2 
       AND reset_otp_expiry > CURRENT_TIMESTAMP`,
      [email, otp]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    res.json({ 
      success: true, 
      message: 'OTP verified successfully' 
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

// 3. Reset Password
app.post('/reset-password', async (req, res) => {
  const { email, otp, newPassword } = req.body;
  
  try {
    // Verify OTP again (one-time use)
    const result = await pool.query(
      `SELECT * FROM patient_account 
       WHERE email = $1 
       AND reset_otp = $2 
       AND reset_otp_expiry > CURRENT_TIMESTAMP`,
      [email, otp]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear OTP fields
    await pool.query(
      `UPDATE patient_account 
       SET password = $1,
           reset_otp = NULL,
           reset_otp_expiry = NULL,
           reset_requested_at = NULL
       WHERE email = $2`,
      [hashedPassword, email]
    );

    // Send confirmation email
    const msg = {
      to: email,
      from: process.env.FROM_EMAIL,
      subject: 'Password Changed Successfully',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Changed</h2>
          <p>Your password has been successfully changed.</p>
          <p>If you didn't make this change, please contact us immediately.</p>
        </div>
      `,
    };

    await sgMail.send(msg);

    res.json({ 
      success: true, 
      message: 'Password reset successfully' 
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

// Test SendGrid connection
app.get('/test-email', async (req, res) => {
  try {
    const msg = {
      to: 'your-test-email@gmail.com', // Replace with your email
      from: process.env.FROM_EMAIL,
      subject: 'SendGrid Test',
      text: 'If you receive this, SendGrid is working!',
    };
    
    await sgMail.send(msg);
    res.json({ message: 'Test email sent successfully' });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({ error: error.message });
  }
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


 // ==================== APPOINTMENT ROUTES ====================

// Create new appointment
app.post('/appointments', async (req, res) => {
  console.log('Received appointment data:', req.body);
  
  const {
    user_id,
    appointment_type,
    appointment_date,
    appointment_time,
    patient_name,
    patient_phone,
    patient_email,
    patient_reason,
    pet_name,
    pet_species,
    pet_gender,
    pet_breed
  } = req.body;

  // Basic validation
  if (!user_id || !appointment_type || !appointment_date || !appointment_time) {
    console.log('Missing required fields:', { user_id, appointment_type, appointment_date, appointment_time });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Format the time for PostgreSQL (expects HH:MM:SS format)
    let formattedTime = appointment_time;
    
    // Check if time is in "12:00 PM" format and convert to "12:00:00"
    if (appointment_time && appointment_time.includes(' ')) {
      const [time, modifier] = appointment_time.split(' ');
      let [hours, minutes] = time.split(':');
      
      // Convert to 24-hour format
      if (modifier === 'PM' && hours !== '12') {
        hours = parseInt(hours, 10) + 12;
      }
      if (modifier === 'AM' && hours === '12') {
        hours = '00';
      }
      
      // Pad hours with leading zero if needed
      hours = hours.toString().padStart(2, '0');
      
      // Format as HH:MM:SS
      formattedTime = `${hours}:${minutes}:00`;
      console.log('Formatted time:', formattedTime);
    }

    const result = await pool.query(
      `INSERT INTO appointments (
        user_id, 
        appointment_type, 
        appointment_date, 
        appointment_time, 
        patient_name, 
        patient_phone, 
        patient_email, 
        patient_reason, 
        pet_name, 
        pet_species, 
        pet_gender, 
        pet_breed
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
      RETURNING *`,
      [
        user_id,
        appointment_type,
        appointment_date,
        formattedTime, // Use formatted time
        patient_name || '',
        patient_phone || '',
        patient_email || '',
        patient_reason || '',
        pet_name || '',
        pet_species || '',
        pet_gender || '',
        pet_breed || ''
      ]
    );

    console.log('Appointment created:', result.rows[0]);
    res.status(201).json({ 
      success: true, 
      message: 'Appointment created successfully',
      appointment: result.rows[0] 
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get appointments for a specific user
app.get('/appointments/user/:userId', async (req, res) => {
  const { userId } = req.params;

  // Validate userId
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM appointments 
       WHERE user_id = $1 
       ORDER BY appointment_date DESC, appointment_time DESC`,
      [userId]
    );

    // Format the time back to 12-hour format for display if needed
    const appointments = result.rows.map(appointment => {
      if (appointment.appointment_time) {
        // Convert from HH:MM:SS to HH:MM AM/PM
        const timeStr = appointment.appointment_time;
        const [hours, minutes] = timeStr.split(':');
        let hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        
        if (hour > 12) {
          hour = hour - 12;
        } else if (hour === 0) {
          hour = 12;
        }
        
        appointment.appointment_time_display = `${hour}:${minutes} ${ampm}`;
      }
      return appointment;
    });

    res.json({ 
      success: true, 
      appointments: appointments 
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Optional: Get all appointments (with optional date filter)
app.get('/appointments', async (req, res) => {
  const { date } = req.query;
  
  try {
    let query = 'SELECT * FROM appointments ORDER BY appointment_date DESC, appointment_time DESC';
    let params = [];
    
    if (date) {
      query = 'SELECT * FROM appointments WHERE appointment_date = $1 ORDER BY appointment_time';
      params = [date];
    }
    
    const result = await pool.query(query, params);
    
    // Format times for display
    const appointments = result.rows.map(appointment => {
      if (appointment.appointment_time) {
        const timeStr = appointment.appointment_time;
        const [hours, minutes] = timeStr.split(':');
        let hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        
        if (hour > 12) {
          hour = hour - 12;
        } else if (hour === 0) {
          hour = 12;
        }
        
        appointment.appointment_time_display = `${hour}:${minutes} ${ampm}`;
      }
      return appointment;
    });
    
    res.json({ 
      success: true, 
      appointments: appointments 
    });
  } catch (error) {
    console.error('Get all appointments error:', error);
    res.status(500).json({ error: error.message });
  }
});


//Start server
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));