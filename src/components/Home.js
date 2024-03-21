import React from "react";
import { Link } from "react-router-dom";

export default function Home (){
    return(
        <div>
            <h1>Esta es la página de Home</h1>
            <Link to="/artistico">
                <h2>Artístico</h2>
            </Link>
            <Link to= "/comercial">
                <h2>Comercial</h2>
            </Link>
            <Link to= "/blog">
                <h2>Blog</h2>
            </Link>
            <Link to= "/staff">
                <h2>Staff</h2>
            </Link>
        </div>
    )
}