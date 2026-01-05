const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const UserSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    foto: { type: String },
    password: { type: String, required: true },
    rol: { type: String, enum: ["admin", "user"], default: "user" },
    telefono: { type: String },
    direccion: { type: String },
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
    ciudad: { type: String },
    genero: { type: String, enum: ["masculino", "femenino", "otro"] },
    edad: { type: Number },
    mascotas: [{ type: Schema.Types.ObjectId, ref: "Pet" }],
    token_reset: { token: String, expire: Date },
},
    {
        timestamps: true,
        versionKey: false,
    }
);

UserSchema.plugin(mongoosePaginate);

module.exports = model("User", UserSchema);
