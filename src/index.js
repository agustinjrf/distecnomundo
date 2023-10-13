// Requiriendo módulo para usar variables de entorno
require('dotenv').config();

// Requiriendo servidor y base de datos
const app = require('./server');
const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.DISTECNOMUNDO_MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log('>>> Data base is connected');
    } catch (error) {
        console.log(error);
    }
}
connectDB();

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});
