import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/Auth";
import "./Admin-Users.css";

export const AdminUsers = () =>
{
    const [users, setUsers] = useState([]);
    const {authorizationToken} = useAuth();

    const getAllUserData = async() =>
    {
        try
        {
            const response = await fetch(`http://localhost:5000/api/admin/users`,
                {
                    method:"GET",
                    headers:{
                        Authorization: authorizationToken
                    }
                }
            )
            const data = await response.json(response);
            setUsers(data);
        }   
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(()=>
    {
        getAllUserData();
    },[]);

    const deleteUser = async (id) =>
    {
        try
        {
            const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`,
                {
                    method:"DELETE",
                    headers:{
                        Authorization: authorizationToken //necessary to pass to check if admin is deleting
                    }
                }
            )
            if(response.ok)
            {
                getAllUserData(); //to prevent the need to refresh after deleting a user
            }
        }   
        catch(error)
        {
            console.log(error);
        }
    }

    return(
        <>
           <section className="admin-page">
           <h1 className="adminHeading">User data</h1>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                            <th>Name </th>
                            <th>Email </th>
                            <th>Phone </th>
                            <th>Update </th>
                            <th>Delete </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((curUser,index)=>
                        {
                            return <tr key={index}>
                                <td>{curUser.username}</td>
                                <td>{curUser.email}</td>
                                <td>{curUser.phone}</td>
                                <td><Link to={`/admin/users/${curUser._id}/edit`}><button className="edit-button">Edit</button></Link></td>
                                <td><button className="delete-button" onClick={()=> deleteUser(curUser._id)}>Delete</button></td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
           </section>
        </>
    )
}