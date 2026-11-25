
let mysql = require("mysql2");

let conectar = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1063*Fc",
    database: "biblioteca",
    port: 3306
});

conectar.connect((error) => {
    if (error) {
        console.log("Error BD");
    }
    else {
        console.log("Conexion exitosa");
    }
});

module.exports = conectar.promise();
