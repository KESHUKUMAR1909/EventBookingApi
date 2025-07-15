# Event Management API

This is a backend REST API for an Event Management System built using Node.js, Express, and MongoDB (Mongoose).

## Features

- Create and manage events
- Register users for events
- Cancel registrations
- View event statistics
- List upcoming events
- Auto-expiring events using TTL
- Input validation and business rule enforcement

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- UUID for ticket generation

## Folder Structure

.
├── controllers/
│   ├── eventController.js
│   └── userController.js
├── models/
│   ├── eventSchema.js
│   └── userSchema.js
├── routes/
│   ├── event.router.js
│   └── user.Routes.js
├── .env
├── index.js
└── README.md

## Setup Instructions

1. Clone the repository

   git clone https://github.com/KESHUKUMAR1909/EventBookingApi
   

2. Install dependencies

   npm install

3. Create a `.env` file in the root directory with the following content:

   MONGO_URL=mongodb://localhost:27017/eventDB

4. Start the server

   node index.js

Server runs at: http://localhost:3000

## API Endpoints and Examples

### POST /api/v1/user/register

**Request**
```json
{
  "name": "Keshu Kumar",
  "username": "keshu123"
}
