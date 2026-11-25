
let conectar = require("../conexion/db");

class PrestamosController {

    guardar = async (req, res) => {
        let { usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado } = req.body;

        let respuesta = await conectar.query(
            "INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado) VALUES (?, ?, ?, ?, ?)",
            [usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado]
        );

        res.json({ mensaje: "prestamo guardado correctamente" });
    }

    listar = async (req, res) => {
        let [resultado] = await conectar.query(
            "SELECT * FROM prestamos"
        );

        res.json(resultado);
    }

    actualizar = async (req, res) => {
        let { id } = req.params;
        let { usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado } = req.body;

        let respuesta = await conectar.query(
            "UPDATE prestamos SET usuario_id = ?, libro_id = ?, fecha_prestamo = ?, fecha_devolucion = ?, estado = ? WHERE id = ?",
            [usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado, id]
        );

        res.json({ mensaje: "prestamo actualizado correctamente" });
    }

    eliminar = async (req, res) => {
        let { id } = req.params;

        let respuesta = await conectar.query(
            "DELETE FROM prestamos WHERE id = ?",
            [id]
        );

        res.json({ mensaje: "prestamo eliminado correctamente" });
    }
}

module.exports = PrestamosController;
