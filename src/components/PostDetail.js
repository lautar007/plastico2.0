import React from "react";
import {useParams} from "react-router-dom";

export default function PostDetail(){

    let {id} = useParams();

    return(
        <div>
            <h1>Este es una pagina de detalle de trabajo. Numero: {id}</h1>
        </div>
    )
}