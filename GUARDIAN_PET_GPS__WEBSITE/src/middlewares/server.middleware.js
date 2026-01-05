const { logger } = require("../middlewares/logger.middleware");
const configObject = require("../config/enviroment.config");
require("../config/connection.config");
const { Server } = require("socket.io");

const socketModules = [
    require("../services/socket/GPSDevice.socket.service"),
    require("../services/socket/pet.socket.services"),
    require("../services/socket/location.socket.services"),
    require("../services/socket/product.socket.service"),
    require("../services/socket/ticket.socket.service"),
];

const serverListenMiddleware = (app) => {
    const PORT = configObject.server.port;

    const httpServer = app.listen(PORT, () => {
        try {
            logger.info(`Server is running on PORT:${PORT}`);
            logger.info(`Pet GPS is running on URL http://localhost:${PORT}`);
        } catch (error) {
            logger.error(`Error occurred while starting the server: ${error.message}`);
        }
    });
    const io = new Server(httpServer);
    socketModules.forEach((SocketClass) => new SocketClass(io));
};

module.exports = serverListenMiddleware;
