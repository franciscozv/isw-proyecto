const mongoose = require("mongoose");

/*
Nombre: nombre de la base, que puede ser el nombre de la ciudad donde se encuentra, ejemplo: Base Concepción.
Ubicacion: para almacenar la dirección y otros datos relevantes. opcional
*/
const baseSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 100,
  },
  ubicacion: {
    type: String,
    required: false,
    minLength: 1,
    maxLength: 100,
  },
});

const Base = mongoose.model("Base", baseSchema);

module.exports = Base;