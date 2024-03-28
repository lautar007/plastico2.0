import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Admin.css';

export default function Administracion (){

    const [adminEnter, setAdminEnter] = useState(false);
    const password = "fotometro";

    return(
        <div className="admin-content">
            <h1 className="admin-title">Administración.</h1>
            {
                adminEnter === false ?
                <div className="pass-content">
                    <p className="pass-label">Las siguientes páginas del sitio son exclusivas para el staff.</p>
                    <p className="pass-label">Coloque la contraseña:</p>
                </div>
                : 
                <div>
                    <Link to="/">
                        <h2>Home</h2>
                    </Link>
                    <Link to="/">
                        <h2>Home</h2>
                    </Link>
                    <Link to="/">
                        <h2>Home</h2>
                    </Link>
                    <Link to="/">
                        <h2>Home</h2>
                    </Link>
                </div>
            }  
        </div>
    )
}