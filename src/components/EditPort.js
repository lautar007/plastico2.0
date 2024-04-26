import React, {useState, useEffect}from "react";
import '../styles/EditPort.css';

export default function EditPorts(){

    const staffAutho = sessionStorage.getItem("staffAutho");

    const [posterA, setPosterA] = useState('');
    const [posterB, setPosterB] = useState('');

    useEffect(()=>{
        const fetchPoster = async () =>{
            try {
                const posters = await fetch('https://plasticoapi.onrender.com/poster');
                if(!posters.ok){
                    throw new Error('Error al obtener los posters')
                }
                const jsonPoster = await posters.json();
                setPosterA(jsonPoster[0].posterA);
                setPosterB(jsonPoster[0].posterB);

            } catch (error) {
                console.error(error);
            };
        }

        fetchPoster();
    }, []);
    
     // Redireccionamiento condicional fuera del bloque de renderizado
     if (staffAutho !== 'Y') {
        window.location.href = "/admin";
        return null; // No renderizar nada más
    }

    //Funciones para modificar las portadas: 
    function handlePoster(e){
        if(e.target.name === "art"){
            setPosterA(e.target.value)
            console.log("Cambiando poster A")
        }
        if(e.target.name === "com"){
            setPosterB(e.target.value)
            console.log("Cambiando poster B")
        }
    }

    async function handlePostPort(){
        let portadas = {
            posterA,
            posterB
        }
        try {
            let opciones = {
                method: 'POST', // Método de la solicitud
                headers: {
                    'Content-Type': 'application/json' // Tipo de contenido que se está enviando (en este caso JSON)
                },
                body: JSON.stringify(portadas) // Convertir los datos a formato JSON y enviarlos en el cuerpo de la solicitud
            };
            let response = await fetch('https://plasticoapi.onrender.com/poster', opciones)
            if (!response.ok){
                alert("Hubo un error. Llamen a Lauchita!")
                throw new Error("Error al enviar la solicitud POST")
            }
            else alert("Portadas modificadas con éxito.")
        } catch (error) {
            alert("Hubo un error. LLamen a Lauchita");
            console.log(error);
        }
    }

    return(
        <div>
            <h1 className="editList-title">Edición de portadas</h1>
            <div className="posters-content">
                <div className="poster-content">
                    <p className="port-title">Artístico</p>
                    <input
                    className="port-input"
                    name="art"
                    value={posterA}
                    onChange={handlePoster}
                    />
                    <img
                    className="port-img"
                    src={posterA}
                    alt="poster artístico"
                    />
                </div>
                <div className="poster-content">
                    <p className="port-title">Comercial</p>
                    <input
                    className="port-input"
                    name="com"
                    value={posterB}
                    onChange={handlePoster}
                    />
                    <img
                    className="port-img"
                    src={posterB}
                    alt="poster artístico"
                    />
                </div>
            </div>
            <button className="send-button" onClick={handlePostPort} >Editar.</button>
        </div>
    );
}