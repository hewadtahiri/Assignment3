const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./Routes/index");
const app = express();
const uri = "mongodb+srv://hewadtahiri:ukKr8O1raqFBVDEM@assignment3.5mb3v.mongodb.net/assignment3?retryWrites=true&w=majority";

// Connects to MongoDB cluster.
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB."))
  .catch(err => console.error(`MongoDB Connection Error: ${err}.`));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));

app.use(express.static(path.join(__dirname, "Public")));
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

module.exports = app;