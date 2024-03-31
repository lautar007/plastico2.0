import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Admin.css';

export default function Administracion (){

    const [adminEnter, setAdminEnter] = useState(false);
    const [password, setPassword] = useState("");

    function handlePassword (e){
        e.preventDefault();
        setPassword(e.target.value);
    }

    function enterAdmin(e){
        e.preventDefault();
        if(password === "fotometro"){
            setAdminEnter(true);
        }
    }

    return(
        <div className="admin-content">
            <h1 className="admin-title">Administración.</h1>
            {
                adminEnter === false ?
                <div className="pass-content">
                    <p className="pass-label">Las siguientes páginas del sitio son exclusivas para el staff.</p>
                    <p className="pass-label"><br/>Para continuar <br/> Coloque la contraseña:</p>
                    <input
                        className="pass-input"
                        type="password" 
                        onChange={handlePassword}
                    />
                    <button className="pass-button" onClick={enterAdmin}>Ingresar</button>
                </div>
                : 
                <div className="pass-content">
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