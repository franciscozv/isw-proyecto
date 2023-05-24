const Postulante = require("../models/Postulante.model");
const User = require("../models/user.model");


const createPostulante = async (req, res) => {
  try {
    const { nombre, rut } = req.body;

    // Verificar si ya existe un usuario con el rut
    const existingUser = await User.findOne({ rut });
    if (existingUser) {
      return res.status(400).send({ message: "Ya existe un usuario con el mismo rut" });
    }

    // Crear un nuevo usuario
    const user = new User({ name: nombre, rut, email: rut });
    await user.save();

    // Crear un nuevo postulante
    const postulante = new Postulante({ userId: user._id, nombre, rut });
    await postulante.save();

    res.status(201).send(postulante);
  } catch (error) {
    res.status(500).send({ message: "Error al crear el postulante" });
  }
};


const delelePostulante = async (req, res) => {
  try {
    const postulanteId = req.params.postulanteId;

    // Verificar si el postulante existe
    const postulante = await Postulante.findById(postulanteId);
    if (!postulante) {
      return res.status(404).send({ error: "Postulante no encontrado" });
    }

    // Eliminar el postulante
    await Postulante.findByIdAndRemove(postulanteId);

    // Eliminar el usuario asociado
    await User.findByIdAndRemove(postulante.userId);

    res.status(200).send({ message: "Postulante eliminado exitosamente" });
  } catch (error) {
    res.status(500).send({ error: "Error al eliminar el postulante" });
  }
};


const updatePostulante = (req, res) => {
  const { id } = req.params;

  Postulante.findOneAndUpdate(id, req.body, (error, Postulante) => {
    if (error) {
      return res.status(304).send({ message: "No se pudo actualizar el Postulante" });
    }

    if (!Postulante) {
      return res.status(404).send({ message: "No se encontró el Postulante" });}});

  return res.status(200).send({ message: "Postulante modificado" });
};


const getALLPostulantes = (req, res) => {

    Postulante.find({}, (error, Postulante) => {
    if (error) {
      return res.status(400).send({ message: "No se realizó la busqueda" });
    }
    if (!postulantes) {
      return res.status(204).send({ message: "No se han encontrado postulantes" });
    }

    return res.status(200).send(reportes);
  });
};


const getPostulante = async (req, res) => {
   
    try {
        const { postulanteId, userId, rut } = req.params;
    
        let postulante;
    
        if (postulanteId) {
          // Obtener por postulanteId
          postulante = await Postulante.findById(postulanteId);
        } else if (userId) {
          // Obtener por userId
          postulante = await Postulante.findOne({ userId: userId });
        } else if (rut) {
          // Obtener por rut
          postulante = await Postulante.findOne({ rut: rut });
        }
    
        if (!postulante) {
          return res.status(404).send({ error: 'Postulante no encontrado' });
        }
    
        res.status(200).send(postulante);
      } catch (error) {
        res.status(500).send({ error: 'Error al obtener el postulante' });
      }

}


module.exports = {
  createPostulante,
  delelePostulante,
  updatePostulante,
  getALLPostulantes,
  getPostulante
};
