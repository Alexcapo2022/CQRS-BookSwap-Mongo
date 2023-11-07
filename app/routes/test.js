// Importar Express y el controlador
const express = require('express');
const router = express.Router();
const RutasController = require('../controllers/redsocial_controller');

// Definir las rutas
router.get('/data', RutasController.Test); // Consulta de prueba
router.get('/posts', RutasController.getAllPosts); // Obtener todos los posts
router.get('/posts1', RutasController.query); // Consulta personalizada

// Crear un nuevo post
router.post('/posts', RutasController.createPost);

// Actualizar un post existente
router.put('/posts/:id', RutasController.updatePost);

// Eliminar un post existente
router.delete('/posts/:id', RutasController.deletePost);

module.exports = router;
