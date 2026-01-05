const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const PetSchema = new Schema({
    nombre_mascota: { type: String, required: true },
    especie: { type: String },
    raza: { type: String },
    edad: { type: Number },
    foto: { type: String },
    sexo: { type: String, enum: ["macho", "hembra"] },
    usuario: { type: Schema.Types.ObjectId, ref: "User", required: true },
    gps: { type: Schema.Types.ObjectId, ref: "GPSDevice", default: null },
},
    {
        timestamps: true,
        versionKey: false,
    }
);

PetSchema.plugin(mongoosePaginate);

module.exports = model("Pet", PetSchema);
