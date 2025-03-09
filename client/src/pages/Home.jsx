import "./Home.css";
import { useAuth } from "../store/Auth";
import { Link } from "react-router-dom";

export const Home = () => {
    const { isLoggedIn } = useAuth();

    return (
        <> 
            <main>
                <section className="section-hero">
                    <div className="container-hero-and-image">
                        <div className="left-side">
                            <div className="titles">
                                <h1>Empower, Learn, Teach – All in One Place!</h1>
                                <h2>At no cost! (except your time)</h2>
                            </div>
                            <div className="buttons">
                                {isLoggedIn ? (
                                    <>
                                        <Link to="/services">
                                            <button>View Services</button>
                                        </Link>
                                        <Link to="/courses">
                                            <button>Explore courses</button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/services">
                                            <button>View Services</button>
                                        </Link>
                                        <Link to="/register">
                                            <button>Sign up</button>
                                        </Link>
                                    </>
                                )}
                            </div>
                            <h2>Join over 300k learners worldwide.</h2>
                        </div>
                        <div className="right-side">
                            <img 
                                src="https://clipart-library.com/img/1980486.gif" 
                                width="500" height="500" 
                                alt="Learning GIF" 
                            />
                        </div>
                    </div>
                    <div className="facts">
                        <div>
                            <h2>50+</h2>
                            <h2>Registered Companies</h2>
                        </div>
                        <div>
                            <h2>300k+</h2>
                            <h2>Happy Learners</h2>
                        </div>
                        <div>
                            <h2>500+</h2>
                            <h2>Certified Mentors</h2>
                        </div>
                        <div>
                            <h2>24/7</h2>
                            <h2>Service</h2>
                        </div>
                    </div>
                    <div className="get-started-today">
                        <div className="get-started-img">
                            <img 
                                src="/images/startNow.gif" 
                                alt="get started now"
                                width="450"
                                height="450" 
                            />
                        </div>
                        <div className="get-started-info">
                            <small>We are here to help you</small>
                            <h1>Get started today</h1>
                            <p>
                                Start your journey today! Don’t wait for the "perfect moment"—the best time to learn is now. Gain real skills, master new concepts, and take control of your future. Feel free to get in touch with us.
                            </p>
                            <div className="buttons-get-started">
                                <Link to="/contact">
                                    <button>Contact us</button>
                                </Link>
                                <Link to="/about">
                                    <button>About</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};
