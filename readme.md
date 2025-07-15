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

```bash
git clone https://github.com/yourusername/event-management-api.git
cd event-management-api
