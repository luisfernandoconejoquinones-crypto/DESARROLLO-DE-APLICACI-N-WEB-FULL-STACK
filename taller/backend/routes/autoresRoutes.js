
let express = require("express");
let router = express.Router();

let AutoresController = require("../controllers/AutoresController");

let autoresController = new AutoresController();

router.post("/autores", autoresController.guardar);
router.get("/autores", autoresController.listar);
router.put("/autores/:id", autoresController.actualizar);
router.delete("/autores/:id", autoresController.eliminar);

module.exports = router;
