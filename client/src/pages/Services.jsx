import { useAuth } from "../store/Auth";
import "./Services.css";

export const Services = () => {
    const { services } = useAuth();

    return (
        <>
            <section className="section-services">
                <div className="service-main-heading">
                    <h1>Services</h1>
                </div>
                <div className="container grid-three-cols">
                    {services.map((curElem, index) => {
                        const { service, description } = curElem;
                        return (
                            <div className="card" key={index}>
                                <div className="card-image">
                                    <img 
                                        src="/images/services.png" 
                                        alt="card-image"
                                        width="300px"
                                        height="300px" 
                                    />
                                </div>
                                <div className="card-details">
                                    <h2>{service}</h2>
                                    <p>{description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
};