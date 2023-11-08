const createCommentCommand = require('../commands/createCommentCommand');
const Comment = require('../models/Comment');
const Post = require('../models/posts');
const EventEmitter = require('events');
const getPostCommentsQuery = require('../queries/getPostsQuery');

const eventEmitter = new EventEmitter();

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

    // Emite el evento 'newCommentEvent' después de guardar el comentario
    eventEmitter.emit('newCommentEvent', { postId, savedComment });

    res.status(201).json({
      message: 'Comentario creado exitosamente',
      commentID: savedComment._id,
      commentText: savedComment.text,
      updatedPost,
      newCommentEvent
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear un comentario' });
  }
};


exports.getPostCommentsController = async (req, res) => {
  try {
    const { id: postId } = req.params;

    const postComments = await getPostCommentsQuery(postId);

    if (!postComments || !Array.isArray(postComments.comments)) {
      return res.status(404).json({ message: 'No se encontraron comentarios para el post proporcionado.' });
    }

    const commentsWithText = postComments.comments.map(comment => {
      return {
        commentID: comment.commentID,
        commentText: comment.commentText
      };
    });

    res.status(200).json({ comments: commentsWithText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los comentarios del post.' });
  }
};

exports.getPostCommentsController = async (req, res) => {
  try {
    const { id: postId } = req.params;

    const postComments = await getPostCommentsQuery(postId);

    if (!postComments || !Array.isArray(postComments.comments)) {
      return res.status(404).json({ message: 'No se encontraron comentarios para el post proporcionado.' });
    }

    const commentsWithText = postComments.comments.map(comment => {
      return {
        commentID: comment.commentID,
        commentText: comment.commentText
      };
    });

    res.status(200).json({ comments: commentsWithText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los comentarios del post.' });
  }
};


















