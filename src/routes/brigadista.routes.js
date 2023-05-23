const { Router } = require("express");
const { updateCuadrillaBrigadista } = require("../controllers/brigadista.controller");
// Importa el middleware de autorización
const authoMiddleware = require("../middlewares/autho.middleware.js");


const router = Router();

// Rutas
router.put("/:id", authoMiddleware.isAdmin, updateCuadrillaBrigadista);

module.exports = router;
