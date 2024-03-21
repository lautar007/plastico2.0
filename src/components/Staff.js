import React from "react";
import { Link } from "react-router-dom";

export default function Staff (){
    return(
        <div>
            <h1>Esta es la página de la presentación del staff.</h1>
            <Link to="/">
                <h2>Home</h2>
            </Link>
        </div>
    )
}