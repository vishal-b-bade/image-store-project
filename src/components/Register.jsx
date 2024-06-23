import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createAccount, getCurrentUser } from "../appwrite/auth";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    isLogout();
  }, []);

  const isLogout = async () => {
    try {
      const user = await getCurrentUser();
      console.log(user);
      if (typeof user !== "undefined") {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const registration = (e) => {
    e.preventDefault();
    // console.log(name, email, password);

    // Add your registration logic here
    register();

    setName("");
    setEmail("");
    setPassword("");
  };

  const register = async () => {
    try {
      await createAccount({ email, password, name });
      // navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <h1>Register as a user</h1>
      {error !== "" && <p className="error-message">{error}</p>}
      <form onSubmit={registration}>
        <label htmlFor="name">User Name:</label>
        <input
          type="text"
          placeholder="Enter User Name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="false"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Enter Email ID"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="false"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Enter Your Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="false"
          required
        />

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Register;
