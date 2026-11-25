let express =require("express")
let router = express.Router();

let LibrosController=require("../controllers/LibrosController");



let librosController= new LibrosController();

router.post("/libros",librosController.guardar);
router.get("/libros",librosController.listar);
router.put("/libros/:id",librosController.actualizar);
router.delete("/libros/:id",librosController.eliminar)

module.exports=router;