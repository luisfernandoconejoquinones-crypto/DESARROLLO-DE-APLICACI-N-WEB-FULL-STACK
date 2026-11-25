let express = require("express");
let router=express.Router();


let PrestamosController = require("../controllers/PrestamosController");


let prestamosController = new PrestamosController();

router.post("/prestamos",prestamosController.guardar);
router.get("/prestamos",prestamosController.listar);
router.put("/prestamos/:id",prestamosController.actualizar);
router.delete("/prestamos/:id",prestamosController.eliminar);

module.exports = router;