-- ============================================================================
-- FixItNow - Home Service Booking Platform
-- Complete MySQL Database Schema (schema.sql)
-- ============================================================================

-- 1. Create Database if not exists
CREATE DATABASE IF NOT EXISTS fixitnow_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE fixitnow_db;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL UNIQUE,
  email VARCHAR(100) NULL,
  password_hash VARCHAR(255) NOT NULL,
  city VARCHAR(50) DEFAULT 'Mumbai, MH',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Bookings Table (strictly linked to user_id)
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_ref VARCHAR(30) NOT NULL UNIQUE,
  user_id INT NOT NULL,
  service_id VARCHAR(50) NOT NULL,
  service_name VARCHAR(150) NOT NULL,
  category VARCHAR(50) NOT NULL,
  date VARCHAR(50) NOT NULL,
  slot VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(50) NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  addons TEXT NULL,
  base_price INT NOT NULL,
  discount INT DEFAULT 0,
  gst INT NOT NULL,
  total_paid INT NOT NULL,
  status VARCHAR(30) DEFAULT 'Confirmed',
  technician VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Contact & Emergency Callback Inquiries Table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service VARCHAR(100) NOT NULL,
  city VARCHAR(50) NOT NULL,
  message TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
