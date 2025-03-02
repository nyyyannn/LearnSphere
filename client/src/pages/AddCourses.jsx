import { useState } from "react";
import "./AddCourses.css";
import { toast } from "react-toastify";
import { useAuth } from "../store/Auth";
import {useEffect} from "react";

export const AddCourses = () =>
{
    const [courseData, setCourseData] = useState({
        name:"",
        duration:"",
        description:"",
        level: "",
        url:""
    });


    const { user, API } = useAuth(); 

    const handleInput = (e) =>
    {
        let name = e.target.name;
        let value = e.target.value;

        setCourseData(
            {
                ...courseData,
                [name]:value
            }
        )
    }

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        if(user)
        {
            const response = await fetch(`${API}/api/form/addCourses`,
                {
                    method:"POST",
                    headers:
                    {
                        "Content-type":"application/json"
                    },
                    body: JSON.stringify(courseData)
                }
            )
            if(response.ok)
            {
                setCourseData({
                    name: "",
                    duration:"",
                    description: "",
                    level: "",
                    url:""
                })
                toast.success("Course posted successfully", {
                    className: "Toastify",
                    style: { fontFamily: "Forum, sans-serif", fontSize: "1.8rem" },});
            }
        }
        else
        {
            toast.error("Please login to post a course", {
                                            className: "Toastify",
                                            style: { fontFamily: "Forum, sans-serif", fontSize: "1.8rem" },
                        });
        }
    }
    

    return(
        <>
            <div className="section-registration">
                    <div className="container">
                        <div className="registration-form">
                            <br/>
                            <form onSubmit = {handleSubmit} className="register-form">
                                <div>
                                    <h1 className="main-heading">Add Course</h1> 
                                    <label htmlFor="name">Name: </label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        placeholder="Name of the course" 
                                        id="name"
                                        required
                                        autoComplete="off"
                                        value = {courseData.name}
                                        onChange = {handleInput} 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="duration">Duration: </label>
                                    <input 
                                        type="text" 
                                        name="duration"
                                        placeholder="Duration in hours" 
                                        id="duration"
                                        required
                                        autoComplete="off"
                                        value = {courseData.duration}
                                        onChange = {handleInput} 
                                    />
                                </div>
                                <div>
                                <label htmlFor="description">Description: </label>
                                        <textarea
                                            name="description"
                                            placeholder="Describe the course in a few words"
                                            id="description"
                                            required
                                            autoComplete="off"
                                            value={courseData.description}
                                            onChange={handleInput}
                                            rows="5"/>
                                </div>
                                <div>
                                    <label htmlFor="level">Level: </label>
                                    <input 
                                        type="text" 
                                        name="level"
                                        placeholder="Eg: Beginner-friendly"
                                        id="level"
                                        required
                                        autoComplete="off"
                                        value = {courseData.level}
                                        onChange = {handleInput} 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="url">URL: </label>
                                    <input 
                                        type="text" 
                                        name="url"
                                        placeholder="Link to your Course" 
                                        id="url"
                                        required
                                        autoComplete="off"
                                        value = {courseData.url}
                                        onChange = {handleInput} 
                                    />
                                </div>                                
                                <br/>
                                <button type="submit" className="register-btn">
                                    Add Course
                                </button>
                            </form>
                        </div>    
                    </div>
                </div>
        </>
    )

}