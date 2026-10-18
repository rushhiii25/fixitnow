/**
 * FixItNow - Express Backend Server
 * Full REST API for Authentication, Bookings, and Contact Inquiries
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'fixitnow_super_jwt_secret_key_2026';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static assets from current directory
app.use(express.static(__dirname));

// ============================================================================
// AUTHENTICATION MIDDLEWARE
// ============================================================================
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Access denied. Please log in or create an account to view or create bookings.' 
    });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        error: 'Invalid or expired session. Please log in again.' 
      });
    }
    req.user = decoded; // { id, name, phone }
    next();
  });
}

// ============================================================================
// AUTH ROUTES
// ============================================================================

// 1. User Registration (Sign Up)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, phone, email, password, city } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({ success: false, error: 'Name, phone number, and password are required.' });
    }

    const cleanPhone = phone.replace('+91', '').trim();

    // Check if user already exists
    const [existingUsers] = await db.query(
      'SELECT id FROM users WHERE phone = ? OR phone = ? LIMIT 1', 
      [cleanPhone, `+91${cleanPhone}`]
    );
    if (existingUsers && existingUsers.length > 0) {
      return res.status(400).json({ success: false, error: 'An account with this mobile number already exists. Please log in.' });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert user
    const [result] = await db.query(
      'INSERT INTO users (name, phone, email, password_hash, city) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), cleanPhone, email ? email.trim() : null, passwordHash, city || 'Mumbai, MH']
    );

    const userId = result.insertId;

    // Generate token
    const token = jwt.sign(
      { id: userId, name: name.trim(), phone: cleanPhone },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to FixItNow.',
      token,
      user: {
        id: userId,
        name: name.trim(),
        phone: cleanPhone,
        email: email ? email.trim() : '',
        city: city || 'Mumbai, MH'
      }
    });

  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({ success: false, error: 'Server error during registration. Please try again.' });
  }
});

// 2. User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { phoneOrEmail, password } = req.body;

    if (!phoneOrEmail || !password) {
      return res.status(400).json({ success: false, error: 'Mobile number/email and password are required.' });
    }

    const input = phoneOrEmail.trim();
    const strippedPhone = input.replace('+91', '').trim();

    // Query by phone, normalized phone, or email
    const [rows] = await db.query(
      'SELECT id, name, phone, email, password_hash, city FROM users WHERE phone = ? OR phone = ? OR phone = ? OR email = ? LIMIT 1',
      [input, strippedPhone, `+91${strippedPhone}`, input]
    );

    if (!rows || rows.length === 0) {
      return res.status(400).json({ success: false, error: 'No account found with these credentials. Please sign up.' });
    }

    const user = rows[0];

    // Check password
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(400).json({ success: false, error: 'Incorrect password. Please try again.' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    return res.json({
      success: true,
      message: 'Logged in successfully!',
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        city: user.city
      }
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, error: 'Server error during login. Please try again.' });
  }
});

// 3. Current User Profile
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, phone, email, city, created_at FROM users WHERE id = ? LIMIT 1',
      [req.user.id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    return res.json({ success: true, user: rows[0] });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch user profile.' });
  }
});

// ============================================================================
// BOOKINGS ROUTES (STRICTLY REQUIRE AUTHENTICATION)
// ============================================================================

// 1. Get Logged-in User's Bookings
app.get('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM bookings WHERE user_id = ? ORDER BY id DESC',
      [req.user.id]
    );

    return res.json({
      success: true,
      count: rows.length,
      bookings: rows
    });
  } catch (error) {
    console.error('Fetch Bookings Error:', error);
    return res.status(500).json({ success: false, error: 'Failed to load bookings from database.' });
  }
});

// 2. Create New Service Booking
app.post('/api/bookings', authenticateToken, async (req, res) => {
  try {
    const {
      serviceId,
      serviceName,
      category,
      date,
      slot,
      address,
      city,
      customerName,
      customerPhone,
      addons,
      basePrice,
      discount,
      gst,
      totalPaid
    } = req.body;

    if (!serviceId || !serviceName || !date || !slot || !address) {
      return res.status(400).json({ success: false, error: 'Missing required booking information.' });
    }

    // Generate unique booking reference (e.g. FN-59421)
    const bookingRef = `FN-${Math.floor(10000 + Math.random() * 90000)}`;

    // Random certified master technician
    const pros = [
      "Rajesh Shinde (4.9★ Master Tech)",
      "Sunil Patil (4.95★ Lead Tech)",
      "Amit K. Sharma (4.88★ Pro)",
      "Ganesh More (4.92★ Specialist)"
    ];
    const assignedTechnician = pros[Math.floor(Math.random() * pros.length)];

    const addonsJson = addons ? JSON.stringify(addons) : null;

    const [result] = await db.query(`
      INSERT INTO bookings (
        booking_ref, user_id, service_id, service_name, category, date, slot,
        address, city, customer_name, customer_phone, addons,
        base_price, discount, gst, total_paid, status, technician
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed', ?)
    `, [
      bookingRef,
      req.user.id,
      serviceId,
      serviceName,
      category || 'Home Service',
      date,
      slot,
      address,
      city || 'Mumbai, MH',
      customerName || req.user.name,
      customerPhone || req.user.phone,
      addonsJson,
      basePrice || 0,
      discount || 0,
      gst || 0,
      totalPaid || 0,
      assignedTechnician
    ]);

    const createdBooking = {
      id: result.insertId,
      booking_ref: bookingRef,
      user_id: req.user.id,
      service_id: serviceId,
      service_name: serviceName,
      category,
      date,
      slot,
      address,
      city: city || 'Mumbai, MH',
      customer_name: customerName,
      customer_phone: customerPhone,
      addons: addonsJson,
      base_price: basePrice,
      discount: discount,
      gst: gst,
      total_paid: totalPaid,
      status: 'Confirmed',
      technician: assignedTechnician
    };

    return res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully in database!',
      booking: createdBooking
    });

  } catch (error) {
    console.error('Create Booking Error:', error);
    return res.status(500).json({ success: false, error: 'Failed to create booking in database.' });
  }
});

// 3. Cancel Booking (supports both PATCH and POST for maximum browser compatibility)
const handleCancelBooking = async (req, res) => {
  try {
    const rawRef = req.params.bookingRef;
    const cleanRef = (rawRef || '').replace('#', '').trim();
    console.log(`[Cancel Booking] User ${req.user.id} requested cancel for: ${rawRef} (cleaned: ${cleanRef})`);

    const [result] = await db.query(
      "UPDATE bookings SET status = 'Cancelled' WHERE (booking_ref = ? OR booking_ref = ? OR id = ?) AND user_id = ?",
      [cleanRef, `#${cleanRef}`, cleanRef, req.user.id]
    );

    console.log('[Cancel DB Result]:', result);

    return res.json({ 
      success: true, 
      message: `Booking #${cleanRef} has been cancelled successfully.` 
    });
  } catch (error) {
    console.error('Cancel Booking Error:', error);
    return res.status(500).json({ success: false, error: 'Failed to cancel booking in database.' });
  }
};

app.patch('/api/bookings/:bookingRef/cancel', authenticateToken, handleCancelBooking);
app.post('/api/bookings/:bookingRef/cancel', authenticateToken, handleCancelBooking);

// ============================================================================
// CONTACT & CALLBACK INQUIRIES ROUTE
// ============================================================================
app.post('/api/contact', async (req, res) => {
  try {
    const { name, phone, service, city, message } = req.body;

    if (!name || !phone || !service) {
      return res.status(400).json({ success: false, error: 'Name, phone number, and service are required.' });
    }

    await db.query(
      'INSERT INTO contact_inquiries (name, phone, service, city, message) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), phone.trim(), service, city || 'Mumbai', message ? message.trim() : null]
    );

    return res.json({
      success: true,
      message: `Thank you ${name}! Our area supervisor will call you within 5 minutes.`
    });
  } catch (error) {
    console.error('Contact Form Error:', error);
    return res.status(500).json({ success: false, error: 'Failed to submit callback request.' });
  }
});

// Root fallback to index.html for SPA
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 FixItNow Backend & MySQL Web Server Running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🗄️ Database: MySQL (with transparent fallback engine)`);
  console.log(`🔒 Authentication: JWT Protected Bookings Engine`);
  console.log(`======================================================\n`);
});
