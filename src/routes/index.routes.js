"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");
// -------------------
// Importa el enrutador de solicitud
const solicitudRoutes = require("./solicitud.routes.js");
// -------------------
// Importa el enrutador de usuarios
const userRoutes = require("./user.routes.js");
// Importa el enrutador de autenticación
const authRoutes = require("./auth.routes.js");
// Importa el middleware de autenticación

const authMiddleware = require("../middlewares/authe.middleware.js");

// Crea una instancia del enrutador
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authMiddleware.verifyToken, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

// ---------------------

// Define las rutas para la solicitud de cambio de cuadrilla
// /api/cambio-cuadrilla
router.use("/cambio-cuadrilla", authMiddleware.verifyToken, solicitudRoutes);

// ----------------------
// Exporta el enrutador
module.exports = router;
