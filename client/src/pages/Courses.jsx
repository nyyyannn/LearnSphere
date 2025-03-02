import { useAuth } from "../store/Auth";
import { Link } from "react-router-dom";
import "./Courses.css";

export const Courses = () => {
  const { user, courses } = useAuth();

  return (
    <>
      {user.username ? (
        <>
          <section className="container">
            <h1>Welcome {user.username}, ready to learn?</h1>
          </section>

          <div className="container grid-three-cols">
            {courses.map(({ _id, name, duration, level }, index) => (
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
          </div>

          <div className="courses-button">
            <Link to="/courses/addCourses">
              <button>Add a course</button>
            </Link>
          </div>
        </>
      ) : (
        <h1>Please login to view the courses</h1>
      )}
    </>
  );
};
