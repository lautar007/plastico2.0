import React from "react";

export default function Mensajeria(){

    const staffAutho = sessionStorage.getItem("staffAutho");

     // Redireccionamiento condicional fuera del bloque de renderizado
     if (staffAutho !== 'Y') {
        window.location.href = "/admin";
        return null; // No renderizar nada más
    }

    return(
        <div>
            <h1>Esta es la página para revisar y controlar la mensajería del sitio</h1>
        </div>
    );
}