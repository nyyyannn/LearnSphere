import { useState } from "react";
import "./Contact.css";
import { useAuth } from "../store/Auth";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const Contact = () => {

    const [contact, setContact] = useState({
        username:"",
        email:"",
        message:""
    });

    const [userData, setUserData] = useState(true); 

    const { user, API } = useAuth(); //gets user data, if it exists, otherwise null

    useEffect(() => {
        if (user && userData) {
            setContact({
                username: user.username,
                email: user.email,
                message: ""
            });
    
            setUserData(false); // to prevent infinite re-renders.
        }
    }, [user, userData]); // Runs when `user` or `userData` changes
    
    
    const handleInput = (e) =>
    {
        let name = e.target.name;
        let value = e.target.value;
    
        setContact(
            {
                ...contact,
                [name]:value
            }
        )
    }
    
    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        if(user)
        {
            const response = await fetch(`${API}/api/form/contact`, 
                                        {
                                            method:"POST",
                                            headers:
                                            {
                                                "Content-Type":"application/json"
                                            },
                                            body: JSON.stringify(contact)
                                        }                           
            );
            if(response.ok)
            {
                setContact({
                    username: user.username,
                    email: user.email,
                    message: ""
                })
                toast.success("Message sent successfully", {
                                className: "Toastify",
                                style: { fontFamily: "Forum, sans-serif", fontSize: "1.8rem" },});
            }
        }
        else
        {
            toast.error("Please login to send a message", {
                            className: "Toastify",
                            style: { fontFamily: "Forum, sans-serif", fontSize: "1.8rem" },
                        });
        }

    }


    return(
        <>
            <section className="contact-container">
                <div className="left-side-contact">
                    <div className="contact-image">
                        <img 
                            src="/images/contact.png"
                            alt="Contact us"
                            width="550"
                            height="480"/>
                    </div>
                </div>
                <div className="right-side-contact">
                    <h1>Contact us</h1>
                    <form onSubmit = {handleSubmit}>
                        <div>
                            <label htmlFor="username">Username: </label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                id="username"
                                required
                                autoComplete="off"
                                value={contact.username}
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
                                value={contact.email}
                                onChange={handleInput}/>
                        </div>
                        <div>
                            <label htmlFor="message">Message: </label>
                            <textarea
                                name="message"
                                placeholder="Enter your message here"
                                id="message"
                                required
                                autoComplete="off"
                                value={contact.message}
                                onChange={handleInput}
                                rows="5"/>
                                
                        </div>
                        <button type="submit" className="contact-button">
                            Submit
                        </button>
                    </form>
                </div>
            </section>
            <h1 className="dropBy">
                Or feel free to drop by!
            </h1>
            <section className="map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.290907037379!2d77.5606146747054!3d12.889006387418787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1558f57f244f%3A0x6207554ad7440bac!2sForum%20Mall%20Rd%2C%20Anjanadri%20Layout%2C%20Konanakunte%2C%20Bengaluru%2C%20Karnataka%20560062!5e0!3m2!1sen!2sin!4v1738593472379!5m2!1sen!2sin" width="100%" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </section>
        </>
    )
}