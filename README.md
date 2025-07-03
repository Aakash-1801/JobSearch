#  Welcome to My MERN Stack Job Portal

## Info

A **MERN stack Job Portal** built for **Students** and **Companies** to interact through job listings and internship opportunities.

---

##  Features

This project includes a dynamic, role-based user interface where:

-  **Students** can browse job/internship openings, apply for opportunities, and track their applications.  
-  **Companies** can post job openings with deadlines and view participant registrations, including resume downloads.  
-  **Admins** have extended API access. While not actively used in the current app, admin routes exist for role and permission management.  
-  A **profile page** is available for users who want to personalize their account.  
-  **Permission-based access** ensures users can only access routes relevant to them.  
  - Students: apply, view their applications, view/edit their profile.  
  - Companies: post jobs, view applications/resumes for their opportunities.  
-  A **Superadmin** exists who can create and assign roles, and perform all admin-level operations.  

> Forgot your password? Use the **"Forgot Password"** feature — you'll receive an email with a token link to reset the password then **remember it!** 

---

##  Installation

### Backend Setup

```bash
cd Backend
npm install
```

####  Environment Setup

In the `.env` file, add:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
RESET_EMAIL=your_email@gmail.com
RESET_PASS="your_16_char_app_password"
JWT_SECRET=your_jwt_secret
```

 Need help with MongoDB connection string?  
Visit: https://www.mongodb.com/docs/manual/reference/connection-string/

---

###  Gmail & Nodemailer Setup (For Password Reset)

Gmail does not allow direct login for third-party apps like Nodemailer if 2FA is enabled. Use **App Passwords**:

#### 1. Enable 2-Step Verification

- Visit: https://myaccount.google.com/security  
- Enable **2-Step Verification** under "Signing in to Google"

#### 2. Generate App Password

- Visit: https://myaccount.google.com/apppasswords  
- Select **App: Your app name (e.g. Mail)**
- Click **Create**  
- Copy the 16-character app password (e.g., `xcyw gqmt shsd xklm`)  
- Use this in your `.env`:

```env
RESET_EMAIL=your_email@gmail.com
RESET_PASS=xcyw gqmt shsd xklm
```

---

###  Frontend Setup

```bash
cd Frontend
npm install
```

---

##  Running the Project

### Start Backend Server

```bash
cd Backend
node server.js
```

### Start Frontend

Open another terminal:

```bash
cd Frontend
npm start
```

---
