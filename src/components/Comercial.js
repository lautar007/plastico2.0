import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/ArtComMenu.css';

export default function Artistico (){

    const [postList, setPostList] = useState([]);

    useEffect(()=>{
        const fetchPostList = async () =>{
            try {
                const posters = await fetch('https://plasticoapi.onrender.com/comercial');
                if(!posters.ok){
                    throw new Error('Error al obtener los posters')
                }
                const jsonPostList = await posters.json();
                setPostList(jsonPostList);
            } catch (error) {
                console.error(error);
            };
        }
        fetchPostList();
        console.log(postList)
    }, []);

    return(
        <div>
            <h1 className="work-menu-title">Trabajos Artísticos.</h1>
            <div className="work-menu-content">
                {
                    postList.map((post, index)=>{
                        return(
                            <div key={index} className="post-content">
                                <hr className="red-band"/> 
                                <img 
                                className="post-img"
                                src={post.imagen}
                                />
                                <p className="post-title">{post.titulo}</p>
                                <hr className="red-band"/>
                                <hr className="black-band"/> 
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}