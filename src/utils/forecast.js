const request = require("request");

const forecast = function (lat, long, callback) {
  const url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    long +
    "&appid=3b614f22d90942a80c0dcf8a984a3dab&units=metric";
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect with the services", undefined);
    } else if (body.err) {
      callback("Unable to find the location", undefined);
    } else {
      callback(
        undefined,
        `${body.daily[0].weather[0].description}, High today is ${body.daily[0].temp.max} with a low of ${body.daily[0].temp.min} and It is currently  ${body.current.temp} degrees out.`
      );
    }
  });
};

module.exports = forecast;
