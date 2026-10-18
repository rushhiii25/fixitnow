# FixItNow - Modern Home Services Web Application

A full-stack web application featuring user authentication, interactive service bookings, inquiry management, and dual database support (MySQL with automatic SQLite fallback).

---

## 🚀 Quick Setup on Another Laptop

### Prerequisites
1. **Node.js** (Version 18 or higher): Download and install from [nodejs.org](https://nodejs.org/) (if not already installed).
2. *(Optional)* **MySQL / XAMPP**: If MySQL is not running, the application will **automatically fall back to SQLite** (`database.sqlite`) with zero extra configuration!

---

### Step-by-Step Instructions

#### 1. Open Terminal in this Folder
- On Windows: Open the project folder, click the address bar, type `cmd` or `powershell`, and press **Enter**.
- Or open the folder in **VS Code** and open the terminal (`Ctrl + ~`).

#### 2. Install Dependencies
Run the following command to download all required packages:
```bash
npm install
```

#### 3. Start the Server
Run:
```bash
npm start
```
*(Alternatively: `node server.js`)*

#### 4. Open the App in Your Browser
Visit:
```
http://localhost:3000
```

---

## 🗄️ Database Options

### Option A: Automatic SQLite (Zero Config)
- Just run `npm start`! If MySQL is not running, FixItNow will automatically create and use `database.sqlite` in the project root. Everything (registration, bookings, inquiries) works out of the box.

### Option B: MySQL / XAMPP
1. Open XAMPP Control Panel and start **Apache** and **MySQL**.
2. Verify credentials in `.env` (default is user: `root`, password: empty, port: `3306`).
3. Run `npm start`. The tables will be created automatically in MySQL.
