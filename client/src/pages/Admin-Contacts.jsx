import { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { toast } from "react-toastify";
import "./AdminContacts.css";

export const AdminContacts = () => {
    const [contactData, setContactData] = useState([]);
    const { authorizationToken, API } = useAuth();

    const getContactsData = async () => {
        try {
            const response = await fetch(`${API}/api/admin/contact`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setContactData(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteContact = async (id) => {
        try {
            const response = await fetch(`${API}/api/admin/contact/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                setContactData(contactData.filter(contact => contact._id !== id));
                getContactsData();
                toast.success("Deletion successful", {
                                className: "Toastify",
                                style: { fontFamily: "Forum, sans-serif", fontSize: "1.8rem" },});
                
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getContactsData();
    }, []);

    return (
        <div className="admin-contacts-wrapper">
            <div className="admin-contacts-container">
                <div className="contact-header">
                    <p>Username</p>
                    <p>Email</p>
                    <p>Message</p>
                    <p>Action</p>
                </div>
                {contactData.map((cur) => (
                    <div className="contact-box" key={cur._id}>
                        <div className="contact-username"><p>{cur.username}</p></div>
                        <div className="contact-email"><p>{cur.email}</p></div>
                        <div className="contact-message"><p>{cur.message}</p></div>
                        <button className="delete-btn" onClick={() => deleteContact(cur._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
