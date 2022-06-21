const express = require("express");
const http = require("http");
const initiateMongoDB = require("./config/mongodb");
const initiateMiddlewares = require("./loaders/middleware");
const { PORT } = require("./config/secrets");
const initiateSocketIO = require("./loaders/socket");

const app = express();
const server = http.createServer(app);

initiateSocketIO(server);

initiateMongoDB();

initiateMiddlewares(app);

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT);
}

module.exports = app;
