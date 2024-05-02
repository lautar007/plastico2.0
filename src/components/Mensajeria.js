import React, { useState, useEffect } from "react";
import '../styles/Mensajeria.css';

export default function Mensajeria(){

    const [mensajesList, setMensajesList] = useState([]);

    useEffect(()=>{
        const fetchMensajes = async () =>{
            try {
                const mensajes = await fetch('https://plasticoapi.onrender.com/mensajes');
                if(!mensajes.ok){
                    throw new Error('Error al obtener los mensajes')
                }
                const jsonMensajes = await mensajes.json();
                setMensajesList(jsonMensajes);
            } catch (error) {
                console.error(error);
            };
        }
        fetchMensajes();
        console.log(mensajesList)
    }, []);

    const staffAutho = sessionStorage.getItem("staffAutho");

     // Redireccionamiento condicional fuera del bloque de renderizado
     if (staffAutho !== 'Y') {
        window.location.href = "/admin";
        return null; // No renderizar nada más
    }

    async function handleDeleteMessage(e){
        try {
            let opciones = {
                method: 'DELETE', // Método de la solicitud
            };
            let response = await fetch(`https://plasticoapi.onrender.com/mensajes/${e.target.name}`, opciones)
            if (!response.ok){
                alert("Hubo un error. Llamen a Lauchita!")
                throw new Error("Error al enviar la solicitud POST")
            }
            else alert("Post mensaje eliminado con éxito.") 
             //Recargar la página luego de eliminar.
             window.location.reload()
        } catch (error) {
            alert("Hubo un error. LLamen a Lauchita");
            console.log(error);
        }
    }

    return(
        <div>
            <h1 className="admin-title">Mensajes recibidos.</h1>
            <div className="mensj-content">
                {
                    mensajesList ? mensajesList.map(el=>{
                        return (
                            <div className="mensj-card">
                                <h2 className="mensj-title">{el.titulo}</h2>
                                <p className="mensj-author">DE: {el.remitente}</p> 
                                <p className="mensj-author">MAIL: {el.email}</p> 
                                <p className="mensj-author">TEL: {el.telefono}</p> 
                                <p className="mensj-body">"{el.contenido}"</p>
                                <button 
                                className="mensj-button"
                                name={el._id}
                                onClick={handleDeleteMessage}
                                >
                                    Eliminar
                                </button>
                            </div>    
                        )
                    })
                    :
                    <p>No hay mensajes recibidos.</p>
                }
            </div>
        </div>
    );
}