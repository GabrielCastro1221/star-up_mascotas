const viewsRouter = require("../routes/views.routes");

const setupRoutes = (app) => {
    app.use("/", viewsRouter);
};

module.exports = setupRoutes;
