import React from "react";
import { Link } from "react-router-dom";

export default function Blog (){
    return(
        <div>
            <h1>Esta es la página del blog de noticias.</h1>
            <Link to="/">
                <h2>Home</h2>
            </Link>
        </div>
    )
}