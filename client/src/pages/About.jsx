import { useAuth } from "../store/Auth";
import { useState } from "react";

export const About = () => {

    const { user } = useAuth();

    return(
        <>
            <section className="about-section">
                <div className="container ">
                        <h1>Welcome{user.username ? ` ${user.username}!` : ` to LearnSphere!`}</h1>;                    
                    </div>
            </section>
        </>
    )
}