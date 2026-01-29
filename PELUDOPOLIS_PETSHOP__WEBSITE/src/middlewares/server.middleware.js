const { logger } = require("../middlewares/logger.middleware");
const configObject = require("../config/enviroment.config");
require("../config/connection.config");

const serverListenMiddleware = (app) => {
    const PORT = configObject.server.port;

    app.listen(PORT, () => {
        try {
            logger.info(`Server is running on PORT:${PORT}`);
            logger.info(`Peludopolis is running on URL http://localhost:${PORT}`);
        } catch (error) {
            logger.error(`Error occurred while starting the server: ${error.message}`);
        }
    });
};

module.exports = serverListenMiddleware;
