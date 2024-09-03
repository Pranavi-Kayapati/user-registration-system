# user-registration-system

## Description

This project is a user management system designed to handle registration, login, and user profile management.It features a responsive interface and allows users to create accounts, log in, view, and edit their profiles. The backend is built with a robust API that handles all CRUD (Create, Read, Update, Delete) operations related to user management.

## Deployed links
- **Frontend :**
   https://user-registration-system.vercel.app/
- **Backend :**
  https://user-registration-system.onrender.com/api/users
  
## Technology Stack
- **Frontend:** 
React, Redux, Chakra UI, React Router DOM, Axios, Boostrap
- **Backend:**
Node.js, Express, MongoDB, Mongoose

## Backend

### Backend Features
- **User Registration:** Securely register new users with validation checks.
- **User Login:** Authenticate users using JWT tokens.
- **User Management:** CRUD operations for managing user profiles.

### API

- **GET `/api/users`** - Retrive all users.
- **POST `/api/users/register`** - Add an user to the database.
- **POST `/api/users/login`** - User login.
- **PUT `/api/users/update/:id`** - Update the user data.
- **DELETE `/api/users/delete/:id`** - Remove a user from the database.

## Frontend

### Frontend Features
- **User Registration:** Allows users to register through a clean and intuitive form.
- **User Login:** Users can log in with email and password, with error handling for incorrect credentials.
- **Profile Management:** Users can view and edit their profile information.
- **Notifications:** Visual feedback through React Toastify for actions like registration, login, and profile updates.
- **Users :** Implemented users listing and sorting and search by name and pagination functionalities.

### UI Sample Images

- **Home Page:**
  ![image](https://github.com/user-attachments/assets/8d4a8501-3ad2-49c1-9b76-5b68ab1d5227)

  
- **Updating User Details:**
  ![image](https://github.com/user-attachments/assets/024b5015-9389-40ec-b749-0d9faf9a7e4f)


- **Register Page:**
![image](https://github.com/user-attachments/assets/454b224c-43b4-4198-a19c-4ee5fa0fef4b)



- **Login Page:**
![image](https://github.com/user-attachments/assets/1f0c7dd1-f896-4cc8-9526-3fad56743243)



## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Pranavi-Kayapati/user-registration-system.git
   ```

2. **Install Dependencies:**
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

## Running

1. **Start the Backend Server:**
   ```bash
   cd backend
   npm run server
   ```

2. **Start the Frontend Application:**
   ```bash
   cd frontend
   npm run start
   ```

3. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000`.

## Environment Variables

Ensure the following environment variables are set for the backend:

- `PORT` - 8000 (default: `5000`)
- `MONGODB_URL` - `mongodb+srv://pranavi:kayapati@cluster0.e84zy24.mongodb.net/userRegistration`

Create a `.env` file in the `backend` directory with these variables.


  ----

