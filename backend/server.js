const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const rootRouter = require("./routes");
const connectDB = require("./db.js");
// const User = require("./models/User");



dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(rootRouter);

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});