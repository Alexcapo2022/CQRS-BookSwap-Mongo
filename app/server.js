// Importa los módulos y archivos necesarios
const express = require('express');
const app = express();
const test = require('./routes/test')
const bodyParser = require('body-parser');
const connectDB = require('./Database/connection')
const cors = require('cors'); // Importa el paquete cors


// // Importa tus controladores, rutas, configuraciones, etc.
// const commandHandlers = require('./controllers/commandHandlers');
// const queryHandlers = require('./controllers/queryHandlers');
// const eventHandlers = require('./controllers/eventHandlers');

// // Configuración de rutas, middlewares, etc.

// // Define las rutas para comandos, consultas y eventos
// app.post('/commands/publishBook', commandHandlers.publishBookCommand);
// app.post('/commands/likePost', commandHandlers.likePostCommand);
// app.post('/commands/addComment', commandHandlers.addCommentCommand);
// app.post('/commands/addFriend', commandHandlers.addFriendCommand);

// app.get('/queries/posts', queryHandlers.getPostsQuery);
// app.get('/queries/friends', queryHandlers.getFriendsQuery);
// app.get('/queries/bookDetails', queryHandlers.getBookDetailsQuery);

// // Manejo de eventos con un event store
// app.use('/events', eventHandlers);

// Configuración y arranque del servidor
connectDB();
// Habilitar CORS para todas las rutas
app.use(cors());

// Configurar el middleware Body Parser
app.use(bodyParser.json());

app.use("/api",test)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});