import { useState } from "react";
export const Login = () => {

    const [user, setUser] = useState({
        username:"",
        password:""
    });

    const handleInput = (e) =>
    {
        let name = e.target.name;
        let value = e.target.value;
        
        setUser({
            ...user,
            [name]:value
        })
    }

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        alert(user);
    }

    return <>
    <section>
        <main>
            <div className="section-login">
                <div className="container grid grid-two-cols">
                    <div className="login-image">
                        <img 
                            src="/images/login.png"
                            alt="login form"
                            width="400"
                            height="500"
                        />
                    </div>
                    <div className="login-form">
                        <h1 className="main-heading">Login</h1>
                        <br/>
                        <form>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input 
                                    type="text"
                                    name="username"
                                    placeholder="Username" 
                                    id="username"
                                    required
                                    autoComplete="off"
                                    value={user.username}
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
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </section>
    </>
}