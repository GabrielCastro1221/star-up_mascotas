const { Schema, model } = require("mongoose");

const schema = new Schema({
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
        },
    ],
});

module.exports = model("Cart", schema);
