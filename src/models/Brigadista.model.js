const mongoose = require("mongoose");


const brigadistaSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cuadrillaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cuadrilla",
        required: false,
    },
    nombre: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    rut: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    },
    direccion: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    correo: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 100
    },
    telefono: {
        type: Number,
        required: true,
        minLength: 9,
        maxLength: 15
    },
    telefonoFamiliares: {
        type: Number,
        required: true,
        minLength: 9,
        maxLength: 15
    },
    capacitaciones: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
    antecedentesSalud: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100
    },
});

const Brigadista = mongoose.model("Brigadista", brigadistaSchema);

module.exports = Brigadista;

