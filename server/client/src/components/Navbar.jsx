import { NavLink } from "react-router-dom"; /*special kind of link that knows whether or not it is active, pending 
or transitioning. Used in place of a tags*/
import "./Navbar.css"
export const Navbar = () =>
{
    return(
    <>
    <header>
        <div className="container">
            <div className="logo-brand">
                <li><NavLink to="/">LearnSphere</NavLink></li>
            </div>
            <nav>
                <ul>
                    <li> <NavLink to="/"> Home </NavLink> </li>
                    <li> <NavLink to="/about"> About </NavLink> </li>
                    <li> <NavLink to="/contact"> Contact </NavLink> </li>
                    <li> <NavLink to="/services"> Services </NavLink> </li>
                    <li> <NavLink to="/register"> Register </NavLink> </li>
                    <li> <NavLink to="/login"> Login </NavLink> </li>
                </ul>
            </nav>
        </div>
    </header>
    </>
    );
};