const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(rootRouter);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});