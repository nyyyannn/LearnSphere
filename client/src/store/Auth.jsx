/*This code is creating an authentication context in React using the Context API.
The goal is to store an authentication token in the browser's localStorage so that the user stays logged in across page reloads.*/

import { useEffect } from "react";
import { createContext, useContext,useState } from "react"; 
//createContext: Creates a global storage in react where data can be shared across components (prevents prop drilling)
//useContext: Allows a component to access the data stored in that global storage 


export const AuthContext = createContext(); //returns a component that acts as global storage.

export const AuthProvider = ( {children} ) => //children is any component inside <AuthProvider></AuthProvider>
{
    const [token, setToken] = useState(localStorage.getItem('Token')); 
    const [user, setUser] = useState(""); // user contains userdata which is initially empty.
    const [isLoading, setIsLoading] = useState(true); //stay in loading state until you get the data (check userAuthenticaion function)
    const [services, setServices] = useState([]); 
    const [courses, setCourses] = useState([]);
    const authorizationToken = `Bearer ${token}`; //storing token in a variable;
    
    const API = import.meta.env.VITE_APP_URI_API;
    console.log(API);

    let isLoggedIn = !!token; //converts token to either truthsy or falsly value. If token is non empty string, true else false

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken); // setting the token value (to prevent the navbar needing to be refreshed on logging in)
        return localStorage.setItem('Token', serverToken); //saving token in local storage
    };

    //Logout Functionality
    const logoutUser = () =>
    {
        setUser(""); // resetting the user value
        setToken(""); // resetting the token value
        return localStorage.removeItem('Token'); // removing the token from local storage 
    }

    //JWT Authentication - to get currently logged in user data
    const userAuthentication = async () =>
    {
        try {
            setIsLoading(true);
            const response = await fetch(`${API}/api/auth/user`, {
                                    method:"GET",
                                    headers:
                                    {
                                        Authorization:authorizationToken
                                    }                      
        });
        if(response.ok)
        {
            const data = await response.json();
            setUser(data.userData); //contains object userData, hence the reason we used data.userData
            setIsLoading(false); 
        }
        else
        {
            console.error("Error fetching user data");
            setIsLoading(false);
        }

        } catch (error) {
            console.log("Error fetching user data");
        }
    }


    //to fetch services from the database
    const getServices = async() =>
    {
        try {
                const response = await fetch(`${API}/api/data/services`,
                {
                    method:"GET",
                    headers:{"Content-type":"application/json"}
                }
            )
            if(response.ok)
            {
                const data = await response.json();
                setServices(data.msg);
            }
        } catch (error) {
            console.log(`Service Error: ${error}`);
        }
    }

    const getCourses = async(req,res) =>
    {
        try
        {
            const response = await fetch(`${API}/api/data/courses`,
                {
                    method:"GET",
                    headers: {"content-type":"application/json"}
                }
            )
            if(response.ok)
            {
                const data = await response.json();
                setCourses(data.msg);
            }
        }
        catch(error)
        {
            console.log(`Courses error:${error}`);
        }
    }

    useEffect(()=>
    {
        getServices();
        getCourses();
    },[]);

    useEffect(()=>
    {
        userAuthentication();
    },[token]);

    return(
        <AuthContext.Provider value={{ storeTokenInLS, 
                                        logoutUser, 
                                        isLoggedIn, 
                                        user, 
                                        services,
                                        authorizationToken,
                                        isLoading,
                                        courses,
                                        API,
                                        getCourses
                                     }}>
            {children}
        </AuthContext.Provider>
    )
    //children can call (storeTokenInLS) 
}

export const useAuth = () => //function allows any component to access authetication data (custom hook)
{
    const authContextValue = useContext(AuthContext); //grabs the authetication functions from AuthProvider.
    if(!authContextValue)
    {
        throw new Error("useAuth used outside of Provider");
    }
    return authContextValue;
}

/*Final Analogy: The AuthContext as a Library
Imagine AuthContext is a library, and AuthProvider is the librarian who puts books (authentication functions) on the shelves.

AuthProvider stores books (functions) in the library.
useContext(AuthContext) acts like a person going to the library to borrow books.
useAuth() is like asking the librarian for a book.
If you try borrowing a book outside the library (using useAuth() outside AuthProvider), the librarian says:

"Error! You’re not in the library!"*/