const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require('./middlewares/errorHandler');
const authMiddleware = require('./middlewares/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(authMiddleware);
app.use("/api", routes);
app.use(errorHandler);

module.exports = app;
