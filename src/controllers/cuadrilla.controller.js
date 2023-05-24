/* eslint-disable require-jsdoc */
  const Cuadrilla = require("../models/cuadrilla.model.js");

 // Requerimiento: Asignación de cuadrillas

const createCuadrilla = async (req, res) => {
  try {
    // Buscar la cuadrilla más reciente para obtener su número
    const cuadrillaMasReciente = await Cuadrilla.findOne().sort({ _id: -1 });

    let numeroCuadrilla = 1; // Número de la nueva cuadrilla por defecto

    if (cuadrillaMasReciente) {
      // Si hay cuadrillas, obtener el número de la más reciente y aumentarlo en 1
      numeroCuadrilla = cuadrillaMasReciente.numeroCuadrilla + 1;
    }

    const nombreCuadrilla = `Cuadrilla ${numeroCuadrilla}`;

    // Verificar si ya existe una cuadrilla con el mismo nombre
    const cuadrillaExistente = await Cuadrilla.findOne({ nombreCuadrilla });

    if (cuadrillaExistente) {
      return res
        .status(400)
        .json({ error: "Ya existe una cuadrilla con ese nombre" });
    }

    // Crear la nueva cuadrilla
    const nuevaCuadrilla = new Cuadrilla({ nombreCuadrilla, numeroCuadrilla });
    await nuevaCuadrilla.save();

    res.status(201).json(nuevaCuadrilla);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la cuadrilla" });
  }
};

const deleteCuadrilla = async (req, res) => {
    try {
        const cuadrillaId = req.params.cuadrillaId;

        // Verificar si la cuadrilla existe
        const cuadrilla = await Cuadrilla.findById(cuadrillaId);
        if (!cuadrilla) {
          return res.status(404).json({ error: "Cuadrilla no encontrada" });
        }
        // Eliminar la cuadrilla
        await Cuadrilla.findByIdAndRemove(cuadrillaId);

        res.status(200).json({ message: "Cuadrilla eliminada correctamente" });
      } catch (error) {
        res.status(500).json({ error: "Error al eliminar la cuadrilla" });
      }
};


module.exports = {
    createCuadrilla,
    deleteCuadrilla,
};
