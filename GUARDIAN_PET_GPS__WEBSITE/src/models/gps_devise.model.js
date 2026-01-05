const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const GPSDeviceSchema = new Schema(
    {
        deviceId: { type: String, required: true, unique: true, trim: true },
        nombre: { type: String, trim: true, default: "Guardian Pet Dispositivo GPS" },
        activo: { type: Boolean, default: true },
        mascota: { type: Schema.Types.ObjectId, ref: "Pet", default: null },
        ultimaUbicacion: {
            lat: { type: Number, default: null },
            lng: { type: Number, default: null },
            fecha: { type: Date, default: null }
        },
        historialUbicaciones: [
            {
                lat: { type: Number }, lng: { type: Number }, fecha: { type: Date, default: Date.now }
            }
        ],
        estadoConexion: { type: String, enum: ["online", "offline"], default: "offline" },
        asignadoAUsuario: { type: Schema.Types.ObjectId, ref: "User", default: null }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

GPSDeviceSchema.index({ deviceId: true });
GPSDeviceSchema.index({ activo: 1 });
GPSDeviceSchema.index({ mascota: 1 });
GPSDeviceSchema.index({ estadoConexion: 1 });
GPSDeviceSchema.plugin(mongoosePaginate);

module.exports = model("GPSDevice", GPSDeviceSchema);
