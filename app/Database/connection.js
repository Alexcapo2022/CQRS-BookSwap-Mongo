const mongoose = require('mongoose');

const password = 'euler2020';
const dbName = 'BookSwap';
const uri = `mongodb+srv://20192659:${password}@cluster0.d9h4rdp.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;