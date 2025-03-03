import { useParams } from "react-router-dom";
import { useAuth } from "../store/Auth";
import { useEffect, useState } from "react";
import "./CoursePage.css";

export const CoursePage = () =>
{
    const [singleCourseData, setSingleCourseData] = useState({});
    const params = useParams();
    const {authorizationToken, API} = useAuth();

    const getCourseData = async () =>
    {
        try
        {
            const response = await fetch(`${API}/api/data/courses/${params.id}`,
                {
                    method:"GET",
                    headers:{
                        Authorization: authorizationToken
                    }
                }
            )
            const data = await response.json();
            setSingleCourseData(data);
        }   
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(()=>
    {
        getCourseData();
    },[])


    return (
        <div className="coursePage">
            <h1>{singleCourseData.name}</h1>
            <h2>{singleCourseData.description}</h2>
    
            <p><span>Duration:</span> {singleCourseData.duration}</p>
            <p><span>Level:</span> {singleCourseData.level}</p>
            <p><span>Syllabus:</span> {singleCourseData.syllabus}</p>
            <p><span>Prerequisites:</span> {singleCourseData.prerequisites}</p>
            <p><span>URL:</span> <a href={singleCourseData.url} target="_blank" rel="noopener noreferrer">{singleCourseData.url}</a></p>
            <p><span>Added by:</span> {singleCourseData.user}</p>
        </div>
    );
    
    
}