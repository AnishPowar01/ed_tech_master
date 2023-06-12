import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const {password, confirmPassword} = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const token = location.pathname.split('/').at(-1)

    dispatch(resetPassword(password,confirmPassword,token,navigate));
  };

  

  return (
    <div>
      {loading ? (
        <div>Spinner</div>
      ) : (
        <div>
          <h1>Choose New Password</h1>
          <p>Almost done. Enter your new password and youre all set.</p>

          <form onSubmit={handleOnSubmit}>
            <label>
              <p>New Password*</p>
           
            <input
              type={showPassword ? "text" : "password"}
              required
              name="password"
              value={password}
              onChange={handleOnChange}
            />
             </label>

            <label>
              <p>Confirm Password*</p>
           
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
            />
             </label>

             <button type="submit">
              Reset Password
             </button>
          </form>

          <div>
                <Link to= "/login">

                <p>Back to login</p>

                </Link>
              </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
