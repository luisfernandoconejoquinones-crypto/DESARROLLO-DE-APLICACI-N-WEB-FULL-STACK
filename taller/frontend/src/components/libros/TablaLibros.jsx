
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TablaLibros() {

    const [titulo, setTitulo] = useState("");
    const [isbn, setIsbn] = useState("");
    const [anio_publicacion, setAnio] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [autor_id, setAutorId] = useState("");
    const [categoria_id, setCategoriaId] = useState("");

    const [libro, setLibro] = useState([]);
    const [autor, setAutor] = useState([]);
    const [categoria, setCategoria] = useState([]);

    const Navigate = useNavigate();

    useEffect(() => {
        traerdatos();
    }, []);

    async function traerdatos() {

        let respuesta = await fetch("http://localhost:3000/api/libros");
        let datos = await respuesta.json();
        setLibro(datos);

        let respuestaAutores = await fetch("http://localhost:3000/api/autores");
        let datosAutores = await respuestaAutores.json();
        setAutor(datosAutores);

        let respuestaCategorias = await fetch("http://localhost:3000/api/categorias");
        let datosCategorias = await respuestaCategorias.json();
        setCategoria(datosCategorias);
    }

    async function guardar() {

        let respuesta = await fetch("http://localhost:3000/api/libros", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo: titulo,
                isbn: isbn,
                anio_publicacion: anio_publicacion,
                cantidad: cantidad,
                autor_id: autor_id,
                categoria_id: categoria_id
            })
        });

        let datos = await respuesta.json();

        alert(datos.mensaje);

        traerdatos();
    }

    function llevaractualizar(id) {
        Navigate("/actualizarlibro/" + id);
    }

    async function eliminarLibros(id) {

        let respuesta = await fetch("http://localhost:3000/api/libros/" + id, {
            method: "DELETE"
        });

        let mjs = await respuesta.json();

        alert(mjs.mensaje);

        traerdatos();
    }

    return (
        <div>
            <h1>Gestion Libros</h1>

            <div>
                <input type="text" placeholder="Escriba titulo" onChange={(e) => setTitulo(e.target.value)}/>
                <input type="text" placeholder="Escriba ISBN" onChange={(e) => setIsbn(e.target.value)}/>
                <input type="number" placeholder="Año publicacion" onChange={(e) => setAnio(e.target.value)}/>
                <input type="number" placeholder="Cantidad" onChange={(e) => setCantidad(e.target.value)}/>

                <select onChange={(e) => setAutorId(e.target.value)}>
                    <option value="">Seleccione autor</option>
                    {autor.map((index) => (
                        <option key={index.id} value={index.id}>
                            {index.nombre}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setCategoriaId(e.target.value)}>
                    <option value="">Seleccione categoria</option>
                    {categoria.map((index) => (
                        <option key={index.id} value={index.id}>
                            {index.nombre}
                        </option>
                    ))}
                </select>

                <button onClick={guardar}>Guardar</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titulo</th>
                        <th>ISBN</th>
                        <th>Año Publicacion</th>
                        <th>Cantidad</th>
                        <th>Autor ID</th>
                        <th>Categoria ID</th>
                        <th>Eliminar</th>
                        <th>Actualizar</th>
                    </tr>
                </thead>

                <tbody>
                    {libro.map((index) => (
                        <tr key={index.id}>
                            <td>{index.id}</td>
                            <td>{index.titulo}</td>
                            <td>{index.isbn}</td>
                            <td>{index.anio_publicacion}</td>
                            <td>{index.cantidad}</td>
                            <td>{index.autor_id}</td>
                            <td>{index.categoria_id}</td>

                            <td>
                                <button onClick={() => eliminarLibros(index.id)}>Eliminar</button>
                            </td>

                            <td>
                                <button onClick={() => llevaractualizar(index.id)}>Actualizar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
