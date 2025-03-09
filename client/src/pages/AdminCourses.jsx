import { useState, useEffect } from "react";
import { useAuth } from "../store/Auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; 

export const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const { authorizationToken, API, getCourses } = useAuth();

    const getAllCourses = async () => {
        try {
            const response = await fetch(`${API}/api/admin/courses`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.log("Error fetching courses:", error);
        }
    };

    // useEffect should have an empty dependency array to run once
    useEffect(() => {
        getAllCourses();
    }, []);

    const deleteCourse = async (id) => {
        try {
            const response = await fetch(`${API}/api/admin/courses/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                getCourses();
                toast.success("Deletion successful", {
                    className: "Toastify",
                    style: { fontFamily: "Forum, sans-serif", fontSize: "1.8rem" },
                });
            } else {
                toast.error("Failed to delete course.");
            }
        } catch (error) {
            console.log("Error deleting course:", error);
        }
    };

    return (
        <>
            <section className="admin-page">
                <h1 className="adminHeading">Courses data</h1>
                <div className="container admin-users">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Duration</th>
                                <th>Level</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.length > 0 ? (
                                courses.map((course, index) => (
                                    <tr key={index}>
                                        <td>{course.name}</td>
                                        <td>{course.duration}</td>
                                        <td>{course.level}</td>
                                        <td>
                                            <Link to={`/admin/courses/${course._id}/edit`}>
                                                <button className="edit-button">Edit</button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button
                                                className="delete-button"
                                                onClick={() => deleteCourse(course._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>No courses available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};
