import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/Auth";

export const Login = () => {

    const [user, setUser] = useState({
        email:"",
        password:""
    });

    const navigate = useNavigate();

    const { storeTokenInLS } = useAuth();

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
            const response = await fetch("http://localhost:5000/api/auth/login",
                {
                    method:"POST",
                    headers:
                    {
                        "Content-type":"application/json"
                    },
                    body:JSON.stringify(user)
                }
            )
            if(response.ok)
                {
                    const res_data = await response.json();
                    storeTokenInLS(res_data.token);
                    alert("Login successful");
                    setUser({
                        email:"",
                        passowrd:"",
                    })
                    navigate("/");
                }
                else
                {
                    alert("Invalid credentials");
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
                <div className="container grid grid-two-cols">
                    <div className="login-image">
                        <img 
                            src="/images/login.jpg"
                            alt="login form"
                            width="400"
                            height="500"
                        />
                    </div>
                    <div className="login-form">
                        <h1 className="main-heading">Login</h1>
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
                            <button>
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </section>
    </>
}