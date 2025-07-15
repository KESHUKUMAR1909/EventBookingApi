const express = require('express');
const {
  createUser,
  bookEvent,
  cancelEventBooking
} = require('../controllers/userContoller.js');

const userRouter = express.Router();
userRouter.post('/register', createUser);
userRouter.post('/book', bookEvent);
userRouter.post('/cancel', cancelEventBooking);

module.exports = userRouter;
