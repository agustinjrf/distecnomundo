const mongoose = require('mongoose');

//const MONGODB_URI = process.env.DISTECNOMUNDO_MONGODB_URI;MjQLycmuu1t0fDQb
const MONGODB_URI =
    'mongodb+srv://Dist:MjQLycmuu1t0fDQb@tecno.onjv3om.mongodb.net/?retryWrites=true&w=majority';

const db = mongoose.connection;

//Conectando base de datos
mongoose
    .connect(MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .catch((err) => console.log(err));

db.once('open', (_) => {
    console.log('Database is connected to', MONGODB_URI);
});
