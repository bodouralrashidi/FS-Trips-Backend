const express = require("express");
const router = express.Router();
const {
  allTrips,
  tripById,
  newTrip,
  updateTrip,
  deleteTrip,
  newTripTest,
} = require("./trip.controllers");

router.get("/", allTrips);
router.get("/:tripId", tripById);
router.post("/", newTrip);
router.put("/:tripId", updateTrip);
router.delete("/:tripId", deleteTrip);
router.post("/trips",newTripTest)

module.exports = router;
