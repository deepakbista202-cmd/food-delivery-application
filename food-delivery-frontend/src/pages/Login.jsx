
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ loginUser }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check empty fields
    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password.");
      return;
    }

    try {
      // Send login request to Spring Boot
      const response = await axios.post(
        "http://localhost:7000/customer/login",
        {
          email: email.trim(),
          password: password
        }
      );

      const user = response.data;

      // Check account
      if (!user) {
        alert("Invalid email or password ❌");
        return;
      }

      // Send logged-in user to App.jsx
      loginUser(user);

      // Also save login user
      localStorage.setItem(
        "foodieLoggedInUser",
        JSON.stringify(user)
      );

      alert("Login successful! 🎉");

      navigate("/");

    } catch (error) {

      console.error("Login Error:", error);

      if (error.response) {
        alert("Invalid email or password ❌");
      } else {
        alert(
          "Unable to connect to backend. Make sure Spring Boot is running."
        );
      }
    }
  };

  return (
    <div className="login">

      <h1>
        Login 👤
      </h1>

      <form onSubmit={handleLogin}>

        {/* Email */}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br />
        <br />

        {/* Password */}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          🔐 Login
        </button>

      </form>

      <p>
        Don't have an account?{" "}

        <Link to="/register">
          Register
        </Link>
      </p>

    </div>
  );
};

export default Login;

