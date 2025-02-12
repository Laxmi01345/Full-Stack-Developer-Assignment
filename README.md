# Login and Signup Application

## Overview
This project implements a Login and Signup system with email verification using React, Node.js, and MongoDB. It includes the following features:

- **Signup**: User enters a username, email, and password. The system checks for empty fields and validates the uniqueness of the username and email. After successful signup, a verification email is sent.
- **Login**: User can log in using their username and password. The login form is validated, and JWT-based authentication is used for secure access.
- **Password Reset**: A password reset feature allows users to change their password if forgotten.

## Features
- **Signup Validation**: Checks if email and username are already registered, password validation, and sends an email for verification.
- **Email Verification**: A token-based system for verifying the user's email.
- **Login Validation**: Verifies credentials, ensures that the username exists, and checks the password against the stored hash.
- **Password Reset**: Users can reset their password if forgotten by providing their registered email.

## Third-Party Libraries Used
- **React**: A JavaScript library for building user interfaces.
- **axios**: A promise-based HTTP client for the browser and Node.js, used for making requests to the backend.
- **react-toastify**: A library for displaying toast notifications.
- **react-icons**: A library for including icons in the project, used for displaying user and password icons.
- **PasswordStrengthBar**: A library for showing the strength of the password on the Signup page.
- **jsonwebtoken (JWT)**: For token-based authentication to ensure secure access.

## Tech Stack
- **Frontend**: React, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT, Bcrypt for password hashing
- **Email Service**: Nodemailer (using Gmail for sending verification emails)

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
