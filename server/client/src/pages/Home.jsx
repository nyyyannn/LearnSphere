import "./Home.css";

export const Home = () => {
    return(
        <> 
            <main>
                <section className="section-hero">
                   <div className="titles">
                        <h1>Unlock your potential with Expert-led Courses</h1>
                        <h2>Learn at your own pace</h2>
                    </div>
                    <div className="buttons">
                        <a href="/">
                            <button>
                                Explore Courses
                            </button>
                        </a>
                        <a href="/register">
                            <button>
                                Sign up
                            </button>
                        </a>
                    </div>
                </section>
            </main>
        </>
    )
}