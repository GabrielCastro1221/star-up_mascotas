const swaggerUiExpress = require("swagger-ui-express");

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "API Guardian Pet – Documentación Oficial",
            description: "Guardian Pet es una plataforma especializada en el rastreo GPS de mascotas, diseñada con arquitectura modular y escalable. La API permite gestionar usuarios, mascotas y dispositivos GPS en tiempo real, integrando tecnologías modernas para ofrecer seguridad, control y una experiencia confiable. Aquí encontrarás la documentación oficial de los endpoints, metodologías y casos de uso que facilitan la integración con Guardian Pet."
        }
    },
    apis: ["./src/docs/**/*.yml"]
};

module.exports = swaggerOptions;
