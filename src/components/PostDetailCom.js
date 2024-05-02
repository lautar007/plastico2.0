import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import '../styles/Detail.css';
import whatsapp from "../images/whatsapp.png";
import { Link } from "react-router-dom";

export default function PostDetailArt(){

    const {id} = useParams();

    const [post, setPost] = useState({});

    useEffect(()=>{
        const fetchPost = async () =>{
            try {
                const postArt = await fetch('https://plasticoapi.onrender.com/comercial/'+id);
                if(!postArt.ok){
                    throw new Error('Error al obtener los posters')
                }
                const jsonPost = await postArt.json();
                setPost(jsonPost);
            } catch (error) {
                console.error(error);
            };
        }
        fetchPost();
        console.log(post);
    }, []);

    return(
        <div>
           <h1 className="detail-title">{post.titulo}</h1>
           <div className="detail-content">
                <img className="detail-image" src={post.imagen} alt="detail-img"/>
                <div className="detail-body-cont">
                    <h1 className="detail-subtitle">{post.subtitulo}</h1>
                    <p className="detail-body">{post.contenido}</p>
                    <p className="detail-date">{post.fecha}</p>
                </div>
           </div>
           <div className="detail-galcont">
                {
                    post.galeria ?
                    post.galeria.map(el =>{
                        return (
                            <img className="detail-galery" src={el} alt={el}/> 
                        )
                    })
                    :
                    null
                }
           </div>
           <Link to="https://api.whatsapp.com/send?phone=+543513257629&text=Hola%20Pl%C3%A1stico,%20quiero%20hacer%20una%20consulta:%20">
                <img
                className="call-to-action"
                alt="callToAction"
                src={whatsapp}
                />
            </Link>
        </div>
    )
}