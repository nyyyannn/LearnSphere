import {BrowserRouter,Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home"; //curly braces are included cause we are directly exporting. export const Home....
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Services } from "./pages/Services";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";
import { Register } from "./pages/Register";
import { Courses } from "./pages/Courses";
import { CoursePage } from "./pages/CoursePage";
import { AddCourses } from "./pages/AddCourses";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Error } from "./pages/Error";
import { AdminLayout } from "./layouts/Admin-Layout";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminUpdate } from "./pages/AdminUpdate";
import { AdminCourses } from "./pages/AdminCourses";
import { AdminCourseUpdate } from "./pages/AdminCourseUpdate";

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
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/courses/addCourses" element={<AddCourses/>}/>
        <Route path="/courses/:id" element={<CoursePage/>}/>
        <Route path="*" element={<Error/>}/> {/* *=wildcard redirects to the page mentioned in element if the user enters a route other than the ones specified */}
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="users" element={<AdminUsers/>}/>
          <Route path="contacts" element={<AdminContacts/>}/>
          <Route path="users/:id/edit" element={<AdminUpdate/>}/>
          <Route path="courses" element={<AdminCourses/>}/>
          <Route path="courses/:id/edit" element={<AdminCourseUpdate/>}/>
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  </>
  )
}
//BrowserRouter: Used to keep the UI in sync with the URL.
//Route: Void element with no opening tag. 
export default App;