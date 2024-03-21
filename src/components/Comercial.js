import React from "react";
import { Link } from "react-router-dom";

export default function Comercial (){
    return(
        <div>
            <h1>Esta es la página del menú para producciones Comerciales.</h1>
            <Link to="/">
                <h2>Home</h2>
            </Link>
        </div>
    )
}