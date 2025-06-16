# Personal Budgeting Website

A modern web application to help you manage your personal finances effectively.

## Features

- Track income and expenses
- Categorize transactions
- Visualize spending patterns with charts
- Set and monitor budget goals
- Responsive design for all devices

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```
3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd ../frontend
   npm start
   ```

## Project Structure

```
budget-app/
├── frontend/          # React frontend
├── backend/           # Node.js backend
└── README.md
``` 