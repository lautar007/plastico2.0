import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../styles/Admin.css';

export default function Administracion (){

    const [adminEnter, setAdminEnter] = useState(false);
    const [password, setPassword] = useState("");
    const staffAutho = sessionStorage.getItem("staffAutho");

    function handlePassword (e){
        e.preventDefault();
        setPassword(e.target.value);
    }

    function enterAdmin(e){
        if(password === "fotometro"){
            sessionStorage.setItem("staffAutho", "Y");
            setAdminEnter(true);
        }
        else{
            alert("La contraseña es incorrecta")
        }
    }

    function handleKeyPress (e) {
        if(e.key === 'Enter'){
            enterAdmin();
        }
    } 

    return(
        <div className="admin-content">
            <h1 className="admin-title">Administración.</h1>
            {
                adminEnter === false && !staffAutho ?
                <div className="pass-content">
                    <p className="pass-label">Las siguientes páginas del sitio son exclusivas para el staff.</p>
                    <p className="pass-label"><br/>Para continuar <br/> Coloque la contraseña:</p>
                    <input
                        className="pass-input"
                        type="password" 
                        onChange={handlePassword}
                        onKeyDown={handleKeyPress}
                    />
                    <button className="pass-button" onClick={enterAdmin}>Ingresar</button>
                </div>
                : 
                <div className="pass-content">
                    <Link to="/postForm">
                        <button className="pass-button">Nuevo Post</button>
                    </Link>
                    <Link to="/editPorts">
                        <button className="pass-button">Edición de portadas</button>
                    </Link>
                    <Link to="/editPosts">
                        <button className="pass-button">Edición de Posts</button>
                    </Link>
                    <Link to="/mensajeria">
                        <button className="pass-button">Mensajería</button>
                    </Link>
                </div>
            }  
        </div>
    )
}