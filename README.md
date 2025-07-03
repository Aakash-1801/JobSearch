# Welcome to my MERN stack app

## Info

A MERN stack Job portal created for Seekers and Companies to interact through Job listings and Internship opportunities.

## Features

This project has dynamic role-based user interface where..

- Students can browse job openings, apply for opprotunity and keep track of their application
- companies can post job applications with deadlines and can view participants register for their opportunity
- I have made some api for admin privileges but the use case of my application doesn't require such.
- I have also made a profile page just for those people who like to decorate their profile.
- It has permission based access where Users has access to only those pages that has any connection with them like register for application, view your application, your profile page same for company that can post opportunity and view applications and resume of those who have registered for your opportunity.
- Admins they have all the permissions but they are none for now and there is one superadmin that can create and assign roles to others and do everything that admins can.

> If you forgot your password then.. just hit the forgot password button and you will recieve an e-mail with a token link to reset your password then **Remember it**.

## Installation

Installing server dependencies
```bash
cd Backend
npm install
```
### Env setup
Enter your mongoDB connection string in **MONGO_URL** section.

for more info about mongoDB connection string visit https://www.mongodb.com/docs/manual/reference/connection-string/

### Gmail & Nodemailer Setup (for Password Reset)

Gmail does not allow direct login with your Gmail password for third-party apps like Nodemailer, especially if 2-Step Verification is enabled.
To send password reset emails securely, follow these steps:

### Enable 2-step verification

- Go to your Google Account:
https://myaccount.google.com/security

- Enable 2-Step Verification under the "Signing in to Google" section.


### Create an App Password

goto https://myaccount.google.com/apppasswords
- under app name section choose name for your app (e.g. Mail)
- click on create and it will generate a 16 digit password (e.g., xcyw gqmt shsd xklm) copy it.

> In .env under **RESET_EMAIL** enter your email address(users will recieve reset email from this account) and under **RESET_PASS** paste the password that you copied.

Installing client dependencies
```bash
cd Frontend
npm install
```

### Start Project
start server
```bash
cd Backend
npm server.js
```

start client

open another terminal and run
```bash
cd Frontend
npm start