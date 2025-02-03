import "./Error.css";

export const Error = ()=>
{
    return(
        <>
            <div className="error-container">
                <h2>Uh-oh! This page doesn't exist. Return to<a href="/"><h2>Home Page</h2></a>or<a href="/Contact"><h2>Report Problem</h2></a></h2>
                <img className="error-img"
                 src="/images/error-responsive.gif"/>
            </div>
        </>
    )
}