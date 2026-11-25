
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ActualizarLibro() {

    const [titulo, setTitulo] = useState("");
    const [isbn, setIsbn] = useState("");
    const [anio_publicacion, setAnio] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [autor_id, setAutorId] = useState("");
    const [categoria_id, setCategoriaId] = useState("");

    const [autor, setAutor] = useState([]);
    const [categoria, setCategoria] = useState([]);

    let { id } = useParams();
    let Navigate = useNavigate();

    useEffect(() => {
        traerdatos();
    }, []);

    async function traerdatos() {

        let respuestaAutores = await fetch("http://localhost:3000/api/autores");
        let datosAutores = await respuestaAutores.json();
        setAutor(datosAutores);

        let respuestaCategorias = await fetch("http://localhost:3000/api/categorias");
        let datosCategorias = await respuestaCategorias.json();
        setCategoria(datosCategorias);
    }

    async function actualizar() {

        let respuesta = await fetch("http://localhost:3000/api/libros/" + id, {
            method: "PUT",
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

        let res = await respuesta.json();

        alert(res.mensaje);

        Navigate("/libros");
    }

    return (
        <div>
            <h1>Actualizar Libro</h1>

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

                <button onClick={actualizar}>Guardar</button>
            </div>
        </div>
    );
}
