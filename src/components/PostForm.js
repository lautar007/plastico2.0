import React, { useState } from "react";

export default function PostForm(){
     
    //Autorización:
    const staffAutho = sessionStorage.getItem("staffAutho");
    //Manejador del tipo de posteo:
    const [tipo, setTipo] = useState("work");
    //Manejador de la categoría de los trabajos:
    const [category, setCategory] = useState("art");
    //Arreglo de imágenes para la galería.
    const [galeria, setGaleria] = useState([]);

    //Objeto a postear:
    let [newPost, setNewPost] = useState({
        titulo: "",
        fecha: "",
        imagen: "",
        contenido: "",
        categoria: "",
        subtitulo: "",
        galeria: []
    });

     // Redireccionamiento en caso de no autorización.
     if (staffAutho !== 'Y') {
        window.location.href = "/admin";
        return null; // No renderizar nada más
    }

    //Función que maneja los checkbox del tipo de posteo
    function handleTipoBox (e){
        setTipo(e.target.value);
        console.log(tipo);
    }

    //Función que maneja los checkbox de la categoría de trabajo.
    function handleCategoryBox(e){
        setCategory(e.target.value);
        console.log(category);
    }

    //Función que agrega un input a la sección galerías:
    const handleAddInputGallery = () => {
        setGaleria([...galeria, '']);
      };

    //Función que elimina un input de la sección galerías:
    const handleRemoveInputGallery = (index) => {
        const newGaleria = [...galeria];
        newGaleria.splice(index, 1);
        setGaleria(newGaleria);
      };

    //Función que coloca el valor de los inputs al arreglo galerías:
    const handleInputChangeGallery = (index, e) => {
        const newGaleria = [...galeria];
        newGaleria[index] = e.target.value;
        setGaleria(newGaleria);
        newPost.galeria = galeria;
      };

    //Función para crear el objeto a postear:
    function handleNewPost(e){
        if(e.target.name === "titulo"){
            setNewPost({
                ...newPost,
                titulo: e.target.value
            })
            console.log(newPost)
        }
        else if(e.target.name === "subtitulo"){
            setNewPost({
                ...newPost,
                subtitulo: e.target.value
            })
            console.log(newPost)
        }
        else if(e.target.name === "fecha"){
            setNewPost({
                ...newPost,
                fecha: e.target.value
            })
            console.log(newPost)
        }
        else if(e.target.name === "imagen"){
            setNewPost({
                ...newPost,
                imagen: e.target.value
            })
            console.log(newPost)
        }
        else if(e.target.name === "contenido"){
            setNewPost({
                ...newPost,
                contenido: e.target.value
            })
            console.log(newPost)
        }
    }

    //Función para enviar el post
    async function handleSendPost(e){
        setNewPost({
            ...newPost,
            categoria: category,
            galeria: galeria
        })
        console.log(newPost)
        try {
            let opciones = {
                method: 'POST', // Método de la solicitud
                headers: {
                    'Content-Type': 'application/json' // Tipo de contenido que se está enviando (en este caso JSON)
                },
                body: JSON.stringify(newPost) // Convertir los datos a formato JSON y enviarlos en el cuerpo de la solicitud
            };
            if(category === "art" && tipo === "work"){
            let response = await fetch('https://plasticoapi.onrender.com/artistic', opciones)
                if (!response.ok){
                    alert("Hubo un error. Llamen a Lauchita!")
                    throw new Error("Error al enviar la solicitud POST")
                }
                else alert("Post artístico creado con éxito.")
            }
            else if (category === "com" && tipo === "work"){
                let response = await fetch('https://plasticoapi.onrender.com/comercial', opciones)
                if (!response.ok){
                    alert("Hubo un error. Llamen a Lauchita!")
                    throw new Error("Error al enviar la solicitud POST")
                }
                else alert("Post comercial creado con éxito.")
            }
        } catch (error) {
            alert("Hubo un error. LLamen a Lauchita");
            console.log(error);
        }
    }

    return(
        <div className="admin-content">
            <h1 className="titulo-admin">Nuevo Posteo.</h1>
            <div className="tipo-content">
                <div className="tipo-div">
                    <input
                    className="tipo-box"
                    type="checkbox"
                    value="work"
                    checked={tipo === "work"}
                    onClick={handleTipoBox}
                    />
                    <label className="tipo-label">Trabajo</label>
                </div>
                <div className="tipo-div">
                    <input
                    className="tipo-box"
                    type="checkbox"
                    value="blog"
                    checked={tipo === "blog"}
                    onChange={handleTipoBox}
                    />
                    <label className="tipo-label">Blog</label>
                </div>
            </div>
            <div>
                {
                    tipo === "work" ?
                    <div className="form-content">
                        <h1 className="titulo-admin">Nuevo Trabajo.</h1>
                        <h3 className="form-label">Categoría</h3>
                        <div className="tipo-content">
                            <div className="tipo-div">
                                <input
                                className="tipo-box"
                                type="checkbox"
                                value="art"
                                checked={category === "art"}
                                onClick={handleCategoryBox}
                                />
                                <label className="tipo-label">Artístico</label>
                            </div>
                            <div className="tipo-div">
                                <input
                                className="tipo-box"
                                type="checkbox"
                                value="com"
                                checked={category === "com"}
                                onChange={handleCategoryBox}
                                />
                                <label className="tipo-label">Comercial</label>
                            </div>
                        </div>
                        <div>
                            <h3 className="form-label">Título</h3>
                            <input
                            placeholder="Título del post"
                            className="form-input"
                            name="titulo"
                            onChange={handleNewPost}
                            />

                            <h3 className="form-label">Subtítulo</h3>
                            <textarea
                            type="text-area"
                            placeholder="Subtítulo del post"
                            className="form-input"
                            name="subtitulo"
                            onChange={handleNewPost}
                            />

                            <h3 className="form-label">Fecha</h3>
                            <input
                            type="date"
                            className="form-input"
                            name="fecha"
                            onChange={handleNewPost}
                            />

                            <h3 className="form-label">Portada</h3>
                            <input
                            placeholder="URL de la imagen"
                            className="form-input"
                            name="imagen"
                            onChange={handleNewPost}
                            />
                            {
                                newPost.imagen ?
                                <div className="poster-thumb-div">
                                    <img className="thumbnail" src={newPost.imagen} alt="URL INVALIDA."/>
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
                            onChange={handleNewPost}
                            />

                            <div className="galeria-content">
                                <h3 className="form-label">Galería</h3>
                                {galeria.map((image, index) => (
                                    <div key={index}>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={image}
                                            placeholder="URL de la imagen"
                                            onChange={(e) => handleInputChangeGallery(index, e)}
                                        />
                                        <button className="galeria-button-men" onClick={() => handleRemoveInputGallery(index)}>✖</button>
                                    </div>
                                ))}
                                <button className="galeria-button-mas" onClick={handleAddInputGallery}>✚</button>
                                <div className="thumbnail-content">
                                {
                                    galeria.map(image =>(
                                        <img className="thumbnail" src={image} alt="URL INVALIDA. Al colocar una URL válida la imagen aparecerá aquí." />
                                    ))
                                }
                                </div>
                            </div>
                            <button className="send-button" onClick={handleSendPost}>Postear.</button>
                        </div>
                    </div>
                    :
                    <div>
                        <h3 className="form-label"> El formulario para blog está en desarrollo </h3>
                    </div>
                }
            </div>
        </div>
    );
}