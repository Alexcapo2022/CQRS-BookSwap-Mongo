const Posts = require('../models/posts')



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
    const allPosts = await Posts.aggregate([
      {
        $lookup: {
          from: 'comments', // Nombre de la colección de comentarios
          localField: 'comentarios', // Campo en la colección de Posts que almacena los IDs de los comentarios
          foreignField: '_id', // Campo en la colección de Comentarios que almacena el ID del comentario
          as: 'commentDetails' // Nombre del nuevo campo que contendrá los detalles de los comentarios
        }
      },
      {
        $addFields: {
          numComentarios: { $size: '$commentDetails' } // Contar el número de comentarios
        }
      },
      {
        $project: {
          commentDetails: 0 // Eliminar el campo de detalles de comentarios (si no se necesita en la respuesta)
        }
      }
    ]);

    res.status(200).json(allPosts);
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
      // Obtener la fecha actual en formato ISO8601
      const fechaActual = new Date().toISOString();
  
      // Agregar la hora de publicación al objeto del nuevo post
      const postWithHoraPublicacion = {
        ...req.body,
        horaPublicacion: fechaActual
      };
  
      const newPost = await Posts.create(postWithHoraPublicacion);
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
  exports.addLikeToPost = async (req, res) => {
    try {
      const { postId } = req.params; // Obtén el ID del post de los parámetros de la solicitud
  
      // Encuentra la publicación por su ID
      const post = await Posts.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: 'No se encontró el post con el ID proporcionado.' });
      }
  
      // Incrementa el número de likes
      post.like = (parseInt(post.like) || 0) + 1; // Incrementa el número de likes
  
      // Guarda la publicación actualizada
      const updatedPost = await post.save();
  
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar un like a la publicación' });
    }
  };