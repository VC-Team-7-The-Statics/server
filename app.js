const express = require("express");
const { createServer } = require("http");
const initiateMongoDB = require("./config/mongodb");
const initiateMiddlewares = require("./loaders/middleware");
const { PORT } = require("./config/secrets");
const initiateSocketIO = require("./loaders/socket");

const app = express();
const server = createServer(app);

initiateMongoDB();

initiateSocketIO(server);

initiateMiddlewares(app);

app.listen(PORT);
