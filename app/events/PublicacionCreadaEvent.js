// events/PublicacionCreadaEvent.js
async function PublicacionCreadaEvent(newPost) {
    try {
        // Registra el evento o realiza acciones específicas relacionadas con una publicación creada
        console.log('Evento de Publicacion Creada:', newPost);
    } catch (error) {
        console.error('Error al registrar el evento de publicación creada');
    }
}

module.exports = { PublicacionCreadaEvent };
