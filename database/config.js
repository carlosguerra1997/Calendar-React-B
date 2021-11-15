
const mongoose = require('mongoose');

module.exports.dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB Online');
    }catch(err) {
        throw new Error('Error a la hora de inicializar la BBDD');
    }
}