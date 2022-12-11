import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.style.css";

const Navbar = () =>{
    return(
        <nav>
            <p className="logo"><b>DausReading</b></p>
            <NavLink
            to="/"
            style={({ isActive }) => (isActive ? { color : 'white',textDecoration:'none' , backgroundColor: 'black', padding:'10px', borderRadius:'10px'} : {textDecoration:'none', padding:'10px',  color:'black'})}
            >
                Home
            </NavLink>
            <NavLink
            to="/books"
            style={({ isActive }) => (isActive ? { color : 'white',textDecoration:'none' , backgroundColor: 'black', padding:'10px', borderRadius:'10px'} : {textDecoration:'none',padding:'10px', color:'black' })}>
                Books Data
            </NavLink>
            <NavLink
            to="/authors"
            style={({ isActive }) => (isActive ? {color : 'white',textDecoration:'none' , backgroundColor: 'black', padding:'10px', borderRadius:'10px'} : {textDecoration:'none',padding:'10px', color:'black'})}
            >
                Author data
            </NavLink>
        </nav>
    );
}

export default Navbar;