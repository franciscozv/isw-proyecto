const express = require("express");
const cuadrillaController = require("../controllers/cuadrilla.controller.js");
const authoMiddleware = require("../middlewares/autho.middleware.js");

const router = express.Router();


router.post("/", authoMiddleware.isAdmin, cuadrillaController.createCuadrilla);

module.exports = router;
