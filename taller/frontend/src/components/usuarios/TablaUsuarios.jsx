
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TablaUsuarios() {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [estado, setEstado] = useState("");

    const [usuario, setUsuario] = useState([]);

    const Navigate = useNavigate();

    useEffect(() => {
        traerdatos();
    }, []);


    async function traerdatos() {
        let respuesta = await fetch("http://localhost:3000/api/usuarios");
        let datos = await respuesta.json();

        console.log(datos);
        setUsuario(datos);
    }

    async function guardar() {

        let respuesta = await fetch("http://localhost:3000/api/usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                correo: correo,
                telefono: telefono,
                estado: estado
            })
        });

        let datos = await respuesta.json();

        alert(datos.mensaje);

        traerdatos();
    }

    function llevaractualizar(id) {
        Navigate("/actualizarusuario/" + id);
    }

    async function eliminarUsuarios(id) {

        let respuesta = await fetch("http://localhost:3000/api/usuarios/" + id, {
            method: "DELETE"
        });

        let mjs = await respuesta.json();

        alert(mjs.mensaje);

        traerdatos();
    }

    return (
        <div>
            <h1>Gestion Usuarios</h1>

            <div>
                <input type="text" placeholder="Escriba nombre" onChange={(e) => setNombre(e.target.value)}/>
                <input type="email" placeholder="Escriba correo" onChange={(e) => setCorreo(e.target.value)}/>
                <input type="text" placeholder="Escriba telefono" onChange={(e) => setTelefono(e.target.value)}/>
                <input type="text" placeholder="Escriba estado"  onChange={(e) => setEstado(e.target.value)}  />

                <button onClick={guardar}>Guardar</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Telefono</th>
                        <th>Estado</th>
                        <th>Eliminar</th>
                        <th>Actualizar</th>
                    </tr>
                </thead>

                <tbody>
                    {usuario.map((index) => (
                        <tr key={index.id}>
                            <td>{index.id}</td>
                            <td>{index.nombre}</td>
                            <td>{index.correo}</td>
                            <td>{index.telefono}</td>
                            <td>{index.estado}</td>

                            <td>
                                <button onClick={() => eliminarUsuarios(index.id)}>
                                    Eliminar
                                </button>
                            </td>

                            <td>
                                <button onClick={() => llevaractualizar(index.id)}>
                                    Actualizar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
