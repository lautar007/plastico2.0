import React from "react";
import { Link } from "react-router-dom";
import '../../styles/Footer.css';
import instagram from "../../images/instagram.png";
import pinterest from "../../images/pinterest.png";
import behance from "../../images/behance.png";

export default function Footer (){
    return(
        <div className="footer-content">
            <div>
                <p className="social-label">Seguinos</p>
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
        </div>
    )
}