const express = require("express");
const initiateMongoDB = require("./config/mongodb");
const initiateMiddlewares = require("./loaders/middleware");
const { PORT } = require("./config/secrets");

const app = express();

initiateMongoDB();

initiateMiddlewares(app);

app.listen(PORT);
