const createCommentCommand = async (postId, commentDetails) => {
  try {
    // Lógica para agregar un comentario al post con el postId proporcionado
    const comment = {
      userId: commentDetails.userId,
      text: commentDetails.text,
      // Otros detalles del comentario
    };

    return {
      type: 'CommentCreated',
      data: { postId, comment },
    };
  } catch (error) {
    console.error('Error al procesar el comando para agregar comentario:', error);
    throw new Error('Error al procesar el comando para agregar comentario');
  }
};

module.exports = createCommentCommand;
