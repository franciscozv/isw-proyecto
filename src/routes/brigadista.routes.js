const { Router } = require("express");
const brigadistaController = require("../controllers/brigadista.controller");
// Importa el middleware de autorización
const authoMiddleware = require("../middlewares/autho.middleware.js");


const router = Router();

// Rutas
router.put("/:id", authoMiddleware.isAdmin, brigadistaController.updateCuadrillaBrigadista);
router.post("/", authoMiddleware.isAdmin, brigadistaController.createBrigadista);

module.exports = router;
