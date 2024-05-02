import React from "react";
import '../../styles/Navbar.css';
import logo from '../../images/LOGO.png';
import menuIcon from '../../images/burger-menu.png';
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar (){

    const [menu, setMenu] = useState(false);
    const [search, setSearch] = useState('');

    function handleMenu(e){
        e.preventDefault();
        setMenu(!menu)
    }

    function handleSearchBar (e){
        setSearch(e.target.value);
    }

    function handleEnterPress(e){
        if(e.key === "Enter"){
            console.log("se presionó Enter")
            window.location.href = '/search/' + search;
        }
    }

    return(
        <div className="navBar">
            <Link to='/'>
                <img className="logo" src= {logo} alt="logo"/>
            </Link>
            <div className="menu-div">
                <img className= "burger-menu" onClick = {(e)=> handleMenu(e)} src={menuIcon} alt="menu-burger-logo"/>
                {
                    menu === true ?
                    <div className="menu-container">
                        <Link className="link" to="/blog">
                            <p className="menu-label">Blog</p>
                        </Link>
                        <Link className="link" to="/staff">
                            <p className="menu-label">Staff</p>
                        </Link>
                    </div>
                    : null
                }
                <input 
                className="searchBar" 
                placeholder=" ⌕ Buscar..."
                onChange={handleSearchBar}
                onKeyDown={handleEnterPress}
                />
            </div>
        </div>
    )
}