const { Schema, model } = require("mongoose");

const TreesSchema = new Schema({
  nombre: { type: String, required: true },
  caracteristicas: { type: String, required: true },
  ubicacion: {
    latitud: { type: Number, required: true },
    longitud: { type: Number, required: true }
  },
  fecha: { type: Date, default: Date.now },
  imagen: { type: File, required: true },
});

module.exports = model("Trees", TreesSchema);
