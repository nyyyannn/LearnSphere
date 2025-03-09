import { useAuth } from "../store/Auth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Courses.css";

export const Courses = () => {
  const { user, courses } = useAuth();
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    setCourseList(courses); // Update the local state when courses change
  }, [courses]); // Depend on courses

  return (
    <>
      {user.username ? (
        <>
          <section className="container">
            <h1>Welcome {user.username}, ready to learn?</h1>
          </section>

          {courseList.length===0 ? 
          <div className="nocourses container">
            <h2>No courses available right now. Check back later or add one!</h2>
          </div> : 
          <div className="container grid-three-cols">
            {courseList.map(({ _id, name, duration, level }, index) => (
              <div className="courses" key={_id || index}>
                <div className="course">
                  <Link to={`/courses/${_id}`}>
                    <h2 className="courseheading">
                      Name: <p>{name}</p>
                    </h2>
                    <h2 className="courseheading">
                      Duration: <p>{duration}</p>
                    </h2>
                    <h2 className="courseheading">
                      Level: <p>{level}</p>
                    </h2>
                  </Link>
                </div>
              </div>
            ))}
          </div>}

          <div className="courses-button">
            <Link to="/courses/addCourses">
              <button>Add a course</button>
            </Link>
          </div>
        </>
      ) : (
        <h1 className="container">Please login to view the courses</h1>
      )}
    </>
  );
};
