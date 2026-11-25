
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ActualizarAutor() {

    const [nombre, setNombre] = useState("");
    const [nacionalidad, setNacionalidad] = useState("");
    const [fecha_nacimiento, setFechaNacimiento] = useState("");

    let { id } = useParams();
    let Navigate = useNavigate();

    async function actualizar() {

        let respuesta = await fetch("http://localhost:3000/api/autores/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                nacionalidad: nacionalidad,
                fecha_nacimiento: fecha_nacimiento
            })
        });

        let res = await respuesta.json();

        alert(res.mensaje);

        Navigate("/autores");
    }

    return (
        <div>
            <h1>Actualizar Autor</h1>

            <div>
                <input type="text" placeholder="Escriba nombre" onChange={(e) => setNombre(e.target.value)}/>
                <input type="text" placeholder="Escriba nacionalidad" onChange={(e) => setNacionalidad(e.target.value)}/>
                <input type="date" onChange={(e) => setFechaNacimiento(e.target.value)}/>

                <button onClick={actualizar}>Guardar</button>
            </div>
        </div>
    );
}
