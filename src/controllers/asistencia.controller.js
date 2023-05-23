/* eslint-disable */
const { response, request } = require("express");
const Asistencia = require("../models/Asistencia.model");

const getAsistencias = async (req = request, res = response) => {
    try {
        // find all asistencias
        const asistencias = await Asistencia.find({});
        res.json({ asistencias });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

const getAsistenciaByFecha = async (req = request, res = response) => {
    const { fecha } = req.params;

    try {
        const asistencia = await Asistencia.findOne({ fecha });
    
        if (!asistencia) {
            return res.status(404).json({ message: "Asistencia no encontrada." });
        }
    
        res.json({ asistencia });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

const addAsistencia = async (req = request, res = response) => {
    const { fecha, brigadistas } = req.body;
    const data = { fecha, brigadistas };

    try {
        const asistenciaDB = await Asistencia.findOne({ fecha });

        if (asistenciaDB) {
            return res.status(401).json({
                message: `La asistencia para la fecha ${ fecha } ya existe.`
            });
        }

        const saveAsistencia = new Asistencia(data);

        // Guardar asistencia
        await saveAsistencia.save();
        res.json({ asistencia: saveAsistencia });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
    }
};

module.exports = {
    getAsistencias,
    getAsistenciaByFecha,
    addAsistencia,
};
