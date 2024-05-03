import React from "react";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../styles/Home.css';
import shadeIzq from '../images/shade izq.png';
import shadeDer from '../images/shade der.png';

export default function Home (){

    const [posterA, setPosterA] = useState('');
    const [posterB, setPosterB] = useState('');
    const [search, setSearch] = useState('');

    useEffect(()=>{
        const fetchPoster = async () =>{
            try {
                const posters = await fetch('https://plasticoapi.onrender.com/poster');
                if(!posters.ok){
                    throw new Error('Error al obtener los posters')
                }
                const jsonPoster = await posters.json();
                setPosterA(jsonPoster[0].posterA);
                setPosterB(jsonPoster[0].posterB);

            } catch (error) {
                console.error(error);
            };
        }

        fetchPoster();
    }, []);

    //Función que establece los términos de búsqueda:
    function handleSearchBar (e){
        setSearch(e.target.value);
    }

    //Función que acciona la búsqueda
    function handleSearch(e){
        window.location.href = `/search/${search}`
    }


    return(
        <div className="Home">
            <h1 className="titulo">Plástico.</h1>
            <h4 className="subtitulo">Estudio fotográfico.</h4>
            <input className="searchBarDesk" placeholder="⌕ Buscar..." onChange={handleSearchBar}/>
            <button className="searchBarButton" onClick={handleSearch}>IR</button>
            <hr/>
            <div className="position-posters">
                <div className="art-content">
                    {
                        posterA ?
                        <div>
                            <img className="posterArtistico" src={posterA} alt="portada artistico" />
                            <img className="shadeIzq" src={shadeIzq} alt="shade"></img>
                            <Link className="link" to="/artistico">
                                <p className="category-labelA">Art<br />ist<br />ico</p>
                            </Link>
                        </div>
                        :
                        <div className="loading-anim"></div>
                    }
                    
                </div>
                <hr className="division-hr"/>
                <div className="com-content">
                    {
                        posterB ? 
                        <div>
                            <img className="posterComercial" src={posterB} alt="portada artistico" />
                            <img className="shadeDer" src={shadeDer} alt="shade"></img>
                            <Link className="link" to="/comercial">
                                <p className="category-labelB">Com<br />erc<br />ial</p>
                            </Link>
                        </div>
                        :
                        <div className="loading-anim"></div>
                    }
                    
                </div>
            </div>
        </div>
    )
}