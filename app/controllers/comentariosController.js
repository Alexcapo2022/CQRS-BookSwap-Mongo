const createCommentCommand = require('../commands/createCommentCommand');
const Comment = require('../models/Comment');
const Post = require('../models/posts');

exports.createComment = async (req, res) => {
  try {
    const { id: postId } = req.params; // Modifica para obtener el postId de los parámetros de la solicitud
    const commentDetails = req.body;

    if (!commentDetails.text || !commentDetails.userId) {
      return res.status(400).json({ message: 'Se requiere un texto y un ID de usuario para crear un comentario.' });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'No se encontró el post con el ID proporcionado.' });
    }

    const newCommentEvent = await createCommentCommand(postId, commentDetails);

    const newComment = new Comment({
      postId,
      text: commentDetails.text,
      userId: commentDetails.userId,
      // Otros campos o detalles del comentario
    });

    const savedComment = await newComment.save();

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comentarios: savedComment._id } },
      { new: true }
    );

    res.status(201).json({ message: 'Comentario creado exitosamente', updatedPost, newCommentEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear un comentario' });
  }
};