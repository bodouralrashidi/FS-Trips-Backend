const Trip = require("../../models/Trip");

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
  const newTrip = parseBodyToTrip(req.body);
  const [createdTrip, error] = await tryCatch(() => Trip.create(newTrip));
  if (error) return next(error);
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
  const { title, description, image, location } = reqBody;
  return { title, description, image, location };
}
