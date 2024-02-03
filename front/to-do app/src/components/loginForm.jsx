import React, { useState } from "react";
import "../styles/loginForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {set}from "../../reduxStore/userSlice";
// Your code here

function LoginForm() {
  
  const initialLoginState = localStorage.getItem("isLogin") === "true";
  const [isLogin, setIsLogin] = useState(initialLoginState);
  const navigate = useNavigate();
  const toggleForm = () => {
    const newLoginState = !isLogin;
    setIsLogin(newLoginState);
    localStorage.setItem("isLogin", newLoginState.toString());
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data = {
    username,
    email: !isLogin ? "" : email,
    password,
  };
  const [err,setErr] = useState(null);

  const user =useSelector((state) =>state.user)
  const dispatch =useDispatch();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (!isLogin) {
        response = await axios.post("http://localhost:3002/auth/signin", data);
      } else {
        response = await axios.post(
          "http://localhost:3002/auth/register",
          data
        );
      }
      dispatch(set({user:response.data.user}))
      
      console.log(response.data); // Handle the response as needed
      navigate("/home");
    } catch (error) {
      console.error("API request failed:", error);
      setErr("username and password don't match !")
    }
  };
  return (
    <div className="container1">
      <h1>{!isLogin ? "Log in" : "Sign up"}</h1>
      <form className="form_box">
        <input
          type="text"
          id="1"
          placeholder="username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {!isLogin ? null : (
          <input
            type="email"
            id="2"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        <input
          type="password"
          id="3"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="buttons">
          <button className="buttonCustom" onClick={handleSubmit}>
            {!isLogin ? "Log in" : "Create account"}
          </button>
          <button className="buttonCustom" onClick={toggleForm}>
            {!isLogin ? "Sign up ?" : "Log in ?"}
          </button>
        </div>
        <div className="error-message" role="alert" >{ !isLogin? err:""}</div>
      </form>
     
    </div>
  );
}

export default LoginForm;
