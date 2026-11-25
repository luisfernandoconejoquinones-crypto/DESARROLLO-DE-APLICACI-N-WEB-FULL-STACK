
let express = require("express");
let router = express.Router();

let CategoriasController = require("../controllers/CategoriasController");

let categoriasController = new CategoriasController();

router.post("/categorias", categoriasController.guardar);
router.get("/categorias", categoriasController.listar);
router.put("/categorias/:id", categoriasController.actualizar);
router.delete("/categorias/:id", categoriasController.eliminar);

module.exports = router;
