import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";

import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";

import { categories } from "../../services/apis";

import { apiConnector } from "../../services/apiConnector";

import {IoIosArrowDown} from "react-icons/io"


// for testing purpose

// const subLinks = [
//     {
//         title : "Python",
//         link : "/catalog/python",
//     },

//     {
//         title : "Web Development",
//         link : "/catalog/web-development",

//     }
// ]

const Navbar = () => {
  // fetch the states

  const { token } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.profile);

  const { totalItems } = useSelector((state) => state.cart);

  const location = useLocation();
  // current tab
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // API CALL FOR get course categories

  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks =  async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);

      console.log("Printing results", result);

      setSubLinks(result.data.data);
    } catch (error) {
      console.log("Could not fetch the category list");
    }
  };

  useEffect(() => {

    fetchSubLinks()

  }, []);

  return (
    // top div
    <div className="flex h-14 items-center justify-center border-b-[1px] border-richblack-700 ">
      <div className=" flex w-11/12 max-w-maxContent items-center justify-between">
        {/* logo */}

        <Link to="/">
          <img src={logo} width={160} height={42} alt="" />
        </Link>

        {/* Nav Links */}

        <nav>
          <ul className="flex items-center gap-x-6 text-richblack-25">
            {NavbarLinks.map((links, index) => {
              return (
                <li key={index}>
                  {links.title === "Catalog" ? (

                    <div className=" relative flex items-center gap-1 justify-center group">
                    <p>{links.title}</p>
                    <IoIosArrowDown/>

                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]
                     ">

                     {/* diamond shape div */}

                     <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5">

                     </div>

                     {/* data  */}

                     {

                        subLinks.length ? (
                            subLinks.map((subLink, index)=>(
                                <Link className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50" key={index} to={`${subLink.link}`}>

                                <p>{subLink.title}</p>

                                </Link>
                            ))
                        ) : (
                            <div></div>
                        )
                        
                     }

                    </div>

                    </div>
                  ) : (
                    <Link to={links?.path}>
                      {/* given a color based on condition.. written in matchRoute function */}
                      <p
                        className={`${
                          matchRoute(links?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {links.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* login/signup/dashboard */}

        {/* time to call api now */}
        {/* if token present show cart icon */}
        {/* if token not present show login signup button */}
        {/* extract token if it is instructor hide the add cart icon */}
        <div className="flex gap-x-4 items-center">
          {user && user?.accountType != "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart />

              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md ">
                Log In
              </button>
            </Link>
          )}

          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md ">
                Sign Up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
