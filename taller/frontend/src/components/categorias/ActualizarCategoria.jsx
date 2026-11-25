
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ActualizarCategoria() {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    let { id } = useParams();
    let Navigate = useNavigate();

    async function actualizar() {

        let respuesta = await fetch("http://localhost:3000/api/categorias/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion
            })
        });

        let res = await respuesta.json();

        alert(res.mensaje);

        Navigate("/categorias");
    }

    return (
        <div>
            <h1>Actualizar Categoria</h1>

            <div>
                <input type="text" placeholder="Escriba nombre" onChange={(e) => setNombre(e.target.value)}/>
                <input type="text" placeholder="Escriba descripcion" onChange={(e) => setDescripcion(e.target.value)}/>

                <button onClick={actualizar}>Guardar</button>
            </div>
        </div>
    );
}
