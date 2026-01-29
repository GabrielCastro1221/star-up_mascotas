const express = require("express");
const parserMiddleware = require("./middlewares/parser.middleware");
const hbsMiddleware = require("./middlewares/hbs.middleware");
const corsMiddleware = require("./middlewares/cors.middleware");
const routerMiddleware = require("./middlewares/routes.middleware");
const serverMiddleware = require("./middlewares/server.middleware");

const app = express();

parserMiddleware(app);
hbsMiddleware(app);
corsMiddleware(app);
routerMiddleware(app);
serverMiddleware(app);
