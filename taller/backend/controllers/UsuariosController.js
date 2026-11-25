let conectar = require("../conexion/db");

class UsuariosController {

    guardar = async (req, res) => {
        let { nombre, correo, telefono, estado } = req.body;

        let respuesta = await conectar.query(
            "INSERT INTO usuarios (nombre, correo, telefono, estado) VALUES (?, ?, ?, ?)",
            [nombre, correo, telefono, estado]
        );

        res.json({ mensaje: "usuario guardado correctamente" });
    }

    listar = async (req, res) => {
        let [resultado] = await conectar.query("SELECT * FROM usuarios");
        res.json(resultado);
    }

    actualizar = async (req, res) => {
        let { id } = req.params;
        let { nombre, correo, telefono, estado } = req.body;

        let respuesta = await conectar.query(
            "UPDATE usuarios SET nombre = ?, correo = ?, telefono = ?, estado = ? WHERE id = ?",
            [nombre, correo, telefono, estado, id]
        );

        res.json({ mensaje: "usuario actualizado correctamente" });
    }

    eliminar = async (req, res) => {
        let { id } = req.params;

        let respuesta = await conectar.query("DELETE FROM usuarios WHERE id = ?", [id]);

        res.json({ mensaje: "usuario eliminado correctamente" });
    }
}

module.exports = UsuariosController;