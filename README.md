# FixItNow - Modern Home Services Web Application

A full-stack web application featuring user authentication, interactive service bookings, inquiry management, and MySQL database support with phpMyAdmin integration.

---

## 🎓 College Project Demo: How to Show MySQL Database to Teacher / Mam

For college presentation, practical exams, or project viva, professors always look for **MySQL tables and phpMyAdmin**. Here is how to show it live:

### 1. Start XAMPP
1. Open **XAMPP Control Panel**.
2. Click **Start** next to **Apache**.
3. Click **Start** next to **MySQL**.

### 2. Open phpMyAdmin in Browser
Open your browser and navigate to:
```
http://localhost/phpmyadmin
```

### 3. How the Database & Tables are Created
- Simply run `npm start` in the project folder! The backend automatically connects to MySQL, creates the database `fixitnow_db`, and builds all 3 tables with relationships:
  1. `users` (User accounts with hashed passwords)
  2. `bookings` (All service bookings with Foreign Key linking to `users.id`)
  3. `contact_inquiries` (Contact and support messages)
- *(Alternative Manual Method)*: In phpMyAdmin, click **New** -> create database named `fixitnow_db` -> click **Import** tab -> choose `schema.sql` from this folder -> click **Go**.

### 4. Live Demonstration for Evaluation (Impressive Viva Flow)
1. In phpMyAdmin, click `fixitnow_db` and click on `users` or `bookings` to show empty or existing records.
2. In another tab, open `http://localhost:3000`.
3. Register a new user or make a service booking on the website.
4. Switch back to phpMyAdmin and click **Browse** or refresh the table.
5. Point out to Mam how the data was instantly inserted into the MySQL database with timestamps and foreign keys!

---

## 🚀 Setup on Another Laptop

### Prerequisites
1. **Node.js** (LTS Version): Download from [nodejs.org](https://nodejs.org/)
2. **XAMPP**: Download from [apachefriends.org](https://www.apachefriends.org/)
3. **Git**: Download from [git-scm.com](https://git-scm.com/)

---

### Step-by-Step Instructions

#### 1. Download the Project
```bash
git clone https://github.com/rushhiii25/fixitnow.git
cd fixitnow
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Start XAMPP
Open XAMPP and click **Start** on **Apache** and **MySQL**.

#### 4. Run the Project
```bash
npm start
```

#### 5. Open in Browser
- **Frontend App:** `http://localhost:3000`
- **Database (phpMyAdmin):** `http://localhost/phpmyadmin`
