const Trip = require("../../models/Trip");
const User = require("../../models/User");

// status codes
const OK = 200;
const CREATED = 201;
const NO_CONTENT = 204;

exports.allTrips = async (req, res, next) => {
  const [allTrips, error] = await tryCatch(() => Trip.find());
  if (error) return next(error);
  res.status(OK).json(allTrips);
};

exports.tripById = async (req, res, next) => {
  const { tripId } = req.params;
  const [trip, error] = await tryCatch(() => Trip.findById(tripId));
  if (error) return next(error);
  res.status(OK).json(trip);
};

exports.newTrip = async (req, res, next) => {
  // create trip
  const newTrip = parseBodyToTrip(req.body);
  const [createdTrip, tripError] = await tryCatch(() => Trip.create(newTrip));
  if (tripError) return next(tripError);

  // update user trips
  const { userId } = newTrip;
  const [response, userError] = await tryCatch(() =>
    User.findByIdAndUpdate(userId, {
      $push: { trips: createdTrip._id },
    })
  );
  if (userError) return next(userError);

  res.status(CREATED).json(createdTrip);
};

exports.updateTrip = async (req, res, next) => {
  const { tripId } = req.params;
  const updates = parseBodyToTrip(req.body);

  const [updatedTrip, error] = await tryCatch(() =>
    Trip.findByIdAndUpdate(tripId, updates, { returnDocument: "after" })
  );
  if (error) return next(error);
  res.status(OK).json(updatedTrip);
};

exports.deleteTrip = async (req, res, next) => {
  const { tripId } = req.params;
  const [response, error] = await tryCatch(() =>
    Trip.findByIdAndDelete(tripId)
  );
  if (error) return next(error);
  res.status(NO_CONTENT).end();
};

async function tryCatch(promise) {
  try {
    const response = await promise();
    return [response, null];
  } catch (error) {
    return [null, error];
  }
}

function parseBodyToTrip(reqBody) {
  const { userId, title, description, image, location } = reqBody;
  return { userId, title, description, image, location };
}
