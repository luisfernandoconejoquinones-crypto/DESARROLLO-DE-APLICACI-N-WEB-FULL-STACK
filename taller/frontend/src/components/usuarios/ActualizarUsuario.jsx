
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ActualizarUsuario() {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [estado, setEstado] = useState("");

    let { id } = useParams();
    let Navigate = useNavigate();

    async function actualizar() {

        let respuesta = await fetch("http://localhost:3000/api/usuarios/" + id, {
            method: "PUT",
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

        let res = await respuesta.json();

        alert(res.mensaje);

        Navigate("/usuarios");
    }

    return (
        <div>
            <h1>Actualizar Usuario</h1>

            <div>
                <input type="text"placeholder="Escriba nombre"onChange={(e) => setNombre(e.target.value)}/>
                <input type="email"placeholder="Escriba correo"onChange={(e) => setCorreo(e.target.value)}/>
                <input type="text"placeholder="Escriba telefono"onChange={(e) => setTelefono(e.target.value)} />
                <input type="text" placeholder="Escriba estado" onChange={(e) => setEstado(e.target.value)}/>

                <button onClick={actualizar}>Guardar</button>
            </div>
        </div>
    );
}
