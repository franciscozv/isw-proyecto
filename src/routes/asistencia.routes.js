const { Router } = require("express");
const {
    getAsistencias,
    getAsistenciaByFecha,
    addAsistencia,
} = require("../controllers/asistencia.controller");
// Importa el middleware de autorización
const authoMiddleware = require("../middlewares/autho.middleware.js");


const router = Router();

// Rutas
router.get("/", authoMiddleware.isAdmin, getAsistencias);
router.get("/:fecha", authoMiddleware.isAdmin, getAsistenciaByFecha);
router.post("/", authoMiddleware.isAdmin, addAsistencia);

module.exports = router;
