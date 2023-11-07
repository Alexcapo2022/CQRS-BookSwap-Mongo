const Posts = require('../models/posts')
const mongoose = require('mongoose')


exports.Test = async (req, res) => {
    try {
        res.status(200).json({
            "arrayColores": [{
                "rojo": "#f00",
                "verde": "#0f0",
                "azul": "#00f",
                "cyan": "#0ff",
                "magenta": "#f0f",
                "amarillo": "#ff0",
                "negro": "#000"
            }
            ]
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener usuarios' });
    }
};

exports.getAllPosts = async (req, res) => {
    try {
      const allPosts = await Posts.find({}); // Esta línea buscará todos los documentos de la colección Posts
      res.status(200).json(allPosts); // Devuelve los posts recuperados como una respuesta JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener publicaciones' });
    }
  };

  exports.query = async (req, res) => {
    try {
      const Posts1 = await Posts.find({ nombre: "Alexander Cruz" });
      res.status(200).json(Posts1);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error en la consulta' });
    }
  }
  exports.createPost = async (req, res) => {
    try {
      const newPost = await Posts.create(req.body);
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al crear un post' });
    }
  };
  exports.updatePost = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedPost = await Posts.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al actualizar el post' });
    }
  };
  exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
      await Posts.findByIdAndRemove(id);
      res.status(200).json({ mensaje: 'Post eliminado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensaje: 'Error al eliminar el post' });
    }
  };