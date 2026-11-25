
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TablaAutores() {

    const [nombre, setNombre] = useState("");
    const [nacionalidad, setNacionalidad] = useState("");
    const [fecha_nacimiento, setFechaNacimiento] = useState("");

    const [autor, setAutor] = useState([]);

    const Navigate = useNavigate();

    useEffect(() => {
        traerdatos();
    }, []);

    async function traerdatos() {
        let respuesta = await fetch("http://localhost:3000/api/autores");
        let datos = await respuesta.json();

        console.log(datos);
        setAutor(datos);
    }

    async function guardar() {
        let respuesta = await fetch("http://localhost:3000/api/autores", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                nacionalidad: nacionalidad,
                fecha_nacimiento: fecha_nacimiento
            })
        });

        let datos = await respuesta.json();

        alert(datos.mensaje);

        traerdatos();
    }

    function llevaractualizar(id) {
        Navigate("/actualizarautor/" + id);
    }

    async function eliminarAutores(id) {
        let respuesta = await fetch("http://localhost:3000/api/autores/" + id, {
            method: "DELETE"
        });

        let mjs = await respuesta.json();

        alert(mjs.mensaje);

        traerdatos();
    }

    return (
        <div>
            <h1>Gestion Autores</h1>

            <div>
                <input type="text" placeholder="Escriba nombre" onChange={(e) => setNombre(e.target.value)}/>
                <input type="text" placeholder="Escriba nacionalidad" onChange={(e) => setNacionalidad(e.target.value)}/>
                <input type="date" onChange={(e) => setFechaNacimiento(e.target.value)}/>

                <button onClick={guardar}>Guardar</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Nacionalidad</th>
                        <th>Fecha Nacimiento</th>
                        <th>Eliminar</th>
                        <th>Actualizar</th>
                    </tr>
                </thead>

                <tbody>
                    {autor.map((index) => (
                        <tr key={index.id}>
                            <td>{index.id}</td>
                            <td>{index.nombre}</td>
                            <td>{index.nacionalidad}</td>
                            <td>{index.fecha_nacimiento}</td>

                            <td>
                                <button onClick={() => eliminarAutores(index.id)}>Eliminar</button>
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
