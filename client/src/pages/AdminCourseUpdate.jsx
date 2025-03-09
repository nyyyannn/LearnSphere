import { useEffect, useState } from "react";
import { useAuth } from "../store/Auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const AdminCourseUpdate = () =>
{

    const { user, API, authorizationToken, getCourses } = useAuth(); 

    const navigate = useNavigate();

    const [courseData, setCourseData] = useState(
        {
            name:"",
            duration:"",
            description:"",
            level: "",
            url:"",
            syllabus:"",
            prerequisites:"",
            user:user.username
        }
    )

    const params = useParams();

    const getSingleCourseData = async()=>
    {
        try
        {
            const response = await fetch(`${API}/api/admin/courses/${params.id}`,
                {
                    method:"GET",
                    headers:{
                        authorization: authorizationToken
                    }
                }
            )
            const data = await response.json();
            setCourseData(data);
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(()=>
    {
        getSingleCourseData();
    },[])

    const handleInput = (e) => //ensuring the data in the form can be edited
    {
        let name = e.target.name;
        let value = e.target.value;

        setCourseData({
            ...courseData,
            [name]:value,
        })
    }

    const handleSubmit = async(e) =>
    {
        e.preventDefault();
        try
        {
            const response = await fetch(`${API}/api/admin/courses/update/${params.id}`,
                {
                    method:"PATCH",
                    headers:{
                        "Content-type":"application/json", //content being sent is json type (check admin controller, the data is converted to json)
                        Authorization: authorizationToken //necessary to pass to check if admin is deleting
                    },
                    body:JSON.stringify(courseData),
                }
            );
            if(response.ok)
            {
                getCourses();
                toast.success("Updated successfully", {
                    className: "Toastify",
                    style: { fontFamily: "Forum, sans-serif", fontSize: "1.8rem" },
                });
                navigate("/admin/courses");
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
            <div className="section-registration">
                    <div className="container">
                        <div className="registration-form">
                            <br/>
                            <form onSubmit={handleSubmit} className="register-form">
                                <div>
                                    <h1 className="main-heading">Update Course</h1> 
                                    <label htmlFor="name">Name: </label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        placeholder="Name of the course" 
                                        id="name"
                                        required
                                        autoComplete="off"
                                        value={courseData.name}
                                        onChange={handleInput} 
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
                                        value={courseData.duration}
                                        onChange={handleInput} 
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
                                        value={courseData.level}
                                        onChange={handleInput} 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="url">URL: </label>
                                    <input 
                                        type="url" 
                                        name="url"
                                        placeholder="Link (with https://)" 
                                        id="url"
                                        required
                                        autoComplete="off"
                                        value={courseData.url}
                                        onChange={handleInput} 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="syllabus">Syllabus: </label>
                                    <textarea
                                        type="text" 
                                        name="syllabus" 
                                        placeholder="What shall be covered in the course?" 
                                        id="syllabus"
                                        required
                                        autoComplete="off"
                                        value={courseData.syllabus}
                                        onChange={handleInput} 
                                        rows={5}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="prerequisites">Prerequisites: </label>
                                    <textarea
                                        type="text" 
                                        name="prerequisites"
                                        placeholder="Prior knowledge (if any) required to complete the course" 
                                        id="prerequisites"
                                        required
                                        autoComplete="off"
                                        value={courseData.prerequisites}
                                        onChange={handleInput} 
                                        rows={5}
                                    />
                                </div>  
                                <div>
                                    <label htmlFor="user">Added by: </label>
                                    <input 
                                        type="text" 
                                        name="user"
                                        id="user"
                                        autoComplete="off"
                                        disabled
                                        value={user.username}
                                    />
                                </div>                              
                                <br/>
                                <button type="submit" className="register-btn">
                                    Update Course
                                </button>
                            </form>
                        </div>    
                    </div>
                </div>
        </>
    )
}