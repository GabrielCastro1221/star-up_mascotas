const { engine } = require("express-handlebars");
const path = require("path");

module.exports = (app) => {
    app.engine(
        "hbs",
        engine({
            extname: ".hbs",
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            },
        })
    );
    app.set("view engine", "hbs");
    app.set("views", path.join(__dirname, "../views"));
};
