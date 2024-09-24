const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require('./config/config.js');
app.use(express.json());
app.use(cors());
require('dotenv').config();
connectDB();
const Flights = require("./routes/Flights.js");
app.use("/flights", Flights);

app.listen(process.env.PORT, "localhost", () => {
  console.log(`Server running on port ${process.env.PORT}`);
});