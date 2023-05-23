const mongoose = require("mongoose");

const cuadrillaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
    },
});

const Cuadrilla = mongoose.model("Cuadrilla", cuadrillaSchema);

module.exports = Cuadrilla;
