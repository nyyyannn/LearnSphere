import {BrowserRouter,Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home"; //curly braces are included cause we are directly exporting. export const Home....
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Services } from "./pages/Services";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Error } from "./pages/Error";

//BrowserRouter: Used to keep the UI in sync with the URL.
//Route: Void element with no opening tag. 

const App = () => {
  return( 
  <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/> {/*we pass the component to the element*/}
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="*" element={<Error/>}/> {/* *=wildcard redirects to the page mentioned in element if the user enters a route other than the ones specified */}
      </Routes>
      <Footer/>
    </BrowserRouter>
  </>
  )
}
//BrowserRouter: Used to keep the UI in sync with the URL.
//Route: Void element with no opening tag. 
export default App;