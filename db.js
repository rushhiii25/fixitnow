/**
 * FixItNow - Database Connection Layer (MySQL with Automatic Resilient Fallback)
 * Supports MySQL (mysql2) natively.
 */
require('dotenv').config();
const mysql = require('mysql2/promise');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

let dbEngine = 'mysql';
let mysqlPool = null;
let sqliteDb = null;

// Database configuration
const config = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'fixitnow_db'
};

async function initDatabase() {
  try {
    console.log(`🔌 Attempting MySQL connection to ${config.host}:${config.port} (user: ${config.user})...`);
    
    // First connect without database to ensure database exists
    const rootConn = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      connectTimeout: 3000
    });

    await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await rootConn.end();

    // Create Connection Pool to fixitnow_db
    mysqlPool = mysql.createPool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test pool connection
    const testConn = await mysqlPool.getConnection();
    console.log(`✅ [MySQL] Successfully connected to MySQL database "${config.database}"!`);
    testConn.release();

    // Create Tables if not exist
    await createMySQLTables();
    dbEngine = 'mysql';

  } catch (err) {
    console.warn(`\n⚠️  [MySQL Notice] Could not connect to MySQL server on ${config.host}:${config.port}.`);
    console.warn(`   Reason: ${err.message}`);
    console.log(`💡 [Seamless Fallback] Activating local SQLite database engine (database.sqlite).`);
    console.log(`   (When you launch MySQL / XAMPP, this server will automatically use MySQL!)\n`);
    
    initSQLiteFallback();
    dbEngine = 'sqlite';
  }
}

async function createMySQLTables() {
  await mysqlPool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      phone VARCHAR(20) NOT NULL UNIQUE,
      email VARCHAR(100) NULL,
      password_hash VARCHAR(255) NOT NULL,
      city VARCHAR(50) DEFAULT 'Mumbai, MH',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await mysqlPool.query(`
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
  `);

  await mysqlPool.query(`
    CREATE TABLE IF NOT EXISTS contact_inquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      phone VARCHAR(20) NOT NULL,
      service VARCHAR(100) NOT NULL,
      city VARCHAR(50) NOT NULL,
      message TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  console.log('✅ [MySQL] Tables (users, bookings, contact_inquiries) verified and ready.');
}

function initSQLiteFallback() {
  const dbFile = path.join(__dirname, 'database.sqlite');
  sqliteDb = new sqlite3.Database(dbFile, (err) => {
    if (err) console.error('Failed to init SQLite fallback:', err.message);
  });

  sqliteDb.serialize(() => {
    sqliteDb.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT UNIQUE NOT NULL,
        email TEXT,
        password_hash TEXT NOT NULL,
        city TEXT DEFAULT 'Mumbai, MH',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    sqliteDb.run(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        booking_ref TEXT UNIQUE NOT NULL,
        user_id INTEGER NOT NULL,
        service_id TEXT NOT NULL,
        service_name TEXT NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        slot TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        customer_name TEXT NOT NULL,
        customer_phone TEXT NOT NULL,
        addons TEXT,
        base_price INTEGER NOT NULL,
        discount INTEGER DEFAULT 0,
        gst INTEGER NOT NULL,
        total_paid INTEGER NOT NULL,
        status TEXT DEFAULT 'Confirmed',
        technician TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `);

    sqliteDb.run(`
      CREATE TABLE IF NOT EXISTS contact_inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        service TEXT NOT NULL,
        city TEXT NOT NULL,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  });
}

/**
 * Universal Unified Query Function
 * Returns [rows, fields] in standard promise format matching mysql2
 */
async function query(sql, params = []) {
  if (dbEngine === 'mysql' && mysqlPool) {
    return await mysqlPool.query(sql, params);
  }

  // SQLite Execution
  return new Promise((resolve, reject) => {
    const trimmed = sql.trim();
    const isSelect = /^SELECT/i.test(trimmed);

    if (isSelect) {
      sqliteDb.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve([rows, null]);
      });
    } else {
      sqliteDb.run(sql, params, function (err) {
        if (err) return reject(err);
        const resultInfo = {
          insertId: this.lastID,
          affectedRows: this.changes
        };
        resolve([resultInfo, null]);
      });
    }
  });
}

// Auto-run initialization
initDatabase();

module.exports = {
  query,
  getEngine: () => dbEngine
};
