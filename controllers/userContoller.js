const { v4: uuidv4 } = require('uuid');
const User = require('../models/userSchema');
const Event = require('../models/eventSchema.js');

// 1. Register new user
const createUser = async (req, res) => {
  const { name, username } = req.body;

  if (!name || !username) {
    return res.status(400).json({ message: 'Name and username are required.' });
  }

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(409).json({ message: 'Username already exists.' });
    }

    const newUser = new User({ name, username });
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    console.error('Error creating user:', err);
    return res.status(500).json({ message: 'Server error while creating user.' });
  }
};

// 2. Book event for a user
const bookEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  if (!userId || !eventId) {
    return res.status(400).json({ message: 'User ID and Event ID are required.' });
  }

  try {
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!event || !user) {
      return res.status(404).json({ message: 'User or Event not found.' });
    }

    if (new Date(event.date) <= new Date()) {
      return res.status(400).json({ message: 'Cannot register for a past event.' });
    }

    if (event.registrations.find(r => r.user.toString() === userId)) {
      return res.status(400).json({ message: 'User is already registered for this event.' });
    }

    if (event.registrations.length >= event.totalSeats) {
      return res.status(400).json({ message: 'Event is already full.' });
    }

    const ticketId = `TICKET-${uuidv4()}`;

    event.registrations.push({ user: userId, ticketId });
    await event.save();

    return res.status(200).json({
      message: 'Event booked successfully',
      ticketId,
      eventId: event._id,
      user: { id: user._id, name: user.name }
    });

  } catch (err) {
    console.error('Error booking event:', err);
    return res.status(500).json({ message: 'Server error while booking event.' });
  }
};

// 3. Cancel event booking for a user
const cancelEventBooking = async (req, res) => {
  const { userId, eventId } = req.body;

  if (!userId || !eventId) {
    return res.status(400).json({ message: 'User ID and Event ID are required.' });
  }

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found.' });

    const registrationIndex = event.registrations.findIndex(r => r.user.toString() === userId);

    if (registrationIndex === -1) {
      return res.status(400).json({ message: 'User is not registered for this event.' });
    }

    event.registrations.splice(registrationIndex, 1);
    await event.save();

    return res.status(200).json({ message: 'Registration cancelled successfully.' });
  } catch (err) {
    console.error('Error cancelling registration:', err);
    return res.status(500).json({ message: 'Server error while cancelling booking.' });
  }
};

module.exports = {
  createUser,
  bookEvent,
  cancelEventBooking
};
