import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { useAuth } from "../../store/Auth";


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
                    <nav>
                        <ul>
                            <li> <NavLink to="/admin/users"><FaUser/> Users</NavLink></li>
                            <li> <NavLink to="/admin/contacts"><FaMessage/> Contacts</NavLink></li>
                            <li> <NavLink to="/services"> Services</NavLink></li>
                            <li> <NavLink to="/"> Home</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet></Outlet> {/*Required for nested routes */}
        </>
    )
}