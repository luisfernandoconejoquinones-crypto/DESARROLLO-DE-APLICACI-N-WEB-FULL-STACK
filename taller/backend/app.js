
const express = require("express");
const cors = require("cors");

const usuariosRoutes = require("./routes/usuariosRoutes");
const autoresRoutes = require("./routes/autoresRoutes");
const categoriasRoutes = require("./routes/categoriasRoutes");
const librosRoutes =require("./routes/librosRoutes");
const prestamosRouter = require("./routes/prestamosRoutes");

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

// Rutas 
app.use("/api", usuariosRoutes);
app.use("/api", autoresRoutes);
app.use("/api",categoriasRoutes);
app.use("/api",librosRoutes);
app.use("/api",prestamosRouter)

app.listen(PORT, () => {
    console.log("Servidor conectado en el puerto " + PORT);
});
