import { NavLink } from "react-router-dom"; /*special kind of link that knows whether or not it is active, pending 
or transitioning. Used in place of a tags*/
import "./Navbar.css"
import { useAuth } from "../store/Auth";
import { useEffect, useState } from "react";

export const Navbar = () =>
{
    const {isLoggedIn} = useAuth();

    return(
    <>
    <header>
        <div className="container">
            <div className="logo-brand">
                <img 
                    src="/images/navbar.png" 
                    alt="3 dots navbar"
                    width="30"
                    height="30"
                /> 
                <li><NavLink to="/">LearnSphere</NavLink></li>
            </div>
            <nav>
                <ul>
                    <li> <NavLink to="/"> Home </NavLink> </li>
                    <li> <NavLink to="/about"> About </NavLink> </li>
                    <li> <NavLink to="/contact"> Contact </NavLink> </li>
                    <li> <NavLink to="/services"> Services </NavLink> </li>
                    {isLoggedIn ? 
                    <li> <NavLink to="/logout"> Logout </NavLink> </li>:
                    <>
                        <li> <NavLink to="/register"> Register </NavLink> </li>
                        <li> <NavLink to="/login"> Login </NavLink> </li>
                    </>}
                </ul>
            </nav>
        </div>
    </header>
    </>
    );
};