const Posts = require('../models/posts');

const createCommentEventHandler = async (commentEvent) => {
  try {
    // Obteniendo datos del evento de comentario
    const { postId, comment } = commentEvent.data;

    // Actualizar el post (identificado por postId) con el nuevo comentario
    const post = await Posts.findByIdAndUpdate(
      postId,
      { $push: { comentarios: comment } }, // Agregar el comentario al array de comentarios
      { new: true }
    );

    console.log('Evento de comentario creado:', commentEvent);
    console.log('Post actualizado con comentario:', post);
  } catch (error) {
    console.error('Error en el manejo del evento:', error);
    // Manejo de errores si la actualización del comentario falla
  }
};

module.exports = createCommentEventHandler;
  