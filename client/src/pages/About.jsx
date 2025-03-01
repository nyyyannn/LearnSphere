import { useAuth } from "../store/Auth";
import { useEffect, useState } from "react";
import "./About.css";

export const About = () => {

    const { user } = useAuth();
  
    return(
        <>
            <section className="container about-section">
            <h1>Welcome{user.username ? ` ${user.username}!` : ` to LearnSphere!`}</h1>
                <div className="container about">
                  <div className="why-choose-us">
                    <p className="points"><b>Structured Learning, Simplified</b> – Our courses are designed with a clear and easy-to-follow structure, ensuring that even complex topics are broken down into simple, digestible lessons. Whether you're a beginner or looking to refine your skills, our content is tailored for smooth learning.</p>
                    <p className="points"><b>Accessible Anytime, Anywhere</b> – Learning should fit into your schedule, not the other way around. With 24/7 access to all courses on any device, you can study at your own pace, whether you're at home, commuting, or taking a break.</p>
                    <p className="points"><b>Practical & Engaging Content</b> – We go beyond theory by providing hands-on projects, real-world examples, and interactive lessons that make learning both engaging and applicable. You won’t just learn concepts—you’ll know how to use them effectively.</p>
                    <p className="points"><b>Affordable & Beginner-Friendly</b> – Quality education shouldn't be expensive or intimidating. Our courses are designed to be beginner-friendly, offering clear guidance at every step while keeping costs low so that everyone can access valuable knowledge.</p>
                  </div>
                  <div className="picture">
                    <img src="/images/whychooseus.jpg" alt="about us pic" />
                  </div>
                </div>              
            </section>
        </>
    )
}