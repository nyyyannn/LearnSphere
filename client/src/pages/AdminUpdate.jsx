import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";

export const AdminUpdate = () =>
{

    const [data, setData] = useState(
        {
            username:"",
            email:"",
            phone:""
        }
    );

    const params = useParams();
    const {authorizationToken} = useAuth();

    const getSingleUserData = async () =>
    {
        try
        {
            const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`,
                {
                    method:"GET",
                    headers:{
                        Authorization: authorizationToken //necessary to pass to check if admin is deleting
                    }
                }
            )
            const data = await response.json();
            console.log(`After update: ${data}`);
            setData(data);
        }   
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(()=>
    {
        getSingleUserData();
    },[])

    const handleInput = (e) => //ensuring the data in the form can be edited
    {
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]:value,
        })
    }


    //to update the data
    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        try
        {
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`,
                {
                    method:"PATCH",
                    headers:{
                        "Content-type":"application/json", //content being sent is json type (check admin controller, the data is converted to json)
                        Authorization: authorizationToken //necessary to pass to check if admin is deleting
                    },
                    body:JSON.stringify(data),
                }
            );
            if(response.ok)
            {
                toast.success("Updated successfully", {
                    className: "Toastify",
                    style: { fontFamily: "Forum, sans-serif", fontSize: "1.8rem" },
                });
            }
            else
            {
                toast.error("Error updating data", {
                    className: "Toastify",
                    style: { fontFamily: "Forum, sans-serif", fontSize: "1.8rem" },
                });
            }

        }
        catch(error)
        {
            console.log(error);
        }
    }

    return(
        <>
        <section className="update-container">
                    <h1>Edit data</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username: </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                id="username"
                                required
                                autoComplete="off"
                                value={data.username}
                                onChange={handleInput}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email: </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                id="email"
                                required
                                autoComplete="off"
                                value={data.email}
                                onChange={handleInput}/>
                        </div>
                        <div>
                        <label htmlFor="phone">Phone: </label>
                            <input
                                type="phone"
                                name="phone"
                                placeholder="Phone"
                                id="phone"
                                required
                                autoComplete="off"
                                value={data.phone}
                                pattern="[0-9]{10}"
                                maxLength="10"
                                onChange={handleInput}/>
                                
                        </div>
                        <button type="submit" className="contact-button">
                            Update
                        </button>
                    </form>
            </section>
        </>
    )
}
