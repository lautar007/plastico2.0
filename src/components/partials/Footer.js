import React from "react";
import { Link } from "react-router-dom";
import '../../styles/Footer.css';
import instagram from "../../images/instagram.png";
import pinterest from "../../images/pinterest.png";
import behance from "../../images/behance.png";
import whatsapp from "../../images/whatsapp.png";

export default function Footer (){
    return(
        <div className="footer-content">
            <hr/>
            <div>
                <p className="footer-label">Seguínos</p>
                <div className="social-content">
                   <Link to='https://www.instagram.com/plastico.estudio/?hl=es'>
                        <img className="social-logo" src={instagram} alt="instagram-logo"/>
                   </Link> 
                   <Link to="https://ar.pinterest.com/plasticoestudiocreativo/_created/">
                        <img className="social-logo" src={pinterest} alt="instagram-logo"/>
                   </Link> 
                   <Link to="https://www.behance.net/plasticoplastico">
                        <img className="social-logo" src={behance} alt="instagram-logo"/>
                   </Link> 
                </div>
            </div>
            <hr/>
            <div>
                <p className="footer-label">Escribínos</p>
                <div className="social-content">
                    <Link to="https://api.whatsapp.com/send?phone=+543513257629&text=Hola%20Pl%C3%A1stico,%20quiero%20hacer%20una%20consulta:%20">
                        <img className="social-logo" src={whatsapp} alt="instagram-logo"/>
                   </Link> 
                </div>
            </div>
            <hr/>
            <div>
                <Link className="link">
                    <p className="message-label">Dejanos un mensaje</p>
                </Link>
            </div>
            <hr/>
            <div>
                <p className="credits">Este sitio fue diseñado y desarrollado por Lautaro Nuñez.</p>
                <p className="credits">Si quieres que desarrolle tu web, envía un email a 'kautarol@gmail.com'</p>
                <p className="credits">Las imágenes y publicaciones de este sitio web están protegidas por derechos de autor</p>
                <p className="credits">Plástico Estudio. Sitio v.2.0.0 | Todos los derechos reservados © | 2024</p>
            </div>
            <hr/>
        </div>
    )
}