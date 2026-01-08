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
            helpers: {
                times: function (n, block) {
                    let accum = "";
                    for (let i = 0; i < n; ++i) {
                        accum += block.fn(i);
                    }
                    return accum;
                },
                formatDate: function (date) {
                    if (!date) return "";
                    const options = { day: "2-digit", month: "short", year: "numeric" };
                    return new Date(date).toLocaleDateString("es-ES", options);
                },
                eq: function (a, b, options) {
                    return a === b ? options.fn(this) : options.inverse(this);
                },
                truncate: function (str, len) {
                    if (str.length > len) {
                        return str.substring(0, len) + "...";
                    }
                    return str;
                }
            }
        })
    );

    app.set("view engine", "hbs");
    app.set("views", path.join(__dirname, "../views"));
};
