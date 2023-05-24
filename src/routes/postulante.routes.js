const { Router } = require("express");
const {
    createPostulante,
    delelePostulante,
    updatePostulante,
    getALLPostulantes,
    getPostulante
} = require("../controllers/postulante.controller");
// Importa el middleware de autorización
const authoMiddleware = require("../middlewares/autho.middleware.js");

const router = Router();

router.post("/postulante", authoMiddleware.isAdmin, createPostulante);
router.delete("/postulante/delete/", authoMiddleware.isAdmin, delelePostulante);
router.put("/postulante/update", authoMiddleware.isAdmin, updatePostulante);
router.get("/postulante/getALL", authoMiddleware.isAdmin, getALLPostulantes);
router.get("/postulante/get", authoMiddleware.isAdmin, getPostulante);