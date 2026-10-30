const { createSchedule, getAllBookings } = require("../services/adminService");

const postSchedule = async (req, res, next) => {
  try {
    const { court, startTime, endTime } = req.body;
    const schedule = await createSchedule(court, startTime, endTime);
    return res.status(201).json(schedule);
  } catch (error) {
    next(error);
  }
};

const getBookings = async (req, res, next) => {
  try {
    const bookings = await getAllBookings();
    return res.json(bookings);
  } catch (error) {
    next(error);
  }
};

module.exports = { postSchedule, getBookings };