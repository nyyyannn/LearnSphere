import {BrowserRouter,Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home"; //curly braces are included cause we are directly exporting. export const Home....
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Services } from "./pages/Services";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

//BrowserRouter: Used to keep the UI in sync with the URL.
//Route: Void element with no opening tag. 

const App = () => {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/> {/*we pass the component to the element*/}
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/services" element={<Services/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
  </Routes>
  </BrowserRouter>;
};
//BrowserRouter: Used to keep the UI in sync with the URL.
//Route: Void element with no opening tag. 
export default App;