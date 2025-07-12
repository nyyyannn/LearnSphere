import { Navigate, NavLink, Outlet } from "react-router-dom";
import "./Admin-Layout.css"; 
import { FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../store/Auth";
import { FaHome } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";

export const AdminLayout = () =>
{
    const {user, isLoading} = useAuth();

    if(isLoading)
    {
        return <h1 className="container">Loading.....</h1>
    }

    if(!user.isAdmin)
    {
        return(
            <Navigate to="/"/>
        )
    }
    
    return(
        <>
            <header>
                <div className="container">
                    <nav className="navAdmin">
                        <ul>
                            <li> <NavLink to="/admin/users" className="navList"><FaUser className="icon"/> Users</NavLink></li>
                            <li> <NavLink to="/admin/contacts" className="navList"><FaMessage className="icon"/> Contacts</NavLink></li>
                            <li> <NavLink to="/admin/courses" className="navList"><FaBookOpen className="icon"/> Courses</NavLink></li>
                            <li> <NavLink to="/" className="navList"><FaHome className="icon"/> Home</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet></Outlet> {/*Required for nested routes */}
        </>
    )
}