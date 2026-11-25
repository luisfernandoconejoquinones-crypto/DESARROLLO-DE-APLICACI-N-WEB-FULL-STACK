
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TablaCategorias() {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const [categoria, setCategoria] = useState([]);

    const Navigate = useNavigate();

    useEffect(() => {
        traerdatos();
    }, []);

    async function traerdatos() {
        let respuesta = await fetch("http://localhost:3000/api/categorias");
        let datos = await respuesta.json();

        console.log(datos);
        setCategoria(datos);
    }

    async function guardar() {
        let respuesta = await fetch("http://localhost:3000/api/categorias", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre: nombre,
                descripcion: descripcion
            })
        });

        let datos = await respuesta.json();

        alert(datos.mensaje);

        traerdatos();
    }

    function llevaractualizar(id) {
        Navigate("/actualizarcategoria/" + id);
    }

    async function eliminarCategorias(id) {
        let respuesta = await fetch("http://localhost:3000/api/categorias/" + id, {
            method: "DELETE"
        });

        let mjs = await respuesta.json();

        alert(mjs.mensaje);

        traerdatos();
    }

    return (
        <div>
            <h1>Gestion Categorias</h1>

            <div>
                <input type="text" placeholder="Escriba nombre" onChange={(e) => setNombre(e.target.value)}/>
                <input type="text" placeholder="Escriba descripcion" onChange={(e) => setDescripcion(e.target.value)}/>

                <button onClick={guardar}>Guardar</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripcion</th>
                        <th>Eliminar</th>
                        <th>Actualizar</th>
                    </tr>
                </thead>

                <tbody>
                    {categoria.map((index) => (
                        <tr key={index.id}>
                            <td>{index.id}</td>
                            <td>{index.nombre}</td>
                            <td>{index.descripcion}</td>

                            <td>
                                <button onClick={() => eliminarCategorias(index.id)}>Eliminar</button>
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
