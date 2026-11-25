
let conectar = require("../conexion/db");

class LibrosController {

    guardar = async (req, res) => {
        let { titulo, isbn, anio_publicacion, cantidad, autor_id, categoria_id } = req.body;

        let respuesta = await conectar.query(
            "INSERT INTO libros (titulo, isbn, anio_publicacion, cantidad, autor_id, categoria_id) VALUES (?, ?, ?, ?, ?, ?)",
            [titulo, isbn, anio_publicacion, cantidad, autor_id, categoria_id]
        );

        res.json({ mensaje: "libro guardado correctamente" });
    }
  listar = async (req, res) => {
    let [resultado] = await conectar.query(
        "SELECT libros.*, autores.nombre AS nombre_autor, categorias.nombre AS nombre_categoria FROM libros INNER JOIN autores ON libros.autor_id = autores.id INNER JOIN categorias ON libros.categoria_id = categorias.id"
    );

    res.json(resultado);
}

    actualizar = async (req, res) => {
        let { id } = req.params;
        let { titulo, isbn, anio_publicacion, cantidad, autor_id, categoria_id } = req.body;

        let respuesta = await conectar.query(
            "UPDATE libros SET titulo = ?, isbn = ?, anio_publicacion = ?, cantidad = ?, autor_id = ?, categoria_id = ? WHERE id = ?",
            [titulo, isbn, anio_publicacion, cantidad, autor_id, categoria_id, id]
        );

        res.json({ mensaje: "libro actualizado correctamente" });
    }

    eliminar = async (req, res) => {
        let { id } = req.params;

        let respuesta = await conectar.query(
            "DELETE FROM libros WHERE id = ?",
            [id]
        );

        res.json({ mensaje: "libro eliminado correctamente" });
    }
}

module.exports = LibrosController;
