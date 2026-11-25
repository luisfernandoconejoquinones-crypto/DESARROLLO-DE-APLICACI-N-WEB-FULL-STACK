
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TablaPrestamos() {

    const [usuario_id, setUsuarioId] = useState("");
    const [libro_id, setLibroId] = useState("");
    const [fecha_prestamo, setFechaPrestamo] = useState("");
    const [fecha_devolucion, setFechaDevolucion] = useState("");
    const [estado, setEstado] = useState("");

    const [prestamo, setPrestamo] = useState([]);
    const [usuario, setUsuario] = useState([]);
    const [libro, setLibro] = useState([]);

    const Navigate = useNavigate();

    useEffect(() => {
        traerdatos();
    }, []);

    async function traerdatos() {

        let respuesta = await fetch("http://localhost:3000/api/prestamos");
        let datos = await respuesta.json();
        setPrestamo(datos);

        let respuestaUsuarios = await fetch("http://localhost:3000/api/usuarios");
        let datosUsuarios = await respuestaUsuarios.json();
        setUsuario(datosUsuarios);

        let respuestaLibros = await fetch("http://localhost:3000/api/libros");
        let datosLibros = await respuestaLibros.json();
        setLibro(datosLibros);
    }

    async function guardar() {

        let respuesta = await fetch("http://localhost:3000/api/prestamos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario_id: usuario_id,
                libro_id: libro_id,
                fecha_prestamo: fecha_prestamo,
                fecha_devolucion: fecha_devolucion,
                estado: estado
            })
        });

        let datos = await respuesta.json();

        alert(datos.mensaje);

        traerdatos();
    }

    function llevaractualizar(id) {
        Navigate("/actualizarprestamo/" + id);
    }

    async function eliminarPrestamos(id) {

        let respuesta = await fetch("http://localhost:3000/api/prestamos/" + id, {
            method: "DELETE"
        });

        let mjs = await respuesta.json();

        alert(mjs.mensaje);

        traerdatos();
    }

    return (
        <div>
            <h1>Gestion Prestamos</h1>

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

                <button onClick={guardar}>Guardar</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Usuario ID</th>
                        <th>Libro ID</th>
                        <th>Fecha Prestamo</th>
                        <th>Fecha Devolucion</th>
                        <th>Estado</th>
                        <th>Eliminar</th>
                        <th>Actualizar</th>
                    </tr>
                </thead>

                <tbody>
                    {prestamo.map((index) => (
                        <tr key={index.id}>
                            <td>{index.id}</td>
                            <td>{index.usuario_id}</td>
                            <td>{index.libro_id}</td>
                            <td>{index.fecha_prestamo}</td>
                            <td>{index.fecha_devolucion}</td>
                            <td>{index.estado}</td>

                            <td>
                                <button onClick={() => eliminarPrestamos(index.id)}>Eliminar</button>
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
