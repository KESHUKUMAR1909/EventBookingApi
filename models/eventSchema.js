const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String,
    required: true
  },
  totalSeats: {
    type: Number,
    max: 1000
  },

  // 👇 Inline registration object
  registrations: [
    {
      ticketId: {
        type: String,
        required: true
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to your custom User model
        required: true
      }
    }
  ],

  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  }
}, {
  timestamps: true
});

// TTL index to auto-delete expired events
eventSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
