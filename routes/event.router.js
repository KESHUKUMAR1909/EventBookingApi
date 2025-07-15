// routes/eventRoutes.js
const express = require('express');
const {
  createEvent,
  getEventStats,
  listUpcomingEvent,
  getEventDetails
} = require('../controllers/eventController');

const EventRouter = express.Router();

EventRouter.post('/create', createEvent);
EventRouter.get('/:id/stats', getEventStats);
EventRouter.get('/upcoming', listUpcomingEvent);
EventRouter.get('/:id/details', getEventDetails);

module.exports = EventRouter ;
