const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

//setting path to public folder
const publicDirectoryPath = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsPath);
//set up handlebars engine
app.set("view engine", "hbs");

hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Andrew",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Andrew",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helptext: "This is some helpful text",
    name: "Andrew Mead",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    produucts: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      Error: "Please provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          Error: error,
        });
      }
      forecast(latitude, longitude, (error, forecastdata) => {
        if (error) {
          return res.send({
            Error: error,
          });
        }
        res.send({
          Location: location,
          forecast: forecastdata,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("rendorError", {
    name: "Andrew",
    title: "404",
    error: "Help article not found",
  });
});

//for anything abstract which doesn't find match then this wild card character(*) will be called
app.get("*", (req, res) => {
  res.render("rendorError", {
    name: "Andrew",
    title: "404",
    error: "Page not Found",
  });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
