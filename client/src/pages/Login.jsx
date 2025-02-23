import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";
import "./Login.css";

export const Login = () => {

    const [user, setUser] = useState({
        email:"",
        password:""
    });

    const navigate = useNavigate();

    const { storeTokenInLS, API } = useAuth();

    const handleInput = (e) =>
    {
        let name = e.target.name;
        let value = e.target.value;
        
        setUser({
            ...user,
            [name]:value
        })
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        try {
            const response = await fetch(`${API}/api/auth/login`,
                {
                    method:"POST",
                    headers:
                    {
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify(user)
                }
            )

            const res_data = await response.json();

            if(response.ok)
                {
                    storeTokenInLS(res_data.token);
                    setUser({
                        email:"",
                        passowrd:"",
                    })
                    toast.success("Login successful", {
                        className: "Toastify",
                        style: { fontFamily: "Forum, sans-serif", fontSize: "1.8rem" },
                    });
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
        catch (error) {
            console.log(error);
        }
    }

    return <>
    <section>
        <main>
            <div className="section-login">
                <div className="container">
                    <div className="login-form">
                        <h1 className>Login</h1>
                        <br/>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="text"
                                    name="email"
                                    placeholder="Email" 
                                    id="email"
                                    required
                                    autoComplete="off"
                                    value={user.email}
                                    onChange={handleInput}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    name="password"
                                    placeholder="Password" 
                                    id="password"
                                    required
                                    autoComplete="off"
                                    value={user.password}
                                    onChange={handleInput}
                                />
                            </div>
                            <button className="login-btn">
                                Login
                            </button>
                            <div className="signedup">
                                <p>New here?
                                    <a href="/login" className="signeduplogin"> Sign Up! </a>
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