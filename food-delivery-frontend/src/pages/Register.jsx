
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check empty fields
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    // Check password
    if (password !== confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    // Check password length
    if (password.length < 6) {
      alert("Password must contain at least 6 characters.");
      return;
    }

    try {
      // Send customer data to Spring Boot
      const response = await axios.post(
        "http://localhost:7000/customer/add",
        {
          name: name.trim(),
          email: email.trim(),
          password: password,
        }
      );

      console.log("Customer saved:", response.data);

      alert("Registration successful! 🎉");

      // Go to login
      navigate("/login");

    } catch (error) {
      console.error("Registration Error:", error);

      if (error.response) {
        alert(
          "Registration failed: " +
          (error.response.data?.message || "Server error")
        );
      } else {
        alert(
          "Unable to connect to the backend. Make sure Spring Boot is running."
        );
      }
    }
  };

  return (
    <div className="register">

      <h1>
        Create Account 📝
      </h1>

      <form onSubmit={handleRegister}>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          📝 Register
        </button>

      </form>

      <p>
        Already have an account?{" "}

        <Link to="/login">
          Login
        </Link>
      </p>

    </div>
  );
};

export default Register;

