import React, { useState } from "react";

export default function PostForm(){

    const staffAutho = sessionStorage.getItem("staffAutho");
    const [tipo, setTipo] = useState("work");
    const [category, setCategory] = useState("art");

     // Redireccionamiento condicional fuera del bloque de renderizado
     if (staffAutho !== 'Y') {
        window.location.href = "/admin";
        return null; // No renderizar nada más
    }

    function handleTipoBox (e){
        setTipo(e.target.value);
        console.log(tipo);
    }

    function handleCategoryBox(e){
        setCategory(e.target.value);
        console.log(category);
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
                    <div>
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
                            />

                            <h3 className="form-label">Subtítulo</h3>
                            <textarea
                            type="text-area"
                            placeholder="Subtítulo del post"
                            className="form-input"
                            />

                            <h3 className="form-label">Fecha</h3>
                            <input
                            type="date"
                            className="form-input"
                            />

                            <h3 className="form-label">Portada</h3>
                            <input
                            placeholder="URL de la imagen"
                            className="form-input"
                            />

                            <h3 className="form-label">Contenido</h3>
                            <textarea
                            type="text-area"
                            placeholder="Contenido del post"
                            className="form-input"
                            />
                        </div>
                    </div>
                    :
                    <div>
                    </div>
                }
            </div>
        </div>
    );
}