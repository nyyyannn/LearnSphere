/*This code is creating an authentication context in React using the Context API.
The goal is to store an authentication token in the browser's localStorage so that the user stays logged in across page reloads.*/

import { createContext, useContext,useState } from "react"; 
//createContext: Creates a global storage in react where data can be shared across components (prevents prop drilling)
//useContext: Allows a component to access the data stored in that global storage 


export const AuthContext = createContext(); //returns a component that acts as global storage.

export const AuthProvider = ( {children} ) => //children is any component inside <AuthProvider></AuthProvider>
{
    const [token, setToken] = useState(localStorage.getItem('Token'));

    let isLoggedIn = !!token;

    const storeTokenInLS = (serverToken) => {
        return localStorage.setItem('Token', serverToken); //saving token in local storage
    };

    //Logout Functionality
    const logoutUser = () =>
    {
        setToken(""); // resetting the token value
        return localStorage.removeItem('Token'); // removing the token from local storage    }
    }

    return(
        <AuthContext.Provider value={{ storeTokenInLS, logoutUser, isLoggedIn }}>
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
        throw new error("useAuth used outside of Provider");
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