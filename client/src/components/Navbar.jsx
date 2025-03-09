import { NavLink, Outlet } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/Auth";
import { useState } from "react";

export const Navbar = () => {
    const { isLoggedIn, user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header>
                <div className="navbar">
                    <div className="logo-brand">
                        <img 
                            src="/images/navbar.png" 
                            alt="3 dots navbar"
                            width="30"
                            height="30"
                            onClick={() => setMenuOpen(!menuOpen)} // Toggle menu on click
                            className="responsive-navbar"
                        /> 
                        <li><NavLink to="/">LearnSphere</NavLink></li>
                    </div>
                    <div 
                        className={`nav-overlay ${menuOpen ? "open" : ""}`} 
                        onClick={() => setMenuOpen(false)} 
                    ></div>
                    <nav className={menuOpen ? "open" : "closed"}>  {/* Conditionally add "open" class */}
                        <ul>
                            <li onClick={() => setMenuOpen(false)} > <NavLink to="/"> Home </NavLink> </li>
                            <li onClick={() => setMenuOpen(false)} > <NavLink to="/about"> About </NavLink> </li>
                            {user.isAdmin ? 
                                <li onClick={() => setMenuOpen(false)} > <NavLink to="/admin/users"> Admin </NavLink> </li>
                                :
                                <>
                                <li onClick={() => setMenuOpen(false)} > <NavLink to="/contact"> Contact </NavLink> </li>
                                <li onClick={() => setMenuOpen(false)} > <NavLink to="/services"> Services </NavLink> </li>
                            </>}
                            {isLoggedIn ? 
                            <>
                            <li onClick={()=> setMenuOpen(false)}> <NavLink to="/courses"> Courses </NavLink> </li>
                            <li onClick={() => setMenuOpen(false)} > <NavLink to="/logout"> Logout </NavLink> </li>
                            </> :
                            <>
                                <li onClick={() => setMenuOpen(false)} > <NavLink to="/register"> Register </NavLink> </li>
                                <li onClick={() => setMenuOpen(false)} > <NavLink to="/login"> Login </NavLink> </li>
                            </>}
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet></Outlet>
        </>
    );
};
