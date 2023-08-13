import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute"
import "./index.css";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Error from "./pages/Error"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Settings from "./components/core/Dashboard/Settings";
import Cart from "./components/core/Dashboard/Cart/index"

import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"

import {getUserDetails} from "./services/operations/profileAPI"
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useEffect } from "react";

function App() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { user } = useSelector((state)=> state.profile)

   useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
       <Navbar/>
       <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element = {<About/>}/>
      <Route path="/contact" element={<Contact />} />
      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

    <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

    <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />

    <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />

        <Route
        element = {
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>
        }
        >
              {/* Route for all users */}
             <Route path="dashboard/my-profile" element = {<MyProfile/>}/>
             <Route path="dashboard/Settings" element={<Settings />} />
             {/* Route only for Instructors */}

             {/* {
              user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                
                </>

              )

             } */}

             {/* Route only for student */}

             {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )}
             
             
        </Route>

     


        <Route path="*" element ={<Error/>} />

    </Routes>

    

    </div>
    

  );
}

export default App;
