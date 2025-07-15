const Event = require('../models/eventSchema.js');


const createEvent = async (req, res) => {
  try {
    const { title, date, location, totalSeats } = req.body;

    if (!title || !location || !totalSeats || !date) {
      return res.status(400).json({ message: 'Title, date, location, and totalSeats are required.' });
    }

    if (totalSeats > 1000) {
      return res.status(400).json({ message: 'Total seats cannot exceed 1000.' });
    }

    const eventDate = new Date(date);

    if (eventDate <= new Date()) {
      return res.status(400).json({ message: 'Event date must be in the future.' });
    }

    const newEvent = new Event({
      title,
      date: eventDate,
      location,
      totalSeats,
      expiresAt: eventDate
    });

    await newEvent.save();

    return res.status(201).json({
      message: 'Event created successfully. Will expire on event day.',
      event: newEvent
    });

  } catch (err) {
    console.error('Error creating event:', err);
    return res.status(500).json({ message: 'Server error while creating event.' });
  }
};

const getEventStats = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    const totalRegistrations = event.registrations.length;
    const remainingCapacity = event.totalSeats - totalRegistrations;
    const capacityPercentage = (totalRegistrations / event.totalSeats) * 100;

    return res.status(200).json({
      totalRegistrations,
      remainingCapacity,
      capacityPercentage: `${capacityPercentage.toFixed(2)}%`
    });

  } catch (err) {
    console.error('Error fetching event stats:', err);
    return res.status(500).json({ message: 'Server error while fetching event stats.' });
  }
};

const listUpcomingEvent = async (req, res) => {
  try {
    const events = await Event.find();

    if (!events.length) {
      return res.status(404).json({ message: "No events found" });
    }

    const upcomingEvents = events.filter(event => event.date > new Date());

    return res.status(200).json({
      message: "Upcoming events:",
      events: upcomingEvents
    });
  } catch (err) {
    console.error('Error fetching upcoming events:', err);
    return res.status(500).json({ message: "Server error while fetching upcoming events." });
  }
};

const getEventDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id).populate('registrations.user', 'name username');

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({
      message: "Event details fetched successfully",
      event
    });

  } catch (err) {
    console.error('Error fetching event details:', err);
    return res.status(500).json({ message: "Server error while fetching event details." });
  }
};

module.exports = {
  createEvent,
  getEventStats,
  listUpcomingEvent,
  getEventDetails
};
