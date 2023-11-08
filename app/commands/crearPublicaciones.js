const Posts = require('../models/posts');

async function crearPublicacionCommand(data) {
    try {
        const newPost = await Posts.create(data);
        return newPost;
    } catch (error) {
        throw new Error('Error al crear la publicación');
    }
}

module.exports = { crearPublicacionCommand };