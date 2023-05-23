const mongoose = require("mongoose");


const seleccionadoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cuadrillaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cuadrilla",
        required: true,
    },
});

const Seleccionado = mongoose.model("Seleccionado", seleccionadoSchema);

module.exports = Seleccionado;

