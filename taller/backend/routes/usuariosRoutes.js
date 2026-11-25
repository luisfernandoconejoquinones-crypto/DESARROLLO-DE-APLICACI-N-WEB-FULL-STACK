let express = require("express");
let router = express.Router();
let UsuariosController = require("../controllers/UsuariosController");

let usuariosController = new UsuariosController();

router.post("/usuarios", usuariosController.guardar);
router.get("/usuarios", usuariosController.listar);
router.put("/usuarios/:id", usuariosController.actualizar);
router.delete("/usuarios/:id", usuariosController.eliminar);

module.exports = router;