import React, { useState, useEffect } from "react";


export default function SendMsg(){

    useEffect(()=>{
        window.scrollTo(0,0);
    }, [])

    const [mensaje, setMensaje] = useState({
        titulo: "",
        fecha: "",
        contenido: "",
        remitente: "",
        email: "",
        telefono: ""
    })

    function handleNewMessage(e){
        if(e.target.name === "titulo"){
            setMensaje({
                ...mensaje,
                titulo: e.target.value
            })
        }
        else if(e.target.name === "remitente"){
            setMensaje({
                ...mensaje,
                remitente: e.target.value
            })
        }
        else if(e.target.name === "contenido"){
            setMensaje({
                ...mensaje,
                contenido: e.target.value
            })
        }
        else if(e.target.name === "email"){
            setMensaje({
                ...mensaje,
                email: e.target.value
            })
        }
        else if(e.target.name === "telefono"){
            setMensaje({
                ...mensaje,
                telefono: e.target.value
            })
        }
    }

    async function sendMessage(e){
        console.log(mensaje);
        try {
            let opciones = {
                method: 'POST', // Método de la solicitud
                headers: {
                    'Content-Type': 'application/json' // Tipo de contenido que se está enviando (en este caso JSON)
                },
                body: JSON.stringify(mensaje) // Convertir los datos a formato JSON y enviarlos en el cuerpo de la solicitud
            };
            let response = await fetch('https://plasticoapi.onrender.com/mensajes', opciones)
                if (!response.ok){
                    alert("Perdón, pero no pudimos enviar el mensaje. Por favor, contactanos a través de nuestras redes. Las encontrarás más abajo.")
                    throw new Error("Error al enviar la solicitud POST")
                }
                else alert("Mensaje enviado con éxito. Te contactaremos en breve!")
            
            window.location.href = '/'
        } catch (error) {
            alert("Perdón, pero no pudimos enviar el mensaje. Por favor, contactanos a través de nuestras redes. Las encontrarás más abajo.");
            console.log(error);
        }
    }

    return (
        <div>
            <h1 className="admin-title">Dejanos un mensaje: </h1>
            <p className="pass-label">Completa el formulario y nos pondremos en contacto.</p>
            <p></p>
            <div>
                <h3 className="form-label">Título / Asunto</h3>
                <input
                    placeholder="Asunto del mensaje"
                    className="form-input"
                    name="titulo"
                    onChange={handleNewMessage}
                />

                <h3 className="form-label">Tu nombre</h3>
                <input
                    placeholder="Decinos tu nombre"
                    className="form-input"
                    name="remitente"
                    onChange={handleNewMessage}
                />

                <h3 className="form-label">Contenido</h3>
                <textarea
                    type="text-area"
                    placeholder="Contenido del mensaje"
                    className="form-input"
                    name="contenido"
                    rows={6}
                    onChange={handleNewMessage}
                />

                <h3 className="form-label">Email (opcional)</h3>
                <input
                    placeholder="Dejanos tu Mail"
                    className="form-input"
                    name="email"
                    onChange={handleNewMessage}
                />

                <h3 className="form-label">Teléfono (opcional)</h3>
                <input
                    placeholder="Dejanos tu teléfono"
                    className="form-input"
                    name="telefono"
                    onChange={handleNewMessage}
                />

            </div>
            <button className="send-button" onClick={sendMessage}>Enviar.</button>
        </div>
    )
}