/* eslint-disable require-jsdoc */
/* eslint-disable no-console */
const Solicitud = require("../models/solicitud.model.js");
const Cuadrilla = require("../models/cuadrilla.model.js");
const Seleccionado = require("../models/seleccionado.model.js");

// const emailer = require("../config/mailer.js");

// el usuario podra enviar una solicitud
// obs: el usuario debe estar seleccionado para que ingrese la solicitud.

const postRequest = async (req, res) => {
    try {
        // Obtenemos el Id del usuario
        const { userId } = req;
        const { cambioCuadrillaId, description } = req.body;
        // Verificar si la cuadrilla especificada existe en la base de datos
        const cuadrilla = await Cuadrilla.findById(cambioCuadrillaId);
        if (!cuadrilla) {
            return res.status(400).json({ message: "La cuadrilla especificada no existe" });
        }
        // Verificar si ya existe una solicitud de cambio de cuadrilla pendiente para el usuario
        const existeSolicitudPendiente = await Solicitud.exists({
            userId: userId,
            requestStatus: "pending",
        });
        if (existeSolicitudPendiente) {
            return res.status(400).json({ message: "tienes una solicitud pendiente" });
        }
        // Verificar si el usuario ya se encuentra en la cuadrilla seleccionada
        // const seleccionado = await Seleccionado.findById(userId);
        // if (seleccionado.cuadrillaId == cambioCuadrillaId) {
        //     return res.status(400).send({ message: "ya te encuentras en esa cuadrilla" });
        // }
        // Crear la solicitud de cambio de grupo
        const solicitud = new Solicitud({
            userId,
            cambioCuadrillaId,
            description,
        });
        await solicitud.save();
        // emailer.sendMail(seleccionado);
        res.status(201).json({ message: "se ha enviado la solicitud" });
    } catch (error) {
        res.status(400).json({ message: "Ha ocurrido un error al procesar la solicitud" });
    }
};

// el administrador podra ver una solicitud
const getRequestById = async (req, res) => {
    try {
        // id de la solicitud
        const { id } = req.params;
        const solicitud = await Solicitud.findOne({ _id: id });
        // Manejo de caso de solicitud no encontrada
        if (!solicitud) {
            return res.status(404).json({ message: "Solicitud no encontrada" });
        }
        res.status(200).json(solicitud);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la solicitud de cambio de cuadrilla" });
    }
};

// el usuario podra ver el historial de sus solicitudes
const getRequestsUser = async (req, res) => {
    try {
        const { userId } = req;
        // Validación del ID de usuario
        const requests = await Solicitud.find({ userId: userId });

         // Verificar si existen solicitudes asociadas al usuario
        if (!requests) {
            return res.status(204).json({ message: "No existen solicitudes asociadas al usuario" });
        }
        res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las solicitudes del usuario" });
    }
};

// el reclutador podra ver todos las solicitudes
const getRequests = async (req, res) => {
    try {
        const solicitudes = await Solicitud.find();
        res.status(200).json(solicitudes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las solicitudes" });
    }
};

// el reclutador podra aceptar una solicitud
const acceptRequest = async (req, res) => {
    try {
        const { id } = req.params;

        // Verificar si la solicitud existe
        const solicitud = await Solicitud.findById(id);
        if (!solicitud) {
            return res.status(404).json({ message: "La solicitud no fue encontrada" });
        }

        // Verificar si la solicitud ya ha sido aprobada o rechazada
        if (solicitud.requestStatus !== "pending") {
            return res.status(400).json({ message: "ya ha sido aprobada o rechazada" });
        }
        // Actualizar la solicitud a "approved"
        solicitud.requestStatus = "approved";
        solicitud.resolveDate = new Date();
        await solicitud.save();

        // Actualizar el documento de "Seleccionado" con la nueva cuadrilla
        const seleccionado = await Seleccionado.findOne({ _id: solicitud.userId });
        if (seleccionado) {
            seleccionado.cuadrillaId = solicitud.cambioCuadrillaId;
            await seleccionado.save();
        } else {
            // Manejar el caso si no se encuentra el documento "Seleccionado"
            return res.status(404).json({ message: "El usuario seleccionado no fue encontrado" });
        }
        res.json(solicitud);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al aceptar la solicitud de cambio de cuadrilla" });
    }
};

// el reclutador podra rechazar una solicitud
const rejectRequest = async (req, res) => {
    try {
        // obtener el ID de la solicitud desde los parametros de la peticion
        const { id } = req.params;
        // obtener la solicitud de cambio de grupo correspondiente
        const solicitud = await Solicitud.findById(id);
        // Verificar si la solicitud ya ha sido aprobada o rechazada
        if (solicitud.requestStatus !== "pending") {
            return res.status(400).json({ message: "ya ha sido aprobada o rechazada" });
        }
        solicitud.requestStatus = "rejected";
        solicitud.resolveDate = new Date();
        await solicitud.save();
        res.status(200).json({ message: "la solicitud ha sido procesada exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al rechazar la solicitud de cambio de grupo" });
    }
};

// lista de todas las solicitudes asociadas a un cadrilla especifica
const getRequestByGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const solicitudes = await Solicitud.find({ cambioCuadrillaId: id });
        if (!solicitudes) {
            res.status(404).send({ message: "la cuadrilla no tiene solicitudes" });
        }
        res.status(200).json(solicitudes);
    } catch (error) {
        res.status(500).json({ message: "Error al rechazar la solicitud de cambio de grupo" });
    }
};

module.exports = {
    postRequest,
    getRequestById,
    getRequests,
    rejectRequest,
    acceptRequest,
    getRequestsUser,
    getRequestByGroup,
};
