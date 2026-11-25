
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ActualizarPrestamo() {

    const [usuario_id, setUsuarioId] = useState("");
    const [libro_id, setLibroId] = useState("");
    const [fecha_prestamo, setFechaPrestamo] = useState("");
    const [fecha_devolucion, setFechaDevolucion] = useState("");
    const [estado, setEstado] = useState("");

    const [usuario, setUsuario] = useState([]);
    const [libro, setLibro] = useState([]);

    let { id } = useParams();
    let Navigate = useNavigate();

    useEffect(() => {
        traerdatos();
    }, []);

    async function traerdatos() {

        let respuestaUsuarios = await fetch("http://localhost:3000/api/usuarios");
        let datosUsuarios = await respuestaUsuarios.json();
        setUsuario(datosUsuarios);

        let respuestaLibros = await fetch("http://localhost:3000/api/libros");
        let datosLibros = await respuestaLibros.json();
        setLibro(datosLibros);
    }

    async function actualizar() {

        let respuesta = await fetch("http://localhost:3000/api/prestamos/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario_id: usuario_id,
                libro_id: libro_id,
                fecha_prestamo: fecha_prestamo,
                fecha_devolucion: fecha_devolucion || null,
                estado: estado
            })
        });

        let res = await respuesta.json();

        alert(res.mensaje);

        Navigate("/prestamos");
    }

    return (
        <div>
            <h1>Actualizar Prestamo</h1>

            <div>
                <select onChange={(e) => setUsuarioId(e.target.value)}>
                    <option value="">Seleccione usuario</option>
                    {usuario.map((index) => (
                        <option key={index.id} value={index.id}>
                            {index.nombre}
                        </option>
                    ))}
                </select>

                <select onChange={(e) => setLibroId(e.target.value)}>
                    <option value="">Seleccione libro</option>
                    {libro.map((index) => (
                        <option key={index.id} value={index.id}>
                            {index.titulo}
                        </option>
                    ))}
                </select>

                <input type="date" onChange={(e) => setFechaPrestamo(e.target.value)}/>
                <input type="date" onChange={(e) => setFechaDevolucion(e.target.value)}/>
                <input type="text" placeholder="Escriba estado" onChange={(e) => setEstado(e.target.value)}/>

                <button onClick={actualizar}>Guardar</button>
            </div>
        </div>
    );
}
