const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("./config/db");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");
const app = express();
const path = require('path');

// * Database connection
mongoose.set("strictQuery", false);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected!");
});

// * Cors
app.use(cors());

// * Body Parser
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("short"));
app.use('/data', express.static(path.join(__dirname, 'data')));
// * Api routes
app.use("/api", routes);

app.get("/", (req, res) => {
  console.log("hello");
  res.send("hello");
});

app.use("*", (req, res) => {
  res.send("Route not found");
});

let PORT = process.env.PORT || 3030;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
