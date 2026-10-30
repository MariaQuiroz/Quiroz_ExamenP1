const { Router } = require("express");
const { postSchedule, getBookings } = require("../controllers/adminController");
const { authenticateToken, isAdmin } = require("../middlewares/auth");

const router = Router();

router.post("/schedules", authenticateToken, isAdmin, postSchedule);
router.get("/bookings", authenticateToken, isAdmin, getBookings);

module.exports = router;