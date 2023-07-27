// Requiriendo módulo para usar variables de entorno
require('dotenv').config();

// Requiriendo servidor y base de datos
const app = require('./server');
require('./database');

app.listen(app.get('port'), () => {
    console.log('Server on port ' + app.get('port'));
});
