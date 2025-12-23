# 🚗 Car Rental System API

**Live URL:** https://car-rental-sahariaralam8-3171-sahariars-projects.vercel.app/  

---

## 📌 Project Overview

The Car Rental System API is a backend service that allows customers to book vehicles for a specific period and enables administrators to manage vehicle availability and booking lifecycle efficiently.  
The system ensures role-based access control, date-based validations, and automatic vehicle availability updates.

---

## ✨ Features

### Customer
- Register and login
- Create vehicle bookings
- Cancel bookings **before the rental start date**
- View own booking history

### Admin
- View all bookings
- Mark bookings as **returned**
- Automatically update vehicle availability

### System
- Role-based authorization (`customer`, `admin`)
- Automatic vehicle status update on booking return
- Secure authentication using JWT
- PostgreSQL database integration

---

## 🛠 Technology Stack

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Token)
- **ORM / DB Layer:** pg (node-postgres)
- **API Testing:** Postman
- **Version Control:** Git

---

