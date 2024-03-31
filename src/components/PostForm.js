import React from "react";

export default function PostForm(){

    const staffAutho = sessionStorage.getItem("staffAutho");

     // Redireccionamiento condicional fuera del bloque de renderizado
     if (staffAutho !== 'Y') {
        window.location.href = "/admin";
        return null; // No renderizar nada más
    }

    return(
        <div>
            <h1>Esta es la página para el formulario de creación de un nuevo post</h1>
        </div>
    );
}