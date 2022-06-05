const express = require("express");
const initiateMongoDB = require("./config/mongodb");
const initiateMiddlewares = require("./loaders/middleware");

const app = express();

initiateMongoDB();

initiateMiddlewares(app);

app.listen(8000);
