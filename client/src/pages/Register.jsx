import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify"; 
import "./Register.css";

export const Register =  () => {
    
    const [user, setUser] = useState({
        username:"",
        email:"",
        phone:"",
        password:"",
    }); {/*state variable, updated function = react hook*/}

    const navigate = useNavigate();

    const { storeTokenInLS, API } = useAuth(); //curly braces included cause we aren't using default export.

    //handling the input values
    const handleInput = (e) => //on clicking the input field, we get a event that can be used to get the values
    {
        let name = e.target.name; 
        let value = e.target.value; //fetches what the user has typed
        

        setUser({
            ...user, //dynamic values 
            [name]:value, //updates only the section that was updated (Each of the section have a name)
        })
    };
    
    //handling form submission
    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        const response = await fetch(`${API}/api/auth/register`//fetch returns a promise (which is type of object)
            //that acts as a placeholder until the data is computed. It is either resolved or rejected
        ,{ // this is an options object that contains details related to HTTP request (method, body, header, etc)
            method:"POST",
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify(user), //converts JavaScript Object to JSON
        })


        const res_data = await response.json();

        if(response.ok)
        {
            storeTokenInLS(res_data.token);
            setUser({
                username:"",
                email:"",
                phone:"",
                password:"",
            })
            toast.success("Registration successful", {
                className: "Toastify",
                style: { fontFamily: "Forum, sans-serif", fontSize: "1.8rem" },});
            navigate("/");
        }
        else
        {
            toast.error(res_data.extraDetails ? res_data.extraDetails :res_data.message, {
                className: "Toastify",
                style: { fontFamily: "Forum, sans-serif", fontSize: "1.8rem" },
            }); //Handling invalid input
        }
    }
    
    return <> 
        <section>
            <main>
                <div className="section-registration">
                    <div className="container">
                        <div className="registration-form">
                            <br/>
                            <form onSubmit = {handleSubmit} className="register-form"> {/*Order should be the same as the one in schema (user-model.js) */}
                                <div>
                                    <h1 className="main-heading">Registration</h1> 
                                    <label htmlFor="username">Username: </label>
                                    <input 
                                        type="text" 
                                        name="username"
                                        placeholder="Username" 
                                        id="username"
                                        required
                                        autoComplete="off"
                                        value = {user.username}
                                        onChange = {handleInput} 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="Email">Email: </label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        placeholder="Email" 
                                        id="email"
                                        required
                                        autoComplete="off"
                                        value = {user.email}
                                        onChange = {handleInput} 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone">Phone: </label>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        placeholder="1234567890" 
                                        id="phone"
                                        required
                                        autoComplete="off"
                                        pattern="[0-9]{10}"
                                        maxLength="10"
                                        value = {user.phone}
                                        onChange = {handleInput} 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">Password: </label>
                                    <input 
                                        type="password" 
                                        name="password"
                                        placeholder="Password" 
                                        id="password"
                                        required
                                        autoComplete="off"
                                        value = {user.password}
                                        onChange = {handleInput} 
                                    />
                                </div>                                
                                <br/>
                                <button type="submit" className="register-btn">
                                    Sign Up
                                </button>
                                <div className="signedup">
                                    <p>Already signed up? 
                                        <Link to="/login" className="signeduplogin"> Login </Link>
                                    </p>
                                </div>
                            </form>
                        </div>    
                    </div>
                </div>
            </main>
        </section>
    </>
}