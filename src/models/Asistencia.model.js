const { Schema, model, mongoose } = require("mongoose");

const AsistenciaSchema = new Schema({
  fecha: {
    type: String,
    required: [true, "La fecha es obligatoria,"],
    unique: true,
  },
  brigadistas: [
    {
      brigadista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brigadista",
        required: true,
      },
      estado: {
        type: String,
        enum: ["presente", "ausente"],
        required: true,
      },
    },
  ],
});

module.exports = model("Asistencia", AsistenciaSchema);
