/* eslint-disable */
const { response, request } = require('express');

const Brigadista = require('../models/Brigadista.model');

const updateCuadrillaBrigadista = async (req = request, res = response) => {
    const { id } = req.params;
    const { cuadrillaId } = req.body;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'El ID no es un ObjectId válido.' });
    }

    if (!cuadrillaId) return res.status(400).json({ message: 'Campo cuadrillaId requerido.' });

    try {
        const updateBrigadista = await Brigadista.findByIdAndUpdate(id, { cuadrillaId }, { new: true });

        if (!updateBrigadista) {
            return res.status(404).json({ message: `El brigadista con id ${ id } no existe.` });
        }

        res.json({ brigadista: updateBrigadista });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error en el servidor.' });
    }
};

module.exports = {
    updateCuadrillaBrigadista,
};
