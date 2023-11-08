const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    correo: {
      type: String,
      required: true,
    },
    imagenPerfil: {
      type: String,
      default: 'url_imagen1.jpg',
    },
    like: {
      type: String,
      default: '0',
    },
    numComentarios: {
      type: Number,
      default: 0,
    },
    comentarios: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment' // Nombre del modelo de comentarios
    }],
    horaPublicacion: {
      type: String,
      default: new Date().toISOString(),
    },
}, { collection: 'Posts' ,// Define la colección en la base de datos
    versionKey: false}); // Evita que se incluya el campo __v en los resultados de la consulta
module.exports = mongoose.model('Posts', PostSchema);
