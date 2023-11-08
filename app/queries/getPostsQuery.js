const posts = require('../models/posts');

const getPostCommentsQuery = async (postId) => {
  try {
    const post = await posts.findById(postId).populate('comentarios');

    if (!post) {
      return { comments: [] };
    }

    const commentsFormatted = post.comentarios.map(comment => {
      return {
        commentID: comment._id,
        commentText: comment.text
      };
    });

    return { comments: commentsFormatted };
  } catch (error) {
    throw error;
  }
};

module.exports = getPostCommentsQuery;

