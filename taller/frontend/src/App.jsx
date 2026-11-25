
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TablaUsuarios from "./components/usuarios/TablaUsuarios";
import ActualizarUsuario from "./components/usuarios/ActualizarUsuario";

import TablaAutores from "./components/autores/TablaAutores";
import ActualizarAutor from "./components/autores/ActualizarAutor";

import TablaCategorias from "./components/categorias/TablaCategorias";
import ActualizarCategoria from "./components/categorias/ActualizarCategoria";

import TablaLibros from "./components/libros/TablaLibros";
import ActualizarLibro from "./components/libros/ActualizarLibro";

import TablaPrestamos from "./components/prestamos/TablaPrestamos";
import ActualizarPrestamo from "./components/prestamos/ActualizarPrestamo";

function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>

                    <Route path="/" element={<TablaUsuarios></TablaUsuarios>}></Route>

                    <Route path="/usuarios" element={<TablaUsuarios></TablaUsuarios>}></Route>
                    <Route path="/actualizarusuario/:id" element={<ActualizarUsuario></ActualizarUsuario>}></Route>

                    <Route path="/autores" element={<TablaAutores></TablaAutores>}></Route>
                    <Route path="/actualizarautor/:id" element={<ActualizarAutor></ActualizarAutor>}></Route>

                    <Route path="/categorias" element={<TablaCategorias></TablaCategorias>}></Route>
                    <Route path="/actualizarcategoria/:id" element={<ActualizarCategoria></ActualizarCategoria>}></Route>

                    <Route path="/libros" element={<TablaLibros></TablaLibros>}></Route>
                    <Route path="/actualizarlibro/:id" element={<ActualizarLibro></ActualizarLibro>}></Route>

                    <Route path="/prestamos" element={<TablaPrestamos></TablaPrestamos>}></Route>
                    <Route path="/actualizarprestamo/:id" element={<ActualizarPrestamo></ActualizarPrestamo>}></Route>

                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
