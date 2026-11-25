
let conectar = require("../conexion/db");

class CategoriasController {

    guardar = async (req, res) => {
        let { nombre, descripcion } = req.body;

        let respuesta = await conectar.query(
            "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)",
            [nombre, descripcion]
        );

        res.json({ mensaje: "categoria guardada correctamente" });
    }

    listar = async (req, res) => {
        let [resultado] = await conectar.query(
            "SELECT * FROM categorias"
        );

        res.json(resultado);
    }

    actualizar = async (req, res) => {
        let { id } = req.params;
        let { nombre, descripcion } = req.body;

        let respuesta = await conectar.query(
            "UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?",
            [nombre, descripcion, id]
        );

        res.json({ mensaje: "categoria actualizada correctamente" });
    }

    eliminar = async (req, res) => {
        let { id } = req.params;

        let respuesta = await conectar.query(
            "DELETE FROM categorias WHERE id = ?",
            [id]
        );

        res.json({ mensaje: "categoria eliminada correctamente" });
    }
}

module.exports = CategoriasController;
