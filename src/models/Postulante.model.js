const mongoose = require("mongoose");


const postulanteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    nombre: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
    },
    rut: {
        type: String,
        required: true,
    },
    fechaNacimiento: {
        type: Date,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
    },
    correo: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 100,
    },
    telefono: {
        type: Number,
        required: true,
        minLength: 9,
        maxLength: 15,
    },

    capacitaciones: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
    },
    antecedentesSalud: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 100,
    },
});

const Postulante = mongoose.model("Postulante", postulanteSchema);

module.exports = Postulante;

