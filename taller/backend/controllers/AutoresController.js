

let conectar = require("../conexion/db");

class AutoresController {

    guardar = async (req, res) => {
        let { nombre, nacionalidad, fecha_nacimiento } = req.body;

        let respuesta = await conectar.query(
            "INSERT INTO autores (nombre, nacionalidad, fecha_nacimiento) VALUES (?, ?, ?)",
            [nombre, nacionalidad, fecha_nacimiento]
        );

        res.json({ mensaje: "autor guardado correctamente" });
    }

    listar = async (req, res) => {
        let [resultado] = await conectar.query(
            "SELECT * FROM autores"
        );

        res.json(resultado);
    }

    actualizar = async (req, res) => {
        let { id } = req.params;
        let { nombre, nacionalidad, fecha_nacimiento } = req.body;

        let respuesta = await conectar.query(
            "UPDATE autores SET nombre = ?, nacionalidad = ?, fecha_nacimiento = ? WHERE id = ?",
            [nombre, nacionalidad, fecha_nacimiento, id]
        );

        res.json({ mensaje: "autor actualizado correctamente" });
    }

    eliminar = async (req, res) => {
        let { id } = req.params;

        let respuesta = await conectar.query(
            "DELETE FROM autores WHERE id = ?",
            [id]
        );

        res.json({ mensaje: "autor eliminado correctamente" });
    }
}

module.exports = AutoresController;
