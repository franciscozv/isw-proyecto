const mongoose = require("mongoose");

const asistenciaSchema = new mongoose.Schema({
    brigadista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brigadista",
        required: true,
    },
    cuadrilla: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cuadrilla",
        required: true,
    },
    fecha: {
        type: Date,
        required: true
    },
})

const Asistencia = mongoose.model("Asistencia", asistenciaSchema);

module.exports = Asistencia