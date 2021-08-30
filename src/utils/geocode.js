const request = require("request");
const geocode = function (address, callback) {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiYXJ3YWluZG9uZXNpYSIsImEiOiJja3Nza3FwMTMweGRyMnluMTYyYXE4Zmx3In0.fbNTYRFwjffb2w20pw5nqQ&limit=1";
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
