const express = require("express");
const solicitudController = require("../controllers/solicitud.controller.js");
// Importa el middleware de autorización
const authoMiddleware = require("../middlewares/autho.middleware.js");
const router = express.Router();

// el usuario podra enviar una nueva solicitud
router.post("/", solicitudController.postRequest);
// el administrador podra ver todos las solicitudes
router.get("/", authoMiddleware.isAdmin, solicitudController.getRequests);
// el administrador podra ver una solicitud
router.get("/:id", authoMiddleware.isAdmin, solicitudController.getRequestById);
// el administrador podra aceptar una solicitud
router.put("/:id/aceptar", authoMiddleware.isAdmin, solicitudController.acceptRequest);

// el administrador podra rechazar una solicitud
router.put("/:id/rechazar", authoMiddleware.isAdmin, solicitudController.rejectRequest);
// el usuario podra ver el historial de sus solicitudes
router.get("/:id/solicitudes", solicitudController.getRequestsUser);

// lista de todas las solicitudes asociadas a un cadrilla especifica
router.get("/cuadrillas/:id/solicitudes", authoMiddleware.isAdmin, solicitudController.getByGroup);

// lista de solicitudes segun su estado


module.exports = router;
