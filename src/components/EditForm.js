import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import '../styles/EditList.css';

export default function EditForm (){

    //Autorización:
    const staffAutho = sessionStorage.getItem("staffAutho");

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

    let galeria = post.galeria;

    // Redireccionamiento en caso de no autorización.
    if (staffAutho !== 'Y') {
        window.location.href = "/admin";
        return null; // No renderizar nada más
    }

    //Función para agregar un nuevo input al formulario de galería: 
    const handleAddInputGallery = (e) => {
        console.log("Agregando un nuevo input")
        galeria.push('');
        setPost({
            ...post,
            gelaria: galeria
        })
      };

    //Función para eliminar un input de la galería:
    function handleRemoveInputGallery(e){
        galeria.splice(e.target.value, 1);
        setPost({
            ...post,
            gelaria: galeria
        });
    }

    //Funciones para cambiar los valores de las propiedades del post: 
    function handleInput(e){
        switch (e.target.name) {
            case "titulo":
                console.log("Cambiando título")
                setPost({
                    ...post,
                    titulo: e.target.value
                })
                break;
            case "subtitulo":
                console.log("Cambiando subtítulo")
                setPost({
                    ...post,
                    subtitulo: e.target.value
                })
                break;
            case "imagen":
                console.log("Cambiando imagen de portada")
                setPost({
                    ...post,
                    imagen: e.target.value
                })
                break;
            case "contenido":
                console.log("Cambiando el cuerpo del post")
                setPost({
                    ...post,
                    contenido: e.target.value
                })
                break;
            default:
                break;
        }
    }

    //Función que coloca el valor de los inputs al arreglo galerías:
    const handleInputChangeGallery = (e) => {
        galeria[e.target.name] = e.target.value;
        setPost({
            ...post,
            galeria: galeria
        })
    };

    async function handlePut(e){
        console.log(post)
        try {
            const opciones = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json' // Tipo de contenido que se está enviando (en este caso JSON)
                },
                body: JSON.stringify(post)
            }

            if(cat === 'art'){
                let response = await fetch("https://plasticoapi.onrender.com/artistic", opciones)
                if (!response.ok){
                    alert("Hubo un error. Llamen a Lauchita!")
                    throw new Error("Error al enviar la solicitud POST")
                }
                else alert("Post artístico actualizado con éxito.")
            }
            else if(cat === 'com'){
                let response = await fetch("https://plasticoapi.onrender.com/comercial", opciones)
                if (!response.ok){
                    alert("Hubo un error. Llamen a Lauchita!")
                    throw new Error("Error al enviar la solicitud POST")
                }
                else alert("Post comercial actualizado con éxito.")
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                onChange={handleInput}
                />

                <h3 className="form-label">Subtítulo</h3>
                <textarea
                type="text-area"
                placeholder="Subtítulo del post"
                className="form-input"
                name="subtitulo"
                value={post.subtitulo}
                onChange={handleInput}
                />

                <h3 className="form-label">Portada</h3>
                <input
                placeholder="URL de la imagen"
                className="form-input"
                name="imagen"
                value={post.imagen}
                onChange={handleInput}
                
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
                onChange={handleInput}
                />

                <div className="galeria-content">
                    <h3 className="form-label">Galería</h3>
                    {post.galeria && post.galeria.map((image, index) => (
                        <div key={index}>
                        <input
                            type="text"
                            className="form-input"
                            value={image}
                            name={index}
                            placeholder="URL de la imagen"
                            onChange={handleInputChangeGallery}    
                        />
                        <button className="galeria-button-men" value={index} onClick={handleRemoveInputGallery}>✖</button>
                    </div>
                    ))}
                    <button className="galeria-button-mas" onClick={handleAddInputGallery}>✚</button>
                    <div className="thumbnail-content">
                    {post.galeria && post.galeria.map((image, index) => (
                        <img className="thumbnail" src={image} alt="URL INVALIDA. Al colocar una URL válida la imagen aparecerá aquí." />
                    ))}
                    </div>
                </div>

                <button className="send-button" onClick={handlePut}>Editar.</button>
            </div>
        </div>
    )
}