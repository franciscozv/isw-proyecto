const express = require("express");
const solicitudController = require("../controllers/solicitud.controller.js");
// Importa el middleware de autorización
const authoMiddleware = require("../middlewares/autho.middleware.js");
const router = express.Router();

// el usuario podra enviar una nueva solicitud
router.post("/", solicitudController.postRequest);
// el admin podra ver todos las solicitudes
router.get("/", authoMiddleware.isAdmin, solicitudController.getRequests);
// el reclutador podra ver una solicitud
router.get("/:id", authoMiddleware.isReclutador, solicitudController.getRequestById);
// el reclutador podra aceptar una solicitud
router.put("/:id/aceptar", authoMiddleware.isReclutador, solicitudController.acceptRequest);
// el reclutador podra rechazar una solicitud
router.put("/:id/rechazar", authoMiddleware.isReclutador, solicitudController.rejectRequest);
// el usuario podra ver el historial de sus solicitudes
router.get("/user/requests", solicitudController.getRequestsUser);
// lista de todas las solicitudes asociadas a un cadrilla especifica
router.get("/cuadrillas/:id/solicitudes", solicitudController.getRequestByGroup);

// lista de solicitudes segun su estado


module.exports = router;
