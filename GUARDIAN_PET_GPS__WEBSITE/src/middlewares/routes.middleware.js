const viewsRouter = require("../routes/views.routes");
const userRouter = require("../routes/user.routes");
const petRouter = require("../routes/pet.routes");
const gpsDeviceRouter = require("../routes/gpsDevice.routes");
const locationRouter = require("../routes/location.routes")
const authRouter = require("../routes/auth.routes");
const productRouter = require("../routes/product.routes");
const cartRouter = require("../routes/cart.routes");
const ticketRouter = require("../routes/ticket.routes");
const categoryRouter = require("../routes/category.routes");
const shippingRouter = require("../routes/shipping.routes");
const configPageRouter = require("../routes/configPage.routes");
const guardianPetConfigRouter = require("../routes/guardianPetConfig.routes");
const uploadRouter = require("../routes/upload.routes");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUiExpress = require("swagger-ui-express");
const swaggerOptions = require("./swagger.middleware");

const specs = swaggerJsDoc(swaggerOptions);

const setupRoutes = (app) => {
    app.use("/", viewsRouter);
    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/pets", petRouter);
    app.use("/api/v1/gpsDevice", gpsDeviceRouter);
    app.use("/api/v1/locations", locationRouter);
    app.use("/api/v1/auth", authRouter);
    app.use("/api/v1/products", productRouter);
    app.use("/api/v1/cart", cartRouter);
    app.use("/api/v1/tickets", ticketRouter);
    app.use("/api/v1/categories", categoryRouter);
    app.use("/api/v1/shipping", shippingRouter);
    app.use("/api/v1/configPage", configPageRouter);
    app.use("/api/v1/guardianPetConfig", guardianPetConfigRouter);
    app.use("/api/v1", uploadRouter);
    app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
};

module.exports = setupRoutes;
