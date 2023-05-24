const mongoose = require("mongoose");

/* Nombre: Cuadrilla + número
Ej: Cuadrilla 1, Cuadrilla 2, etc. */
const cuadrillaSchema = new mongoose.Schema({

  nombreCuadrilla: {
    type: String,
    require: true,
    minLength: 1,
    maxLength: 14,
  },
  numeroCuadrilla: {
    type: Number,
    require: true,
  },
  jefeCuadrilla: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brigadista",
    required: false,
  },
  operadorMotobomba: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brigadista",
    required: false,
  },
  operadorMotosierra: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brigadista",
    required: false,
  },
  combatiente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brigadista",
    required: false,
  },
  encargadoPrimerosAuxilios: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brigadista",
    required: false,
  },
  asistentePrimerosAuxilios: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brigadista",
    required: false,
  },
  encargadoHerramientas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brigadista",
    required: false,
  },
  ayudanteHerramientas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brigadista",
    required: false,
  },
  radioperador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brigadista",
    required: false,
  },
});

const Cuadrilla = mongoose.model("Cuadrilla", cuadrillaSchema);

module.exports = Cuadrilla;
