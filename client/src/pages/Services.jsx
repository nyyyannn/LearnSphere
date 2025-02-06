export const Services = () => {

    const services = async() =>
    {
        try {
                const response = await fetch("http://localhost:5000/api/data/services",
                {
                    method:"GET",
                    headers:{"Content-type":"application/json"}
                }
            )
            if(response.ok)
            {
                console.log(response);
            }
        } catch (error) {
            console.log(`Service Error: ${error}`);
        }
    }


    return <h1>Hello from the Services page</h1>;
}
