const mongoose = require("mongoose");

const solicitudSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cambioCuadrillaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cuadrilla",
        required: true,
    },
    requestDate: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: true,
    },
    requestStatus: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
        required: true,
    },
    resolveDate: {
        type: Date,
    },
});

const Solicitud = mongoose.model("Solicitud", solicitudSchema);

module.exports = Solicitud;
