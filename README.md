# Job Tracker Application

## Description
A Job Tracker app where users can track their job applications. Users can create, view, update, and delete job posts.

## Features
- User authentication (Sign Up, Log In)
- Add, view, update, and delete job posts
- Track job application status

## Technologies Used
- **Frontend**: React, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel 

## Installation

### Backend Setup:
1. Clone the repo:
   ```
    git clone https://github.com/yourusername/job-tracker.git
    cd job-tracker/backend
    ```

3. Install dependencies:
    ```
    npm install
    ```

4. Set up your `.env` file with:
    ```
    MONGOURL=your_mongodb_connection_url
    JWT_SECRET=your_jwt_secret_key
    ```

5. Start the server:
    ```
    npm start
    ```

### Frontend Setup:
1. Clone the repo:
    ```
    git clone https://github.com/yourusername/job-tracker.git
    cd job-tracker/frontend
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Start the frontend server:
    ```
    npm run dev
    ```

## API Endpoints
- **POST** `/auth/signup` - Register a new user
- **POST** `/auth/login` - Log in an existing user
- **POST** `/api/createJob` - Create a job post
- **GET** `/api/getAllJob` - Get all job posts
- **GET** `/api/getJob/:id` - Get job post by ID
- **PUT** `/api/updateJob/:id` - Update a job post
- **DELETE** `/api/deleteJob/:id` - Delete a job post

