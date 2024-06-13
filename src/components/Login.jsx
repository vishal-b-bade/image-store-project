import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, loginUser } from "../appwrite/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    isLogout();
  }, []);

  const isLogout = async () => {
    try {
      const user = await getCurrentUser();
      //   console.log(user);
      if (user) {
        userLogin();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = (e) => {
    e.preventDefault();
    // console.log(email, password);

    // Add your login logic here
    userLogin();

    setEmail("");
    setPassword("");
  };

  const userLogin = async () => {
    try {
      const user = await loginUser({ email, password });
      // console.log(user);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h1>User Login</h1>
      {errors ? <p className="error-message">{errors}</p> : null}
      <form onSubmit={login}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Enter Email ID"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
