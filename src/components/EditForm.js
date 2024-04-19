import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import '../styles/EditList.css';

export default function EditForm (){

    //Dentro de los parámetros viene tanto el id como la categoría a la que pertenece el posteo. 
    //Es importante porque los trabajos artísticos y comerciales corresponden a modelos distintos en la DB.
    const {_id} = useParams();
    //El ID y la categoría están separados por un guión medio, por lo que podemos separar ambos terminos
    //en un arreglo usando .split()
    const idAndCat = _id.split('-');
    //Una vez que lo tenemos separados, podemos darle cada valor a constantes diferentes. 
    const id = idAndCat[0]
    const cat = idAndCat[1]

    const [post, setPost] = useState({ galeria: [] });

    useEffect(()=>{
        //Dependiendo de la categoría buscaremos en tal o cual lugar:
        const fetchPost = async () =>{
            if(cat === "art"){
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
            else if(cat === "com"){
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
        }
        fetchPost();
        console.log(post);
    }, []);

    function handlePut(e){
        console.log(post)
    }

    return(
        <div className="editList-content">
            <h1 className="editList-title">Formulario de Edición:</h1>
            <div>
                <h3 className="form-label">Título</h3>
                <input
                placeholder="Título del post"
                className="form-input"
                name="titulo"
                value={post.titulo}
                />

                <h3 className="form-label">Subtítulo</h3>
                <textarea
                type="text-area"
                placeholder="Subtítulo del post"
                className="form-input"
                name="subtitulo"
                value={post.subtitulo}
                />

                <h3 className="form-label">Portada</h3>
                <input
                placeholder="URL de la imagen"
                className="form-input"
                name="imagen"
                value={post.imagen}
                
                />
                {
                    post.imagen ?
                    <div className="poster-thumb-div">
                        <img className="thumbnail" src={post.imagen} alt="URL INVALIDA."/>
                    </div>
                    :
                    null
                }

                <h3 className="form-label">Contenido</h3>
                <textarea
                type="text-area"
                placeholder="Contenido del post"
                className="form-input"
                name="contenido"
                value={post.contenido}
                />

                <div className="galeria-content">
                    <h3 className="form-label">Galería</h3>
                    {post.galeria && post.galeria.map((image, index) => (
                        <div key={index}>
                        <input
                            type="text"
                            className="form-input"
                            value={image}
                            placeholder="URL de la imagen"
                            
                        />
                        <button className="galeria-button-men">✖</button>
                    </div>
                    ))}
                    <button className="galeria-button-mas" >✚</button>
                    <div className="thumbnail-content">
                    {post.galeria && post.galeria.map((image, index) => (
                        <img className="thumbnail" src={image} alt="URL INVALIDA. Al colocar una URL válida la imagen aparecerá aquí." />
                    ))}
                    </div>
                </div>

                <button className="send-button" onClick={handlePut}>Postear.</button>
            </div>
        </div>
    )
}