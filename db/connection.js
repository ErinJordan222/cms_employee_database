const mysqli = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees'
});

// connection.connect(function (err) {
//     if (err) throw err;
// });

module.exports = connection;

