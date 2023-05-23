const mongoose = require("mongoose");


const seleccionadoSchema = new mongoose.Schema({
    // otro datos del brigadista
    cuadrillaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cuadrilla",
    },
});

const Seleccionado = mongoose.model("Seleccionado", seleccionadoSchema);

module.exports = Seleccionado;

