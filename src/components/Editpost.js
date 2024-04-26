import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import '../styles/EditList.css';

export default function EditPosts(){

     //Autorización:
    const staffAutho = sessionStorage.getItem("staffAutho");

    const [category, setCategory] = useState("art"); 
    const [postList, setPostList] = useState([]);

    useEffect(()=>{
        const fetchPostList = async () =>{
            if (category === "art"){
                try {
                    console.log("trayendo artisticos")
                    const posters = await fetch('https://plasticoapi.onrender.com/artistic');
                    if(!posters.ok){
                        throw new Error('Error al obtener los posters')
                    }
                    const jsonPostList = await posters.json();
                    setPostList(jsonPostList);
                } catch (error) {
                    console.error(error);
                };
            }
            else if(category === "com"){
                try {
                    console.log("trayendo comerciales")
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
        }
        fetchPostList();
        console.log(postList);
    }, [category]);

     // Redireccionamiento en caso de no autorización.
     if (staffAutho !== 'Y') {
        window.location.href = "/admin";
        return null; // No renderizar nada más
    };

    // Función para controlar la categoría: 
    function handleCatCheckbox(e){
        setCategory(e.target.value);
        console.log(category);
    };

    return(
        <div className="editList-content">
            <h1 className="editList-title">Lista de Publicaciones:</h1>
            <div className="cat-check-content">
                <div className="category-checkbox">
                    <input
                    className="tipo-box"
                    type="checkbox"
                    value="art"
                    checked={category === "art"}
                    onClick={handleCatCheckbox}
                    />
                    <label className="tipo-label">Artístico</label>
                </div>
                <div className="category-checkbox">
                    <input
                    className="tipo-box"
                    type="checkbox"
                    value="com"
                    checked={category === "com"}
                    onClick={handleCatCheckbox}
                    />
                    <label className="tipo-label">Comercial</label>
                </div>
                <div className="category-checkbox">
                    <input
                    className="tipo-box"
                    type="checkbox"
                    value="blog"
                    checked={category === "blog"}
                    />
                    <label className="tipo-label">Blog</label>
                </div>
            </div>
            <div className="list-direction">
                {
                    postList.map(el=>{
                        return(
                            <div className="list-item">
                                <hr/>
                                <h2 className="edit-post-title">{el.titulo}</h2>
                                <div className="img-botonera-div">
                                    <img className="edit-post-img" alt={el._id} src={el.imagen}/>
                                    <div className="botonera-div">
                                        <button className="edit-button">Eliminar</button>
                                        <Link to={"/editForm/"+ el._id + "-" + category}>
                                            <button className="edit-button">Editar</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}