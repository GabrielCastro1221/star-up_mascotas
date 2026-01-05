const { Schema, model } = require("mongoose");

const LocationSchema = new Schema({
    gpsDevice: { type: Schema.Types.ObjectId, ref: "GPSDevice", required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    velocidad: { type: Number },
    precision: { type: Number },
    fecha: { type: Date, default: Date.now }
});

LocationSchema.index({ gpsDevice: 1, fecha: -1 });

module.exports = model("Location", LocationSchema);
