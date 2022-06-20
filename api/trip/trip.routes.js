const express = require("express");
const router = express.Router();
const {
  allTrips,
  tripById,
  newTrip,
  updateTrip,
  deleteTrip,
} = require("./trip.controllers");

router.get("/", allTrips);
router.get("/:tripId", tripById);
router.post("/", newTrip);
router.put("/:tripId", updateTrip);
router.delete("/:tripId", deleteTrip);

module.exports = router;
