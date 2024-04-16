import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import '../styles/Detail.css';

export default function PostDetailArt(){

    const {id} = useParams();

    const [post, setPost] = useState({});

    useEffect(()=>{
        const fetchPost = async () =>{
            try {
                const postArt = await fetch('https://plasticoapi.onrender.com/artistic/'+id);
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
           <hr className="red-band"/>
           <img className="detail-image" src={post.imagen} alt="detail-img"/>
           <hr className="red-band"/>
           <h1 className="detail-subtitle">{post.subtitulo}</h1>
           <p className="detail-body">{post.contenido}</p>
           <p className="detail-date">{post.fecha}</p>
           {
            post.galeria ?
            post.galeria.map(el =>{
                return (
                    <div>
                        <hr/>
                        <img className="detail-image" src={el}/> 
                    </div>
                )
            })
            :
            null
           }
        </div>
    )
}