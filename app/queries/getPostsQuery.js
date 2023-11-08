// queries/getPostsQuery.js
const Post = require('../models/posts'); // Asegúrate de importar tu modelo de publicaciones

const getPostCommentsQuery = async (postId) => {
  try {
    // Encuentra la publicación por su ID
    const post = await Post.findById(postId);

    if (!post) {
      return null; // Manejo si la publicación no existe
    }

    const { comentarios, like, numComentarios } = post; // Obtiene comentarios, likes y cantidad de comentarios

    return {
      comentarios,
      like,
      numComentarios
    };
  } catch (error) {
    throw error; // Manejo de errores
  }
};

module.exports = getPostCommentsQuery;