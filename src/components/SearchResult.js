import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/ArtComMenu.css';

export default function SearchResult (){

    const {search} = useParams();

    const [postList, setPostList] = useState([]);

    useEffect(()=>{
        const fetchPostList = async () =>{
            let postArreglo = []
            try {
                const artPosts = await fetch('https://plasticoapi.onrender.com/artistic');
                if(!artPosts.ok){
                    throw new Error('Error al obtener los artPosts')
                }
                const artJsonPostList = await artPosts.json();
                postArreglo = artJsonPostList

                const comPosts = await fetch('https://plasticoapi.onrender.com/comercial');
                if(!comPosts.ok){
                    throw new Error('Error al obtener los comPosts')
                }
                const comJsonPostList = await comPosts.json();
                const finalPostsArray = postArreglo.concat(comJsonPostList);
                const finalSearchArray = finalPostsArray.filter((el)=>{
                    return el.titulo.toLowerCase().includes(search.toLowerCase());
                }) 

                setPostList(finalSearchArray);

            } catch (error) {
                console.error(error);
            };
        }
        fetchPostList();
    }, []);

    console.log(postList)

    return (
        <div>
            <h1 className="work-menu-title">Resultados de la busqueda: "{search}"</h1>
            <div className="work-menu-content">
                {
                    postList.map((post, index)=>{
                        return(
                            <div key={index} className="post-content">
                                <hr className="red-band"/> 
                                <Link to={"/workArt/"+ post._id}>
                                    <img 
                                    className="post-img"
                                    src={post.imagen}
                                    alt="Work"
                                    />
                                    <p className="post-title">{post.titulo}</p>
                                </Link>
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